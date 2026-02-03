# 🔗 Integração de Pagamentos - ZelloPartners

## Visão Geral

O ZelloPartners suporta dois métodos de pagamento:
1. **Cartão de Crédito** - via Stripe
2. **PIX** - controle manual (você confirma quando o PIX cai na conta)

Quando um cliente compra usando um cupom de parceiro:
- Recebe **R$ 5,00 de desconto** fixo
- O parceiro recebe **5% de comissão** sobre o valor final

## Produtos e Preços

| Produto | Preço Normal | Com Cupom | Comissão (5%) |
|---------|--------------|-----------|---------------|
| Consulta Generalista | R$ 47,00 | R$ 42,00 | R$ 2,10 |
| Consulta Especialista | R$ 79,00 | R$ 74,00 | R$ 3,70 |

## Fluxo - Cartão (Stripe)

```
1. Cliente acessa /checkout
2. Seleciona consulta
3. Aplica cupom de parceiro (ex: ZELLOROBERTO)
4. Recebe R$ 5,00 de desconto
5. Escolhe "Cartão"
6. Paga via Stripe Checkout
7. Webhook processa automaticamente
8. Comissão creditada ao parceiro
```

## Fluxo - PIX (Manual)

```
1. Cliente acessa /checkout
2. Seleciona consulta
3. Aplica cupom de parceiro
4. Escolhe "PIX"
5. Recebe código PIX
6. Paga no app do banco
7. VOCÊ confirma manualmente via API
8. Comissão creditada ao parceiro
```

### Confirmar PIX Manualmente

Quando você receber um PIX, chame a API para confirmar e creditar a comissão:

```bash
curl -X POST http://localhost:3000/api/pix/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "PIX-1234567890-abc123",
    "productId": "consulta-generalista",
    "couponCode": "ZELLOROBERTO",
    "customerEmail": "cliente@email.com"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Pagamento PIX confirmado",
  "orderId": "PIX-1234567890-abc123",
  "productId": "consulta-generalista",
  "productName": "Consulta Generalista",
  "originalPrice": 47,
  "discountAmount": 5,
  "finalPrice": 42,
  "commissionCredited": 2.1,
  "sellerId": "uuid-do-vendedor"
}
```

## Configuração do Stripe

### 1. Criar conta no Stripe
1. Acesse [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Ative o modo de teste

### 2. Obter as chaves
1. Vá para [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copie: Publishable key (pk_test_...) e Secret key (sk_test_...)

### 3. Configurar Webhook
1. Vá para [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
2. Add endpoint: `https://seu-dominio.com/api/stripe/webhook`
3. Eventos: `checkout.session.completed`
4. Copie o Signing secret (whsec_...)

### 4. Variáveis de ambiente (.env)

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Cartões de Teste

| Cartão | Comportamento |
|--------|---------------|
| `4242 4242 4242 4242` | Sucesso |
| `4000 0000 0000 9995` | Fundos insuficientes |

Data: Qualquer futura (12/34), CVC: 123

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/stripe/create-checkout` | Cria sessão Stripe |
| POST | `/api/stripe/webhook` | Webhook Stripe (automático) |
| POST | `/api/pix/create-order` | Gera código PIX |
| POST | `/api/pix/confirm` | Confirma PIX (manual) |
