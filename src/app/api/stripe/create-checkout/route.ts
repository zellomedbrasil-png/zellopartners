import { NextResponse } from 'next/server';
import { stripe, PRODUCT_PRICES, calculateCommission } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, couponCode, customerEmail, customerName } = body;

        // Validate product
        const product = PRODUCT_PRICES[productId as keyof typeof PRODUCT_PRICES];
        if (!product) {
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 400 }
            );
        }

        // Check if coupon code exists and get seller
        let seller = null;
        let discountAmount = 0;

        if (couponCode) {
            seller = await prisma.seller.findUnique({
                where: { couponCode: couponCode.toUpperCase() },
            });

            if (seller) {
                // Apply R$ 5.00 fixed discount when using a partner coupon
                discountAmount = 500; // R$ 5.00 in cents
            }
        }

        // Calculate final price with discount
        const originalPrice = product.price;
        const finalPrice = originalPrice - discountAmount;

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: finalPrice,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/cancel`,
            customer_email: customerEmail,
            metadata: {
                productId,
                customerName: customerName || '',
                couponCode: couponCode?.toUpperCase() || '',
                sellerId: seller?.id || '',
                originalPrice: originalPrice.toString(),
                discountAmount: discountAmount.toString(),
                commissionAmount: seller ? calculateCommission(finalPrice).toString() : '0',
            },
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
            originalPrice,
            discountAmount,
            finalPrice,
            discountApplied: discountAmount > 0,
        });

    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        return NextResponse.json(
            { error: 'Erro ao processar pagamento' },
            { status: 500 }
        );
    }
}
