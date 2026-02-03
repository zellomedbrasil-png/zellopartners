import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/withdrawals/pay - Mark a withdrawal as paid
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { withdrawalId } = body;

        if (!withdrawalId) {
            return NextResponse.json(
                { error: 'withdrawalId é obrigatório' },
                { status: 400 }
            );
        }

        const withdrawal = await prisma.withdrawal.findUnique({
            where: { id: withdrawalId },
            include: { seller: true },
        });

        if (!withdrawal) {
            return NextResponse.json(
                { error: 'Saque não encontrado' },
                { status: 404 }
            );
        }

        if (withdrawal.status === 'pago') {
            return NextResponse.json(
                { error: 'Saque já foi pago' },
                { status: 400 }
            );
        }

        if (withdrawal.status !== 'aprovado') {
            return NextResponse.json(
                { error: 'Saque precisa ser aprovado antes de marcar como pago' },
                { status: 400 }
            );
        }

        const updated = await prisma.withdrawal.update({
            where: { id: withdrawalId },
            data: {
                status: 'pago',
                paidAt: new Date(),
            },
            include: { seller: true },
        });

        return NextResponse.json({
            success: true,
            message: 'Saque marcado como pago',
            withdrawal: {
                id: updated.id,
                amount: Number(updated.amount),
                status: updated.status,
                paidAt: updated.paidAt?.toISOString(),
                seller: {
                    name: updated.seller.name,
                    pixKey: updated.seller.pixKey,
                },
            },
        });
    } catch (error) {
        console.error('Erro ao pagar saque:', error);
        return NextResponse.json(
            { error: 'Erro ao pagar saque' },
            { status: 500 }
        );
    }
}
