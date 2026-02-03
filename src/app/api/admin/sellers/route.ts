import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/sellers - List all sellers
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');

        const sellers = await prisma.seller.findMany({
            include: {
                _count: {
                    select: {
                        sales: true,
                        withdrawals: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        // Get totals for each seller
        const formattedSellers = await Promise.all(sellers.map(async (seller: typeof sellers[0]) => {
            const salesTotal = await prisma.salesLog.aggregate({
                _sum: { saleValue: true, commissionAmount: true },
                where: { sellerId: seller.id },
            });

            const withdrawalsTotal = await prisma.withdrawal.aggregate({
                _sum: { amount: true },
                where: { sellerId: seller.id, status: 'pago' },
            });

            return {
                id: seller.id,
                name: seller.name,
                whatsapp: seller.whatsapp,
                pixKey: seller.pixKey,
                couponCode: seller.couponCode,
                walletBalance: Number(seller.walletBalance),
                createdAt: seller.createdAt.toISOString(),
                stats: {
                    totalSales: seller._count.sales,
                    totalSalesValue: Number(salesTotal._sum.saleValue || 0),
                    totalCommissions: Number(salesTotal._sum.commissionAmount || 0),
                    totalWithdrawn: Number(withdrawalsTotal._sum.amount || 0),
                },
            };
        }));

        return NextResponse.json({ sellers: formattedSellers });
    } catch (error) {
        console.error('Erro ao listar vendedores:', error);
        return NextResponse.json(
            { error: 'Erro ao listar vendedores' },
            { status: 500 }
        );
    }
}
