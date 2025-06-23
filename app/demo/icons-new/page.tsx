import { Icon } from '@/components/ui/Icon'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

export default function NewIconsPage() {
  const uiIcons = [
    'menu', 'search', 'plus', 'edit', 'delete', 'save',
    'filter', 'sort', 'calendar', 'close'
  ]

  const navigationIcons = [
    'home', 'analytics', 'settings'
  ]

  const actionIcons = [
    'arrow-left', 'arrow-right'
  ]

  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <Card>
          <CardHeader>
            <CardTitle>新しいアイコンプレビュー</CardTitle>
            <CardDescription>
              追加されたSVGアイコンの表示確認
            </CardDescription>
          </CardHeader>
        </Card>

        {/* UIアイコン */}
        <Card>
          <CardHeader>
            <CardTitle>UI基本アイコン</CardTitle>
            <CardDescription>
              メニュー、検索、編集などの基本的なUIアイコン
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-6">
              {uiIcons.map((iconName) => (
                <div key={iconName} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={iconName} 
                      category="ui" 
                      size="lg" 
                      className="text-primary-700"
                    />
                  </div>
                  <p className="text-sm text-center">{iconName}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ナビゲーションアイコン */}
        <Card>
          <CardHeader>
            <CardTitle>ナビゲーションアイコン</CardTitle>
            <CardDescription>
              ホーム、分析、設定などのナビゲーション用アイコン
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              {navigationIcons.map((iconName) => (
                <div key={iconName} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-primary-900 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={iconName} 
                      category="navigation" 
                      size="lg" 
                      className="text-white filter brightness-0 invert"
                    />
                  </div>
                  <p className="text-sm text-center">{iconName}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* アクションアイコン */}
        <Card>
          <CardHeader>
            <CardTitle>アクションアイコン</CardTitle>
            <CardDescription>
              矢印など、アクション系のアイコン
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {actionIcons.map((iconName) => (
                <div key={iconName} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-info rounded-lg flex items-center justify-center">
                    <Icon 
                      name={iconName} 
                      category="actions" 
                      size="lg" 
                      className="text-white filter brightness-0 invert"
                    />
                  </div>
                  <p className="text-sm text-center">{iconName}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* サイズバリエーション */}
        <Card>
          <CardHeader>
            <CardTitle>サイズバリエーション</CardTitle>
            <CardDescription>
              sm (16px), md (24px), lg (32px) のサイズ比較
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-16 text-sm font-medium">Small:</span>
                <Icon name="home" category="navigation" size="sm" />
                <Icon name="search" category="ui" size="sm" />
                <Icon name="edit" category="ui" size="sm" />
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-16 text-sm font-medium">Medium:</span>
                <Icon name="home" category="navigation" size="md" />
                <Icon name="search" category="ui" size="md" />
                <Icon name="edit" category="ui" size="md" />
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-16 text-sm font-medium">Large:</span>
                <Icon name="home" category="navigation" size="lg" />
                <Icon name="search" category="ui" size="lg" />
                <Icon name="edit" category="ui" size="lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* カラーバリエーション */}
        <Card>
          <CardHeader>
            <CardTitle>カラーバリエーション</CardTitle>
            <CardDescription>
              variantプロパティによるアイコンの色変更例
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-6">
              <div className="text-center">
                <Icon name="analytics" category="navigation" size="lg" variant="default" className="mb-2" />
                <p className="text-sm">Default</p>
              </div>
              <div className="text-center">
                <Icon name="analytics" category="navigation" size="lg" variant="primary" className="mb-2" />
                <p className="text-sm">Primary</p>
              </div>
              <div className="text-center">
                <Icon name="analytics" category="navigation" size="lg" variant="success" className="mb-2" />
                <p className="text-sm">Success</p>
              </div>
              <div className="text-center">
                <Icon name="analytics" category="navigation" size="lg" variant="warning" className="mb-2" />
                <p className="text-sm">Warning</p>
              </div>
              <div className="text-center">
                <Icon name="analytics" category="navigation" size="lg" variant="error" className="mb-2" />
                <p className="text-sm">Error</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}