import Stripe from 'stripe';

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

// Commission percentage (10% of sale value)
export const COMMISSION_PERCENTAGE = 0.10;

// Fixed discount when using partner coupon (R$ 5.00 in cents)
export const COUPON_DISCOUNT_CENTS = 500;

// Product prices (in cents)
export const PRODUCT_PRICES = {
    'consulta-generalista': {
        name: 'Consulta Generalista',
        price: 4700, // R$ 47,00
        description: 'Consulta médica online com clínico geral',
    },
    'consulta-especialista': {
        name: 'Consulta Especialista',
        price: 7900, // R$ 79,00
        description: 'Consulta com médico especialista',
    },
};

// Helper to calculate commission
export function calculateCommission(amountInCents: number): number {
    return Math.round(amountInCents * COMMISSION_PERCENTAGE);
}
