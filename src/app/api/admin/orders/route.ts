import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/orders - List PIX orders
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where = status ? { status } : {};

        const orders = await prisma.pixOrder.findMany({
            where,
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        couponCode: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        // Format for frontend
        const formattedOrders = orders.map(order => ({
            id: order.id,
            orderId: order.orderId,
            productId: order.productId,
            productName: order.productName,
            originalPrice: Number(order.originalPrice),
            discountAmount: Number(order.discountAmount),
            finalPrice: Number(order.finalPrice),
            customerEmail: order.customerEmail,
            customerName: order.customerName,
            couponCode: order.couponCode,
            commissionAmount: Number(order.commissionAmount || 0),
            status: order.status,
            createdAt: order.createdAt.toISOString(),
            confirmedAt: order.confirmedAt?.toISOString() || null,
            seller: order.seller ? {
                id: order.seller.id,
                name: order.seller.name,
                couponCode: order.seller.couponCode,
            } : null,
        }));

        return NextResponse.json({ orders: formattedOrders });
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        return NextResponse.json(
            { error: 'Erro ao listar pedidos' },
            { status: 500 }
        );
    }
}
