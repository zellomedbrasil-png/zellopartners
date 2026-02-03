import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCT_PRICES, COUPON_DISCOUNT_CENTS, calculateCommission } from '@/lib/stripe';

// API para confirmar pagamento PIX manualmente
// Você pode chamar esta API quando receber o PIX na sua conta

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, productId, couponCode, customerEmail } = body;

        // Validate required fields
        if (!orderId || !productId) {
            return NextResponse.json(
                { error: 'orderId e productId são obrigatórios' },
                { status: 400 }
            );
        }

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
                discountAmount = COUPON_DISCOUNT_CENTS;
            }
        }

        // Calculate amounts
        const originalPrice = product.price;
        const finalPrice = originalPrice - discountAmount;
        const commissionAmount = seller ? calculateCommission(finalPrice) : 0;

        // If seller used coupon, credit commission
        if (seller && commissionAmount > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await prisma.$transaction(async (tx: any) => {
                // Create sales log
                await tx.salesLog.create({
                    data: {
                        sellerId: seller.id,
                        consultationType: productId,
                        saleValue: finalPrice / 100,
                        commissionAmount: commissionAmount / 100,
                        status: 'confirmado',
                    },
                });

                // Credit seller's wallet
                await tx.seller.update({
                    where: { id: seller.id },
                    data: {
                        walletBalance: {
                            increment: commissionAmount / 100,
                        },
                    },
                });
            });

            console.log(`PIX Confirmado: Comissão de R$ ${commissionAmount / 100} creditada ao vendedor ${seller.id}`);
        }

        return NextResponse.json({
            success: true,
            message: 'Pagamento PIX confirmado',
            orderId,
            productId,
            productName: product.name,
            originalPrice: originalPrice / 100,
            discountAmount: discountAmount / 100,
            finalPrice: finalPrice / 100,
            commissionCredited: commissionAmount / 100,
            sellerId: seller?.id || null,
            customerEmail,
        });

    } catch (error) {
        console.error('Erro ao confirmar PIX:', error);
        return NextResponse.json(
            { error: 'Erro ao confirmar pagamento' },
            { status: 500 }
        );
    }
}
