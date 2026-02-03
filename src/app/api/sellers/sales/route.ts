
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const sellerId = request.headers.get('x-seller-id');
        if (!sellerId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const [sales, total] = await prisma.$transaction([
            prisma.salesLog.findMany({
                where: { sellerId },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip
            }),
            prisma.salesLog.count({ where: { sellerId } })
        ]);

        return NextResponse.json({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sales: sales.map((s: any) => ({
                id: s.id,
                date: s.createdAt,
                type: s.consultationType,
                commission: Number(s.commissionAmount),
                status: s.status
            })),
            pagination: {
                page,
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch {
        return NextResponse.json({ error: 'Erro ao buscar vendas' }, { status: 500 });
    }
}
