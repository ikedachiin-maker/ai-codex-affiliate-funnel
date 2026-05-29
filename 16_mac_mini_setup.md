# Mac mini運用セットアップ

この手順は、Mac miniを常時起動して `ai-codex-affiliate-funnel` を運用するための初期設定メモです。

## 1. リポジトリを取得

```bash
git clone https://github.com/ikedachiin-maker/ai-codex-affiliate-funnel.git
cd ai-codex-affiliate-funnel
```

## 2. Mac miniを止まらない設定にする

システム設定で以下を確認します。

- ディスプレイオフ後もスリープしない
- 電源アダプタ接続時は自動スリープしない
- ネットワークアクセスによるスリープ解除をオン
- 自動OSアップデートで作業中に再起動しないよう確認

ターミナルで確認する場合:

```bash
pmset -g
```

必要に応じて、電源接続時のスリープを無効化します。

```bash
sudo pmset -c sleep 0
sudo pmset -c disksleep 0
sudo pmset -c displaysleep 30
```

## 3. 差し替えるリンク

`15_link_replacement_sheet.md` を見ながら、以下を実リンクに差し替えます。

- `[LINE_OPTIN_URL]`
- `[LEAD_MAGNET_URL]`
- `[CODEX_BRAIN_AFFILIATE_URL]`
- `[MEIKYO_BRAIN_AFFILIATE_URL]`
- `[DISCLOSURE_TEXT]`
- `[YOUR_X_HANDLE]`
- `[YOUR_NAME]`

一括検索:

```bash
grep -R "\[.*_URL\]\|\[DISCLOSURE_TEXT\]\|\[YOUR_" -n .
```

## 4. 運用方法

まずは完全自動投稿ではなく、半自動運用を推奨します。

```text
毎朝: X投稿案を生成
↓
人間が確認
↓
Xまたは予約投稿ツールに登録
↓
LINE配信はLINE公式側でステップ配信
↓
週1: KPIを見て改善
```

## 5. 毎朝の投稿案生成

`12_automation_prompts.md` の `Daily X Drafts` を使います。

Codex DesktopをMac mini側で使う場合は、このプロンプトをそのまま貼り付けて実行します。

## 6. KPI管理

Excel版:

```text
outputs/codex_ai_affiliate_kpi.xlsx
```

CSV版:

```text
13_kpi_tracking.csv
```

毎日最低限入れる数字:

- X投稿数
- インプレッション
- プロフィールクリック
- LINE登録数
- Codex教材クリック
- Codex教材成約
- 明鏡クリック
- 明鏡成約

## 7. 完全自動投稿に進む場合

完全自動化する場合は、別途以下が必要です。

- X APIまたは予約投稿ツール
- LINE公式アカウントまたは配信ツール
- OpenAI APIキー
- NG表現チェック
- 投稿失敗時の通知
- ログ保存

最初から完全自動投稿にするより、2週間ほど半自動で反応を見てから自動化する方が安全です。

## 8. 更新の取り込み

別PCで更新した内容をMac miniに反映する場合:

```bash
git pull
```

Mac mini側で編集した内容をGitHubに戻す場合:

```bash
git status
git add .
git commit -m "Update funnel assets"
git push
```

## 9. 公開前チェック

投稿・記事・LINE配信を外に出す前に、必ず `10_compliance_checklist.md` を確認します。

特に以下は毎回確認してください。

- PR/広告/紹介リンク表記がある
- 稼げる保証に見えない
- Brain有料本文の転載になっていない
- リンクが正しい
- 価格や紹介率が最新
