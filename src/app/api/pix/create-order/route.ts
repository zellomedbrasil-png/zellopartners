import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCT_PRICES, COUPON_DISCOUNT_CENTS, calculateCommission } from '@/lib/stripe';

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
                discountAmount = COUPON_DISCOUNT_CENTS;
            }
        }

        // Calculate final price
        const originalPrice = product.price;
        const finalPrice = originalPrice - discountAmount;
        const commissionAmount = seller ? calculateCommission(finalPrice) : 0;

        // Generate a unique order ID
        const orderId = `PIX-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Save order to database for tracking
        await prisma.pixOrder.create({
            data: {
                orderId,
                productId,
                productName: product.name,
                originalPrice: originalPrice / 100,
                discountAmount: discountAmount / 100,
                finalPrice: finalPrice / 100,
                customerEmail,
                customerName: customerName || null,
                sellerId: seller?.id || null,
                couponCode: couponCode?.toUpperCase() || null,
                commissionAmount: seller ? commissionAmount / 100 : null,
                status: 'pendente',
            },
        });

        console.log('PIX Order Created:', {
            orderId,
            productId,
            finalPrice: finalPrice / 100,
            sellerId: seller?.id,
            couponCode,
        });

        // Generate PIX code for customer
        // As requested: showing ONLY the email key
        const pixCode = 'zellomed@jim.com';

        return NextResponse.json({
            success: true,
            orderId,
            pixCode,
            pixKey: 'zellomed@jim.com',
            originalPrice: originalPrice / 100,
            discountAmount: discountAmount / 100,
            finalPrice: finalPrice / 100,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        });

    } catch (error) {
        console.error('Erro ao criar ordem PIX:', error);
        return NextResponse.json(
            { error: 'Erro ao gerar PIX' },
            { status: 500 }
        );
    }
}
