import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { google } from 'googleapis';
import { getStripeServer } from '@/src/lib/stripe';

export const runtime = 'nodejs';

function toJstTimestamp(date: Date) {
  // Vercel/Node runs in UTC; log as JST for sheets readability
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return `${jst.getFullYear()}/${String(jst.getMonth() + 1).padStart(2, '0')}/${String(jst.getDate()).padStart(2, '0')} ${String(jst.getHours()).padStart(2, '0')}:${String(jst.getMinutes()).padStart(2, '0')}:${String(jst.getSeconds()).padStart(2, '0')}`;
}

async function appendPurchaseRow(payload: {
  purchasedAt: string;
  sessionId: string;
  paymentStatus: string;
  amountTotal: number | null;
  currency: string | null;
  sets: string;
  pieces: string;
  customerEmail: string;
  customerName: string;
}) {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS_JSON;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_PURCHASE_SHEET_NAME || '購入履歴';

  if (!credentialsJson || !sheetId) {
    throw new Error('Missing GOOGLE_SHEETS_CREDENTIALS_JSON or GOOGLE_SHEET_ID');
  }

  const credentials = JSON.parse(credentialsJson);
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const row = [
    payload.purchasedAt,
    payload.sessionId,
    payload.paymentStatus,
    payload.amountTotal ?? '',
    payload.currency ?? '',
    payload.sets,
    payload.pieces,
    payload.customerEmail,
    payload.customerName,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${sheetName}'!A:I`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Missing STRIPE_WEBHOOK_SECRET' },
        { status: 500 }
      );
    }

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
    }

    const rawBody = await req.text();
    const stripe = getStripeServer();

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    ) as Stripe.Event;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      await appendPurchaseRow({
        purchasedAt: toJstTimestamp(new Date()),
        sessionId: session.id,
        paymentStatus: session.payment_status ?? '',
        amountTotal: session.amount_total ?? null,
        currency: session.currency ?? null,
        sets: String(session.metadata?.sets ?? ''),
        pieces: String(session.metadata?.pieces ?? ''),
        customerEmail: String(
          session.customer_details?.email ?? session.customer_email ?? ''
        ),
        customerName: String(session.customer_details?.name ?? ''),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}

