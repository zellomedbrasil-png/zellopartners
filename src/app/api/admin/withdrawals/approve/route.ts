import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/admin/withdrawals/approve - Approve a withdrawal request
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

        if (withdrawal.status !== 'pendente') {
            return NextResponse.json(
                { error: `Saque já está ${withdrawal.status}` },
                { status: 400 }
            );
        }

        const updated = await prisma.withdrawal.update({
            where: { id: withdrawalId },
            data: {
                status: 'aprovado',
                approvedAt: new Date(),
            },
            include: { seller: true },
        });

        return NextResponse.json({
            success: true,
            message: 'Saque aprovado com sucesso',
            withdrawal: {
                id: updated.id,
                amount: Number(updated.amount),
                status: updated.status,
                seller: {
                    name: updated.seller.name,
                    pixKey: updated.seller.pixKey,
                },
            },
        });
    } catch (error) {
        console.error('Erro ao aprovar saque:', error);
        return NextResponse.json(
            { error: 'Erro ao aprovar saque' },
            { status: 500 }
        );
    }
}
