
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { coupon_code, consultation_type, payment_amount } = body;

        // Validação básica
        if (!coupon_code || !consultation_type || !payment_amount) {
            return NextResponse.json(
                { error: 'Dados inválidos.' },
                { status: 400 }
            );
        }

        // Regra de Negócio: Comissão Fixa R$ 5,00
        const COMMISSION_AMOUNT = 5.00;

        // Transação: Registrar Venda + Atualizar Saldo
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Buscar vendedor pelo cupom
            const seller = await tx.seller.findUnique({
                where: { couponCode: coupon_code }
            });

            if (!seller) {
                throw new Error(`Vendedor com cupom ${coupon_code} não encontrado`);
            }

            // 2. Criar log de venda
            const sale = await tx.salesLog.create({
                data: {
                    sellerId: seller.id,
                    consultationType: consultation_type,
                    saleValue: payment_amount,
                    commissionAmount: COMMISSION_AMOUNT,
                    status: 'confirmado'
                }
            });

            // 3. Atualizar saldo do vendedor
            await tx.seller.update({
                where: { id: seller.id },
                data: {
                    walletBalance: {
                        increment: COMMISSION_AMOUNT
                    }
                }
            });

            return sale;
        });

        return NextResponse.json({
            success: true,
            sale_id: result.id,
            message: 'Comissão creditada com sucesso'
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Webhook erro:', error);
        return NextResponse.json(
            { error: error.message || 'Erro interno no webhook' },
            { status: 500 }
        );
    }
}
