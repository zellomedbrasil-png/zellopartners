
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const sellerId = request.headers.get('x-seller-id');
        if (!sellerId) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const body = await request.json();
        const { amount } = body;
        const requestAmount = Number(amount);

        if (!amount || isNaN(requestAmount) || requestAmount < 20) {
            return NextResponse.json(
                { error: 'Valor inválido. Mínimo de R$ 20,00.' },
                { status: 400 }
            );
        }

        // Usar transação para garantir que não saca mais do que tem
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Buscar saldo atual
            const seller = await tx.seller.findUnique({
                where: { id: sellerId },
            });

            if (!seller) throw new Error('Vendedor não encontrado');

            const currentBalance = Number(seller.walletBalance);

            if (currentBalance < requestAmount) {
                throw new Error('Saldo insuficiente');
            }

            // 2. Deduzir do saldo
            await tx.seller.update({
                where: { id: sellerId },
                data: {
                    walletBalance: {
                        decrement: requestAmount
                    }
                }
            });

            // 3. Criar registro de saque
            const withdrawal = await tx.withdrawal.create({
                data: {
                    sellerId,
                    amount: requestAmount,
                    status: 'pendente',
                }
            });

            return withdrawal;
        });

        return NextResponse.json({
            success: true,
            withdrawal: result,
            message: 'Solicitação realizada com sucesso!'
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Erro saque:', error);
        return NextResponse.json(
            { error: error.message || 'Erro ao processar saque.' },
            { status: 400 }
        );
    }
}
