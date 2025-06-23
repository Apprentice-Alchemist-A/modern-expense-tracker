'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { useAuth } from '@/components/auth/AuthProvider'
import { SidebarItem } from '@/components/layout/Sidebar'

// サンプルサイドバーアイテム
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    href: '/dashboard',
    icon: <Icon name="home" category="navigation" size="sm" />
  },
  {
    id: 'expenses',
    label: '支出一覧',
    href: '/expenses',
    icon: <Icon name="analytics" category="navigation" size="sm" />,
    badge: 'New'
  },
  {
    id: 'settings',
    label: '設定',
    href: '/settings',
    icon: <Icon name="settings" category="navigation" size="sm" />
  }
]

export default function AuthLayoutDemoPage() {
  const { user, loading } = useAuth()

  return (
    <AppLayout sidebarItems={sidebarItems}>
      <div className="p-6 space-y-6">
        <PageHeader
          title="認証レイアウトプレビュー"
          subtitle="認証機能を統合したレイアウト"
          breadcrumbs={[
            { label: 'デモ', href: '/demo' },
            { label: '認証レイアウト' }
          ]}
        />

        <Card>
          <CardHeader>
            <CardTitle>認証状態</CardTitle>
            <CardDescription>
              現在の認証状態とユーザー情報
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="p-4 bg-primary-100 rounded-lg">
                <p className="text-sm text-primary-700">認証情報を読み込み中...</p>
              </div>
            ) : user ? (
              <div className="p-4 bg-success/10 rounded-lg">
                <p className="text-sm font-medium text-success">✓ ログイン済み</p>
                <p className="text-sm text-primary-700 mt-1">メール: {user.email}</p>
                <p className="text-xs text-primary-600 mt-1">ユーザーID: {user.id}</p>
              </div>
            ) : (
              <div className="p-4 bg-warning/10 rounded-lg">
                <p className="text-sm font-medium text-warning">未ログイン</p>
                <p className="text-sm text-primary-700 mt-1">
                  右上のログインボタンからGoogleアカウントでログインできます
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>機能説明</CardTitle>
            <CardDescription>
              実装された認証機能の一覧
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">ヘッダー機能</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>• 未ログイン時: ログインボタン表示</li>
                  <li>• ログイン済み: ユーザーアバター表示</li>
                  <li>• ドロップダウンメニューからログアウト可能</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">認証フロー</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>• Google OAuth認証</li>
                  <li>• 認証後は元のページに自動リダイレクト</li>
                  <li>• セッション管理（リロード後も維持）</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">サイドバー統合</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>• SVGアイコンのvariant対応</li>
                  <li>• アクティブ状態の表示</li>
                  <li>• バッジ表示対応</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}