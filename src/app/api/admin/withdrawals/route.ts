import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/withdrawals - List withdrawals
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where = status ? { status } : {};

        const withdrawals = await prisma.withdrawal.findMany({
            where,
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        pixKey: true,
                        couponCode: true,
                        walletBalance: true,
                    },
                },
            },
            orderBy: { requestedAt: 'desc' },
            take: limit,
        });

        // Format for frontend
        const formattedWithdrawals = withdrawals.map(w => ({
            id: w.id,
            amount: Number(w.amount),
            status: w.status,
            requestedAt: w.requestedAt.toISOString(),
            approvedAt: w.approvedAt?.toISOString() || null,
            paidAt: w.paidAt?.toISOString() || null,
            seller: {
                id: w.seller.id,
                name: w.seller.name,
                pixKey: w.seller.pixKey,
                couponCode: w.seller.couponCode,
                walletBalance: Number(w.seller.walletBalance),
            },
        }));

        return NextResponse.json({ withdrawals: formattedWithdrawals });
    } catch (error) {
        console.error('Erro ao listar saques:', error);
        return NextResponse.json(
            { error: 'Erro ao listar saques' },
            { status: 500 }
        );
    }
}
