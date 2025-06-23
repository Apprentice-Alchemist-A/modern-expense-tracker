import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { CategoryIcon } from '@/components/ui/CategoryIcon'

export default function ComponentDemoPage() {
  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <Card>
          <CardHeader>
            <CardTitle>基本UIコンポーネント</CardTitle>
            <CardDescription>
              Button、Input、Cardコンポーネントのプレビューページ
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Button コンポーネント */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>
              5種類のバリアント × 3種類のサイズ + アイコン対応
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* バリアント */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">バリアント</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">プライマリ</Button>
                <Button variant="secondary">セカンダリ</Button>
                <Button variant="ghost">ゴースト</Button>
                <Button variant="danger">デンジャー</Button>
                <Button variant="success">サクセス</Button>
              </div>
            </div>

            {/* サイズ */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">サイズ</h4>
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* アイコン付き */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">アイコン付き</h4>
              <div className="flex flex-wrap gap-4">
                <Button 
                  icon={<CategoryIcon category="food" size="sm" className="text-white filter brightness-0 invert" />}
                  iconPosition="left"
                >
                  左アイコン
                </Button>
                <Button 
                  variant="secondary"
                  icon={<CategoryIcon category="transport" size="sm" className="text-primary-700" />}
                  iconPosition="right"
                >
                  右アイコン
                </Button>
                <Button 
                  variant="ghost"
                  icon={<CategoryIcon category="entertainment" size="sm" className="text-primary-700" />}
                >
                  アイコンのみ
                </Button>
              </div>
            </div>

            {/* 状態 */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">状態</h4>
              <div className="flex gap-4">
                <Button loading>読み込み中</Button>
                <Button disabled>無効</Button>
                <Button fullWidth>フル幅</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input コンポーネント */}
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              3種類のバリアント × 3種類のサイズ + プレフィックス・サフィックス対応
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* バリアント */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-md font-medium text-primary-800 mb-4">Default</h4>
                <Input 
                  variant="default"
                  label="店名"
                  placeholder="例：松屋"
                  hint="よく行く店名を入力"
                />
              </div>
              <div>
                <h4 className="text-md font-medium text-primary-800 mb-4">Filled</h4>
                <Input 
                  variant="filled"
                  label="金額"
                  placeholder="500"
                  type="number"
                />
              </div>
              <div>
                <h4 className="text-md font-medium text-primary-800 mb-4">Minimal</h4>
                <Input 
                  variant="minimal"
                  label="メモ"
                  placeholder="自由記述"
                />
              </div>
            </div>

            {/* サイズ */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">サイズ</h4>
              <div className="space-y-3">
                <Input size="sm" placeholder="Small サイズ" />
                <Input size="md" placeholder="Medium サイズ" />
                <Input size="lg" placeholder="Large サイズ" />
              </div>
            </div>

            {/* プレフィックス・サフィックス */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">プレフィックス・サフィックス</h4>
              <div className="space-y-3">
                <Input 
                  label="検索"
                  placeholder="店名を検索"
                  prefix={<span>🔍</span>}
                />
                <Input 
                  label="金額"
                  placeholder="0"
                  type="number"
                  suffix={<span className="text-sm">円</span>}
                />
                <Input 
                  label="URL"
                  placeholder="example"
                  prefix={<span className="text-xs font-mono">https://</span>}
                  suffix={<span className="text-xs font-mono">.com</span>}
                />
              </div>
            </div>

            {/* エラー・必須 */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">エラー・必須</h4>
              <div className="space-y-3">
                <Input 
                  label="必須フィールド"
                  placeholder="入力してください"
                  required
                />
                <Input 
                  label="エラーフィールド"
                  placeholder="正しく入力してください"
                  error="この項目は必須です"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card コンポーネント */}
        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>
              4種類のバリアント × 4種類のパディング + ホバー・クリック対応
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* バリアント */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="default" padding="md">
                <CardTitle className="text-base">Default</CardTitle>
                <CardDescription>標準シャドウ</CardDescription>
              </Card>
              <Card variant="bordered" padding="md">
                <CardTitle className="text-base">Bordered</CardTitle>
                <CardDescription>境界線付き</CardDescription>
              </Card>
              <Card variant="elevated" padding="md">
                <CardTitle className="text-base">Elevated</CardTitle>
                <CardDescription>強いシャドウ</CardDescription>
              </Card>
              <Card variant="flat" padding="md">
                <CardTitle className="text-base">Flat</CardTitle>
                <CardDescription>シャドウなし</CardDescription>
              </Card>
            </div>

            {/* インタラクティブ */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">インタラクティブ</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card hoverable padding="md">
                  <CardTitle className="text-base">ホバー効果</CardTitle>
                  <CardDescription>マウスオーバーで浮き上がる</CardDescription>
                </Card>
                <Card clickable padding="md">
                  <CardTitle className="text-base">クリック可能</CardTitle>
                  <CardDescription>クリックできることを示す</CardDescription>
                </Card>
              </div>
            </div>

            {/* 複雑なカード例 */}
            <div>
              <h4 className="text-md font-medium text-primary-800 mb-4">支出カード例</h4>
              <Card hoverable clickable>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-category-food rounded-lg flex items-center justify-center">
                        <CategoryIcon category="food" size="md" className="text-white filter brightness-0 invert" />
                      </div>
                      <div>
                        <CardTitle className="text-base">松屋で昼食</CardTitle>
                        <CardDescription>2024年1月15日</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-900">¥480</p>
                      <p className="text-sm text-primary-500">PayPay</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>牛めし</span>
                      <span>¥350</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>みそ汁</span>
                      <span>¥130</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">編集</Button>
                    <Button size="sm" variant="ghost">削除</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}