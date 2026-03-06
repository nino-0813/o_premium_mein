import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const CONTACT_SHEET_NAME = 'お問い合わせ内容';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clinicName = '', name, email, phone = '', subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: '必須項目を入力してください。' },
        { status: 400 }
      );
    }

    const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentialsJson || !sheetId) {
      console.error('Missing GOOGLE_SHEETS_CREDENTIALS_JSON or GOOGLE_SHEET_ID');
      return NextResponse.json(
        { error: 'サーバー設定が完了していません。' },
        { status: 500 }
      );
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
    const now = new Date();
    const receivedAt = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const row = [
      receivedAt,
      String(subject).trim(),
      String(clinicName).trim(),
      String(name).trim(),
      String(email).trim(),
      String(phone).trim(),
      String(message).trim(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `'${CONTACT_SHEET_NAME}'!A:G`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: '送信に失敗しました。しばらくしてからお試しください。' },
      { status: 500 }
    );
  }
}
