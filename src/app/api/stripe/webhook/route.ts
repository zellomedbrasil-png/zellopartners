import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Disable body parsing for webhook
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Assinatura do webhook ausente' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error('Erro ao verificar webhook:', err);
        return NextResponse.json(
            { error: 'Assinatura do webhook inválida' },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            // Extract metadata
            const {
                productId,
                couponCode,
                sellerId,
                originalPrice,
                commissionAmount,
            } = session.metadata || {};

            console.log('Pagamento confirmado:', {
                sessionId: session.id,
                customerEmail: session.customer_email,
                productId,
                couponCode,
                sellerId,
            });

            // If a seller coupon was used, credit the commission
            if (sellerId && commissionAmount) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await prisma.$transaction(async (tx: any) => {
                        // Create sales log
                        await tx.salesLog.create({
                            data: {
                                sellerId,
                                consultationType: productId || 'unknown',
                                saleValue: parseInt(originalPrice || '0') / 100,
                                commissionAmount: parseInt(commissionAmount) / 100,
                                status: 'confirmado',
                            },
                        });

                        // Credit seller's wallet
                        await tx.seller.update({
                            where: { id: sellerId },
                            data: {
                                walletBalance: {
                                    increment: parseInt(commissionAmount) / 100,
                                },
                            },
                        });
                    });

                    console.log(`Comissão de R$ ${parseInt(commissionAmount) / 100} creditada ao vendedor ${sellerId}`);
                } catch (dbError) {
                    console.error('Erro ao registrar venda:', dbError);
                }
            }

            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('Pagamento falhou:', paymentIntent.id);
            break;
        }

        default:
            console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
