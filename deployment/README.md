# デプロイメント関連ファイル

このディレクトリには、各プラットフォームへのデプロイメントに関する情報とトラブルシューティング資料が含まれています。

## 📁 ディレクトリ構成

```
deployment/
├── README.md              # このファイル
├── vercel/               # Vercel関連
│   ├── latest-error.md   # 最新エラーログ（上書き更新）
│   └── debug-info.md     # デバッグ情報・設定情報
└── (他プラットフォーム用ディレクトリ)
```

## 🚀 Vercel デプロイメント

### エラー報告手順
1. **`/deployment/vercel/latest-error.md`** を開く
2. 「現在のエラー内容」セクションにエラーログを**上書き**で貼り付け
3. エラー解析と対策を実施

### デバッグ情報
**`/deployment/vercel/debug-info.md`** に以下の情報が記録されています：
- プロジェクト設定
- 環境変数
- ビルド設定
- 既知の問題
- トラブルシューティング手順

## 📝 使用方法

**エラーが発生した場合:**
```bash
# 1. エラーログファイルを開く
code deployment/vercel/latest-error.md

# 2. Vercelのエラーログをコピペして上書き保存

# 3. Git commit（必要に応じて）
git add deployment/
git commit -m "update: latest Vercel error log"
```

## 🔧 対策の記録

エラーが解決したら、**debug-info.md** の「既知の問題」セクションに解決策を記録してください。

---

**Note**: このディレクトリは継続的に更新され、デプロイメントの課題解決に使用されます。