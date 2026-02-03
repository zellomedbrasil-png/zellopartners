
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET(request: Request) {
    try {
        const sellerId = request.headers.get('x-seller-id');

        if (!sellerId) {
            return NextResponse.json(
                { error: 'Não autorizado. ID do vendedor não fornecido.' },
                { status: 401 }
            );
        }

        const seller = await prisma.seller.findUnique({
            where: { id: sellerId },
        });

        if (!seller) {
            return NextResponse.json(
                { error: 'Vendedor não encontrado.' },
                { status: 404 }
            );
        }

        const today = new Date();

        // Contar vendas de hoje
        const todaySales = await prisma.salesLog.count({
            where: {
                sellerId: seller.id,
                createdAt: {
                    gte: startOfDay(today),
                    lte: endOfDay(today),
                }
            }
        });

        // Buscar últimas vendas
        const recentSales = await prisma.salesLog.findMany({
            where: { sellerId: seller.id },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        return NextResponse.json({
            seller: {
                id: seller.id,
                name: seller.name,
                coupon_code: seller.couponCode,
                wallet_balance: Number(seller.walletBalance)
            },
            today_sales: todaySales,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recent_sales: recentSales.map((sale: any) => ({
                id: sale.id,
                consultation_type: sale.consultationType,
                commission_amount: Number(sale.commissionAmount),
                created_at: sale.createdAt,
                status: sale.status
            }))
        });

    } catch (error) {
        console.error('Erro no dashboard:', error);
        return NextResponse.json(
            { error: 'Erro interno ao carregar dashboard.' },
            { status: 500 }
        );
    }
}
