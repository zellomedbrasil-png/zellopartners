import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Função para limpar e validar cupom
function sanitizeCouponCode(coupon: string): string {
    return coupon
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 15);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, whatsapp, pix_key, coupon_code } = body;

        // Validações
        if (!name || !whatsapp || !pix_key) {
            return NextResponse.json(
                { error: 'Nome, WhatsApp e Chave Pix são obrigatórios.' },
                { status: 400 }
            );
        }

        if (!coupon_code || coupon_code.length < 3) {
            return NextResponse.json(
                { error: 'O cupom deve ter pelo menos 3 caracteres.' },
                { status: 400 }
            );
        }

        // Limpar e validar cupom
        const cleanCoupon = sanitizeCouponCode(coupon_code);

        if (cleanCoupon.length < 3) {
            return NextResponse.json(
                { error: 'O cupom deve conter pelo menos 3 letras ou números.' },
                { status: 400 }
            );
        }

        // Verificar se cupom já existe
        const existingCoupon = await prisma.seller.findUnique({
            where: { couponCode: cleanCoupon },
        });

        if (existingCoupon) {
            return NextResponse.json(
                { error: `O cupom "${cleanCoupon}" já está em uso. Escolha outro nome.` },
                { status: 400 }
            );
        }

        // Verificar se WhatsApp já está cadastrado
        const existingWhatsapp = await prisma.seller.findFirst({
            where: { whatsapp },
        });

        if (existingWhatsapp) {
            return NextResponse.json(
                { error: 'Este WhatsApp já está cadastrado. Faça login ou use outro número.' },
                { status: 400 }
            );
        }

        // Criar vendedor
        const seller = await prisma.seller.create({
            data: {
                name,
                whatsapp,
                pixKey: pix_key,
                couponCode: cleanCoupon,
            },
        });

        return NextResponse.json({
            id: seller.id,
            name: seller.name,
            coupon_code: seller.couponCode
        });

    } catch (error) {
        console.error('Erro ao cadastrar vendedor:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar cadastro.' },
            { status: 500 }
        );
    }
}
