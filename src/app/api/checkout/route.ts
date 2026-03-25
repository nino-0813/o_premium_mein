import { NextResponse } from 'next/server';
import { getStripeServer } from '@/src/lib/stripe';

type CheckoutRequestBody = {
  quantity: number; // "10枚セット" のセット数
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CheckoutRequestBody>;
    const quantity = Number(body.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return NextResponse.json({ error: '数量が不正です。' }, { status: 400 });
    }

    const origin = request.headers.get('origin') ?? 'http://localhost:3000';

    // 表示の合計金額に合わせて「税込み単価」で課金（¥1000 + 10% = ¥1100）
    const unitAmountJpyTaxIncluded = 1100;
    const piecesPerSet = 10;

    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${origin}/purchase?status=success`,
      cancel_url: `${origin}/purchase?status=cancel`,
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'O PREMIUM（オー・プレミアム）歯科専用フェイスタオル（グレー / 穴あき仕様）',
            },
            unit_amount: unitAmountJpyTaxIncluded,
          },
          quantity: quantity * piecesPerSet,
        },
      ],
      metadata: {
        sets: String(quantity),
        pieces: String(quantity * piecesPerSet),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: '決済URLの生成に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout API error:', err);
    return NextResponse.json(
      { error: '決済セッションの作成に失敗しました。' },
      { status: 500 }
    );
  }
}

