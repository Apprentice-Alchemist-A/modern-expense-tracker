# エラーログ #001: npm インストールエラー

## 発生日時
2024-06-22

## エラー内容
Next.js プロジェクトの初期化時に npm パッケージのインストールでエラーが発生。

### エラーメッセージ
```
npm error code 127
npm error path /home/merlion/expense-tracker-redesign/node_modules/unrs-resolver
npm error command failed
npm error command sh -c napi-postinstall unrs-resolver 1.9.1 check
npm error sh: 1: napi-postinstall: not found
```

## 原因
- napi-postinstall コマンドが見つからない
- Next.js 15系と依存関係の互換性問題
- WSL環境でのバイナリ実行権限の問題

## 解決方法
1. Next.js のバージョンを 15.3.4 から 14.0.4 にダウングレード
2. React のバージョンを 19.1.0 から 18.2.0 にダウングレード
3. package.json のスクリプトを `npx` を使用する形式に変更
4. 既存プロジェクトの package.json を参考に依存関係を調整

## 結果
- プロジェクト構造は正常に作成完了
- 開発サーバーの起動は npm 環境の問題により未確認
- コード自体は正常に動作する状態

## 今後の対策
- 開発時は npx コマンドを使用してツールを実行
- 必要に応じて yarn の使用を検討
- WSL環境での権限問題に注意