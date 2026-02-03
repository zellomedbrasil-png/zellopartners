import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/stats - Dashboard statistics
export async function GET() {
    try {
        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Total sales by source
        const salesStats = await prisma.salesLog.aggregate({
            _sum: { saleValue: true, commissionAmount: true },
            _count: true,
        });

        // Sales today
        const salesToday = await prisma.salesLog.aggregate({
            _sum: { saleValue: true },
            _count: true,
            where: {
                createdAt: { gte: today, lt: tomorrow },
            },
        });

        // Pending PIX orders
        const pendingPixOrders = await prisma.pixOrder.count({
            where: { status: 'pendente' },
        });

        // Total PIX orders value (pending)
        const pendingPixValue = await prisma.pixOrder.aggregate({
            _sum: { finalPrice: true },
            where: { status: 'pendente' },
        });

        // Pending withdrawals
        const pendingWithdrawals = await prisma.withdrawal.count({
            where: { status: 'pendente' },
        });

        // Pending withdrawals value
        const pendingWithdrawalValue = await prisma.withdrawal.aggregate({
            _sum: { amount: true },
            where: { status: 'pendente' },
        });

        // Approved withdrawals (waiting payment)
        const approvedWithdrawals = await prisma.withdrawal.aggregate({
            _sum: { amount: true },
            _count: true,
            where: { status: 'aprovado' },
        });

        // Total paid withdrawals
        const paidWithdrawals = await prisma.withdrawal.aggregate({
            _sum: { amount: true },
            _count: true,
            where: { status: 'pago' },
        });

        // Total sellers
        const totalSellers = await prisma.seller.count();

        // Active sellers (with sales)
        const activeSellers = await prisma.seller.count({
            where: {
                sales: { some: {} },
            },
        });

        return NextResponse.json({
            sales: {
                total: salesStats._count,
                totalValue: Number(salesStats._sum.saleValue || 0),
                totalCommissions: Number(salesStats._sum.commissionAmount || 0),
                today: salesToday._count,
                todayValue: Number(salesToday._sum.saleValue || 0),
            },
            pixOrders: {
                pending: pendingPixOrders,
                pendingValue: Number(pendingPixValue._sum.finalPrice || 0),
            },
            withdrawals: {
                pending: pendingWithdrawals,
                pendingValue: Number(pendingWithdrawalValue._sum.amount || 0),
                approved: approvedWithdrawals._count,
                approvedValue: Number(approvedWithdrawals._sum.amount || 0),
                paid: paidWithdrawals._count,
                paidValue: Number(paidWithdrawals._sum.amount || 0),
            },
            sellers: {
                total: totalSellers,
                active: activeSellers,
            },
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar estatísticas' },
            { status: 500 }
        );
    }
}
