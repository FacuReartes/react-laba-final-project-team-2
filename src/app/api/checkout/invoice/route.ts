import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { userId, personalInfo, shippingInfo, products } = await req.json();

    const customers = await stripe.customers.list({ limit: 1000 });

    let customer = customers.data.find(
      customer => customer.metadata.userId === String(userId)
    );

    if (!customer) {
      try {
        customer = await stripe.customers.create({
          name: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`,
          email: personalInfo.email || '',
          phone: personalInfo.phoneNumber,
          metadata: {
            userId: userId ?? 'guest',
          },
        });
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    }

    let invoice: any;
    try {
      invoice = await stripe.invoices.create({
        customer: customer ? customer.id : '',
        auto_advance: true,
        shipping_cost: {
          shipping_rate_data: {
            display_name: 'Standard Shipping',
            type: 'fixed_amount',
            fixed_amount: {
              amount: 2000,
              currency: 'brl',
            },
          },
        },
        shipping_details: {
          name: personalInfo.firstName + ' ' + personalInfo.lastName,
          phone: personalInfo.phone,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.zip,
            country: shippingInfo.country,
          },
        },
        metadata: {
          userId: userId ?? 'guest',
          shippingStatus: 'shipped',
        },
      });
    } catch (err) {
      console.log(err);
    }

    for (const product of products) {
      const subcurrencyPrice = convertToSubcurrency(product.price);

      const productItem = await stripe.products.create({
        name: product.name,
        default_price_data: {
          currency: 'brl',
          unit_amount: subcurrencyPrice,
        },
        metadata: {
          id: product.id,
          gender: product.gender,
          size: product.sizes,
          productId: product.id,
          quantity: product.quantity,
        },
      });

      await stripe.invoiceItems.create({
        invoice: invoice.id,
        customer: customer ? customer.id : '',
        price_data: {
          currency: 'brl',
          unit_amount: subcurrencyPrice,
          product: productItem.id,
        },
        quantity: product.quantity,
      });
    }

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    return NextResponse.json({
      invoiceId: finalizedInvoice.payment_intent,
      invoiceURL: finalizedInvoice.invoice_pdf,
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
