# .env.local の設定

プロジェクトルートに `.env.local` を作成し、次の変数を設定してください。

## サンプル・資料請求フォーム（Google スプレッドシート連携）

### 1. GOOGLE_SHEET_ID（必須）

Google スプレッドシートの URL のうち、`/d/` と `/edit` の間の文字列です。

```
例: https://docs.google.com/spreadsheets/d/1Ab2Cd3Ef4Gh5Ij6Kl7Mn8Op9Qr0StuVw/edit
                                              ↑この部分をコピー
```

`.env.local` に例:
```
GOOGLE_SHEET_ID=1Ab2Cd3Ef4Gh5Ij6Kl7Mn8Op9Qr0StuVw
```

### 2. GOOGLE_SHEETS_CREDENTIALS_JSON（必須）

Google Cloud で発行したサービスアカウントの JSON キーを、**1行の文字列**としてそのまま貼り付けます。

- JSON キーをダウンロードしたら、ファイルの中身を開く
- 改行をすべて削除して1行にするか、または `private_key` 内の改行は `\n` のままにして、全体をダブルクォート `"` で囲む
- その文字列を `GOOGLE_SHEETS_CREDENTIALS_JSON=` の右に書く

**注意:** `.env` では値に改行を含められないため、JSON は1行にまとめてください。  
（例: メモ帳で開き、改行を削除して1行にする）

`.env.local` に例（実際は1行）:
```
GOOGLE_SHEETS_CREDENTIALS_JSON={"type":"service_account","project_id":"..."}
```

### 3. GOOGLE_SHEET_NAME（任意）

サンプル・資料請求のデータを書き込むシートの名前。省略すると `Sheet1` になります。

シート名を変えている場合だけ指定:
```
GOOGLE_SHEET_NAME=サンプル請求
```

---

## お問い合わせフォーム（同じスプレッドシート）

お問い合わせフォームの送信先も **同じスプレッドシート**（`GOOGLE_SHEET_ID`）です。

- スプレッドシート内に **「お問い合わせ内容」** という名前のシートを新規作成してください。
- 1行目にヘッダー（任意）を入れる場合の例: `受付日時` / `お問い合わせ種別` / `医院名・法人名` / `お名前` / `メールアドレス` / `電話番号` / `お問い合わせ内容`
- サービスアカウントのメールは、サンプル請求用シートと同様に編集権限を付与してください。

---

## .env.local の記入例（まとめ）

```env
GOOGLE_SHEET_ID=あなたのスプレッドシートID
GOOGLE_SHEETS_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
GOOGLE_SHEET_NAME=Sheet1
```

※ `GOOGLE_SHEETS_CREDENTIALS_JSON` は、ダウンロードした JSON を1行にしたもので、実際の値は長い文字列になります。

※ `.env.local` は git に含めないでください（.gitignore に含まれています）。
