import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { getCountryCode } from '@/lib/getCountryCode';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, userId, personalInfo, products, shippingInfo } =
      await req.json();

    const customers = await stripe.customers.list({ limit: 1000 });

    let customer = customers.data.find(
      customer =>
        customer.metadata.userId === String(userId) && customer.name !== null
    );

    if (!customer) {
      customer = await stripe.customers.create({
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        email: personalInfo.email,
        phone: personalInfo.phoneNumber,
        metadata: {
          userId: userId ?? 'guest',
        },
      });
    }

    let productsIds = [];
    for (const product of products) {
      const subcurrencyPrice = convertToSubcurrency(product.price);
      try {
        const productItem = await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: 'brl',
            unit_amount: subcurrencyPrice,
          },
          metadata: {
            gender: product.gender,
            size: product.sizes,
            productId: product.id,
            quantity: product.quantity,
          },
        });
        productsIds.push(productItem.id);
      } catch (error) {
        console.error('Failed to create product:', error);
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId ?? 'unknown',
        products: productsIds.join(),
        shippingStatus: 'shipped',
        shippingName: personalInfo.firstName + ' ' + personalInfo.lastName,
        shippingLine1: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingPostalCode: shippingInfo.zip,
        shippingCountry: getCountryCode(shippingInfo.country) || '',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
