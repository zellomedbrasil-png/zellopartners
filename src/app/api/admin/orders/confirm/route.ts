import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/orders/confirm - Confirm a PIX payment
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId } = body;

        if (!orderId) {
            return NextResponse.json(
                { error: 'orderId é obrigatório' },
                { status: 400 }
            );
        }

        // Find the order
        const order = await prisma.pixOrder.findUnique({
            where: { orderId },
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Pedido não encontrado' },
                { status: 404 }
            );
        }

        if (order.status !== 'pendente') {
            return NextResponse.json(
                { error: `Pedido já está ${order.status}` },
                { status: 400 }
            );
        }

        // Start transaction to confirm order and credit commission
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await prisma.$transaction(async (tx: any) => {
            // Update order status
            const updatedOrder = await tx.pixOrder.update({
                where: { orderId },
                data: {
                    status: 'confirmado',
                    confirmedAt: new Date(),
                },
            });

            // If there's a seller, credit commission
            if (order.sellerId && order.commissionAmount) {
                // Create sales log
                await tx.salesLog.create({
                    data: {
                        sellerId: order.sellerId,
                        consultationType: order.productId,
                        saleValue: order.finalPrice,
                        commissionAmount: order.commissionAmount,
                        status: 'confirmado',
                        source: 'pix',
                    },
                });

                // Credit seller's wallet
                await tx.seller.update({
                    where: { id: order.sellerId },
                    data: {
                        walletBalance: {
                            increment: order.commissionAmount,
                        },
                    },
                });
            }

            return updatedOrder;
        });

        return NextResponse.json({
            success: true,
            message: 'Pagamento PIX confirmado com sucesso',
            order: {
                orderId: result.orderId,
                productName: result.productName,
                finalPrice: Number(result.finalPrice),
                commissionCredited: Number(result.commissionAmount || 0),
                sellerId: result.sellerId,
                confirmedAt: result.confirmedAt?.toISOString(),
            },
        });
    } catch (error) {
        console.error('Erro ao confirmar pedido:', error);
        return NextResponse.json(
            { error: 'Erro ao confirmar pedido' },
            { status: 500 }
        );
    }
}
