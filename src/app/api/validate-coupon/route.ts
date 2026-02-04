import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { couponCode } = await request.json();

        if (!couponCode) {
            return NextResponse.json({ valid: false, message: 'Código obrigatório' }, { status: 400 });
        }

        const seller = await prisma.seller.findUnique({
            where: { couponCode: couponCode.toUpperCase() },
        });

        if (seller) {
            return NextResponse.json({ valid: true, couponCode: seller.couponCode });
        } else {
            return NextResponse.json({ valid: false, message: 'Cupom inválido ou não encontrado' });
        }

    } catch (error) {
        console.error('Erro validação cupom:', error);
        return NextResponse.json({ valid: false, message: 'Erro ao validar cupom' }, { status: 500 });
    }
}
