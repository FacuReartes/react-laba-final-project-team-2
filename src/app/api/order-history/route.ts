import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const customers = await stripe.customers.list({ limit: 1000 });

    const customer = customers.data.find(
      customer => customer.metadata.userId === String(userId)
    );

    const transactions = await stripe.paymentIntents.list({ limit: 1000 });

    const customerTransactions = transactions.data.filter(
      transaction => transaction.customer === customer?.id
    );

    const orders = await Promise.all(
      customerTransactions.map(async intent => {
        if (intent.invoice && typeof intent.invoice === 'string') {
          const invoice = await stripe.invoices.retrieve(intent.invoice);

          const productsList = await Promise.all(
            invoice.lines.data.map(async invoiceItem => {
              if (
                invoiceItem.price?.product &&
                typeof invoiceItem.price.product === 'string'
              ) {
                const prod = await stripe.products.retrieve(
                  invoiceItem.price.product
                );
                return prod.metadata?.productId
                  ? {
                      id: parseInt(prod.metadata?.productId),
                      size: prod.metadata?.size,
                      gender: prod.metadata?.gender,
                      quantity: parseInt(prod.metadata?.quantity),
                    }
                  : {};
              }
              return {};
            })
          );
          return {
            id: intent.id,
            summary: intent.amount / 100,
            status: intent.status,
            products: productsList,
            date: new Date(intent.created * 1000).toLocaleDateString(),
            discont: parseInt(intent.metadata.discont || '0'),
            delivery: {
              address: invoice.shipping_details?.address,
              phone: invoice.shipping_details?.phone,
              name: invoice.shipping_details?.name,
              status: invoice.metadata?.shippingStatus,
            },
            customer: {
              email: customer?.email,
            },
            payment: 'After Payment',
            invoicePDF: invoice.invoice_pdf,
          };
        } else if (intent.payment_method === null) {
          return;
        } else {
          const productIds = intent.metadata.products
            ? intent.metadata.products.split(',')
            : [];

          const productsList = await Promise.all(
            productIds.map(async productId => {
              try {
                const product = await stripe.products.retrieve(productId);

                return product.metadata?.productId
                  ? {
                      id: product.metadata.productId,
                      size: product.metadata.size,
                      gender: product.metadata.gender,
                      quantity: parseInt(product.metadata.quantity),
                    }
                  : {};
              } catch (error) {
                console.error(
                  `Failed to retrieve product with ID: ${productId}`,
                  error
                );
                return {};
              }
            })
          );

          return {
            id: intent.id,
            summary: intent.amount / 100,
            status: intent.status,
            products: productsList,
            date: new Date(intent.created * 1000).toLocaleDateString(),
            discont: parseInt(intent.metadata.discont || '0'),
            delivery: {
              address: {
                line1: intent.metadata.shippingLine1,
                city: intent.metadata.shippingCity,
                state: intent.metadata.shippingState,
                postal_code: intent.metadata.shippingPostalCode,
                country: intent.metadata.shippingCountry,
              },
              name: intent.metadata.shippingName,
              status: intent.metadata?.shippingStatus,
            },
            customer: {
              email: customer?.email,
              phone: customer?.phone,
            },
            payment: 'card',
          };
        }
      })
    );

    return NextResponse.json(
      orders.filter(item => item),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders from Stripe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order history' },
      { status: 500 }
    );
  }
}
