import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>経費・食事管理アプリ</CardTitle>
            <CardDescription>
              Notion風の洗練された経費管理アプリケーション
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">📈 開発状況（2025年6月22日）</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✅ <strong>UIシステム完成</strong>: デザインシステム、コンポーネント、レイアウト</li>
                <li>✅ <strong>認証システム完成</strong>: Supabase Auth + Google OAuth</li>
                <li>✅ <strong>データベース設計完成</strong>: 新スキーマ（stores, tags, templates対応）</li>
                <li>✅ <strong>SVGアイコンシステム完成</strong>: 全25種類のアイコン実装</li>
                <li>✅ <strong>支出表示機能完成</strong>: カード・リスト・テーブル表示切り替え</li>
                <li>🔄 <strong>現在開発中</strong>: フィルター機能、新規追加フォーム</li>
                <li>📋 <strong>今後の予定</strong>: Vercelデプロイ、本格運用開始</li>
              </ul>
            </div>
            
            <p className="text-primary-700">
              以下のページで各機能をプレビューできます：
            </p>
            
            <div className="space-y-6">
              {/* メイン機能 */}
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">🚀 メイン機能</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link href="/expenses">
                    <Button variant="primary" className="w-full justify-start">
                      <Icon name="expense" category="navigation" size="sm" className="mr-2" />
                      支出一覧（メイン機能）
                    </Button>
                  </Link>
                  
                  <Link href="/test-icons">
                    <Button variant="secondary" className="w-full justify-start">
                      🎨 アイコンテスト（SVG確認）
                    </Button>
                  </Link>
                </div>
              </div>

              {/* データベース・認証テスト */}
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">🗄️ データベース・認証</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link href="/demo/auth-layout">
                    <Button variant="secondary" className="w-full justify-start">
                      🔐 認証レイアウト
                    </Button>
                  </Link>
                  
                  <Link href="/test-supabase">
                    <Button variant="secondary" className="w-full justify-start">
                      📊 Supabase接続テスト（旧）
                    </Button>
                  </Link>
                  
                  <Link href="/test-new-db">
                    <Button variant="secondary" className="w-full justify-start">
                      🆕 新データベーステスト
                    </Button>
                  </Link>
                </div>
              </div>

              {/* UIコンポーネント */}
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">🎛️ UIコンポーネント</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link href="/demo">
                    <Button variant="secondary" className="w-full justify-start">
                      📋 UIコンポーネント一覧
                    </Button>
                  </Link>
                  
                  <Link href="/demo/components">
                    <Button variant="secondary" className="w-full justify-start">
                      🧩 基本コンポーネント
                    </Button>
                  </Link>
                  
                  <Link href="/demo/layout">
                    <Button variant="secondary" className="w-full justify-start">
                      📐 レイアウトプレビュー
                    </Button>
                  </Link>
                  
                  <Link href="/demo/icons">
                    <Button variant="secondary" className="w-full justify-start">
                      🎯 アイコンプレビュー（旧）
                    </Button>
                  </Link>
                  
                  <Link href="/demo/icons-new">
                    <Button variant="secondary" className="w-full justify-start">
                      ✨ アイコンプレビュー（新）
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}