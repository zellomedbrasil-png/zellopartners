
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { credential } = body;

        if (!credential) {
            return NextResponse.json(
                { error: 'Por favor, informe seu WhatsApp, Pix ou Cupom.' },
                { status: 400 }
            );
        }

        // Buscar por qualquer um dos identificadores
        const seller = await prisma.seller.findFirst({
            where: {
                OR: [
                    { whatsapp: credential },
                    { pixKey: credential },
                    { couponCode: credential },
                    // Normalizar caso envie whatsapp formatado diferente? 
                    // Para MVP, assumimos igualdade exata ou tratamos no front para enviar limpo.
                ]
            }
        });

        if (!seller) {
            return NextResponse.json(
                { error: 'Parceiro não encontrado com estas informações.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: seller.id,
            name: seller.name,
            coupon_code: seller.couponCode
        });

    } catch (error) {
        console.error('Erro de login:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar login.' },
            { status: 500 }
        );
    }
}
