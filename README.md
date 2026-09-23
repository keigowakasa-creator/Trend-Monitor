# TREND MONITOR v1

iPhone Safariで使うことを想定した、25/50/99本線のトレンド監視Webアプリです。

監視: QQQ, NVDA, AVGO, MSFT, AAPL, TECL, TQQQ, SOXL, XLE, XLI, XLV, XLF

データ: Yahoo Finance Chart APIをサーバー側から取得し、日足の25/50/99本移動平均を計算します。

## Vercelへ公開
1. このフォルダをGitHubへpushするか、Vercel Dropへフォルダをアップロード。
2. VercelでDeploy。
3. 発行された `https://xxxxx.vercel.app` をiPhone Safariで開く。
4. Safariの共有 → ホーム画面に追加、でアプリ風に使えます。

## ローカル
npm install
npm run dev

注意: Yahoo Financeのデータ利用条件を確認したうえで個人利用してください。投資判断を保証するものではありません。
