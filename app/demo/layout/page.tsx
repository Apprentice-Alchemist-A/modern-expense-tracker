import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CategoryIcon } from '@/components/ui/CategoryIcon'
import { SidebarItem } from '@/components/layout/Sidebar'

// サンプルサイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    href: '/',
    icon: <span>🏠</span>
  },
  {
    id: 'quick-entry',
    label: 'クイック入力',
    href: '/quick',
    icon: <span>⚡</span>,
    badge: 'New'
  },
  {
    id: 'expenses',
    label: '支出一覧',
    href: '/expenses',
    icon: <span>📋</span>,
    badge: 12
  },
  {
    id: 'analytics',
    label: '分析',
    href: '/analytics',
    icon: <span>📊</span>
  },
  {
    id: 'stores',
    label: 'お店管理',
    href: '/stores',
    icon: <span>🏪</span>
  },
  {
    id: 'templates',
    label: 'テンプレート',
    href: '/templates',
    icon: <span>📄</span>
  },
  {
    id: 'settings',
    label: '設定',
    href: '/settings',
    icon: <span>⚙️</span>
  }
]

export default function LayoutDemoPage() {
  return (
    <AppLayout sidebarItems={sidebarItems}>
      <div className="p-6 space-y-6">
        {/* ページヘッダー */}
        <PageHeader
          title="レイアウトプレビュー"
          subtitle="Notion風のサイドバーレイアウトデモ"
          icon={<span className="text-2xl">🏗️</span>}
          breadcrumbs={[
            { label: 'デモ', href: '/demo' },
            { label: 'レイアウト' }
          ]}
          actions={
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm">編集</Button>
              <Button size="sm">保存</Button>
            </div>
          }
        />

        {/* レイアウトの説明 */}
        <Card>
          <CardHeader>
            <CardTitle>レイアウト機能</CardTitle>
            <CardDescription>
              実装されたレイアウトコンポーネントの機能一覧
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">サイドバー機能</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>• 折りたたみ対応</li>
                  <li>• アクティブ状態の表示</li>
                  <li>• バッジ表示</li>
                  <li>• アイコン + ラベル</li>
                  <li>• ホバー効果</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">ページヘッダー機能</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>• ブレッドクラム</li>
                  <li>• タイトル + サブタイトル</li>
                  <li>• アイコン表示</li>
                  <li>• アクションボタン</li>
                  <li>• レスポンシブ対応</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* サイドバーテスト */}
        <Card>
          <CardHeader>
            <CardTitle>サイドバーテスト</CardTitle>
            <CardDescription>
              左上のメニューボタンでサイドバーの折りたたみをテストできます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary-100 rounded-lg p-4">
              <p className="text-sm text-primary-700">
                💡 ヒント: 左上のハンバーガーメニュー（≡）をクリックしてサイドバーを折りたたんでみてください。
                アイコンのみ表示に切り替わります。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* レスポンシブテスト */}
        <Card>
          <CardHeader>
            <CardTitle>レスポンシブテスト</CardTitle>
            <CardDescription>
              ウィンドウサイズを変更してレスポンシブ動作を確認
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card variant="bordered" padding="sm">
                <div className="flex items-center space-x-2">
                  <CategoryIcon category="food" size="sm" />
                  <span className="text-sm">モバイル</span>
                </div>
              </Card>
              <Card variant="bordered" padding="sm">
                <div className="flex items-center space-x-2">
                  <CategoryIcon category="transport" size="sm" />
                  <span className="text-sm">タブレット</span>
                </div>
              </Card>
              <Card variant="bordered" padding="sm">
                <div className="flex items-center space-x-2">
                  <CategoryIcon category="entertainment" size="sm" />
                  <span className="text-sm">デスクトップ</span>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* カラーバリエーション */}
        <Card>
          <CardHeader>
            <CardTitle>Notion風デザイン</CardTitle>
            <CardDescription>
              シンプルで洗練されたデザインシステム
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-primary-100 rounded"></div>
                <span className="text-sm">背景色: primary-50</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-white rounded border"></div>
                <span className="text-sm">カード背景: white</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-primary-900 rounded"></div>
                <span className="text-sm">アクティブ: primary-900</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-primary-200 rounded border"></div>
                <span className="text-sm">境界線: primary-200</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}