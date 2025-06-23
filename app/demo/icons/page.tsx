import { CategoryIcon } from '@/components/ui/CategoryIcon'
import { PaymentIcon } from '@/components/ui/PaymentIcon'
import { CATEGORY_COLORS } from '@/lib/constants/design-tokens'

export default function IconDemoPage() {
  const categories = [
    { key: 'food', name: '食費' },
    { key: 'transport', name: '交通費' },
    { key: 'entertainment', name: '娯楽費' },
    { key: 'daily', name: '日用品' },
    { key: 'medical', name: '医療費' },
    { key: 'education', name: '教育費' },
    { key: 'other', name: 'その他' }
  ] as const

  const payments = [
    { key: 'cash', name: '現金' },
    { key: 'credit', name: 'クレジットカード' },
    { key: 'ic_card', name: 'ICカード' },
    { key: 'e_money', name: '電子マネー' },
    { key: 'bank_transfer', name: '銀行振込' }
  ] as const

  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            アイコンプレビュー
          </h1>
          <p className="text-primary-600">
            フリー素材アイコンと絵文字の比較表示
          </p>
        </div>

        {/* カテゴリアイコン */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">カテゴリアイコン</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary-800 mb-4">SVGアイコン</h3>
              <div className="grid grid-cols-4 gap-4">
                {categories.map(({ key, name }) => (
                  <div key={key} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: CATEGORY_COLORS[key] }}
                    >
                      <CategoryIcon 
                        category={key} 
                        size="lg" 
                        useSvg={true}
                        className="text-white filter brightness-0 invert"
                      />
                    </div>
                    <p className="text-sm text-center">{name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-primary-800 mb-4">絵文字（フォールバック）</h3>
              <div className="grid grid-cols-4 gap-4">
                {categories.map(({ key, name }) => (
                  <div key={key} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: CATEGORY_COLORS[key] }}
                    >
                      <CategoryIcon 
                        category={key} 
                        size="lg" 
                        useSvg={false}
                      />
                    </div>
                    <p className="text-sm text-center">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 支払方法アイコン */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">支払方法アイコン</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary-800 mb-4">SVGアイコン</h3>
              <div className="grid grid-cols-5 gap-4">
                {payments.map(({ key, name }) => (
                  <div key={key} className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                      <PaymentIcon 
                        paymentMethod={key} 
                        size="lg" 
                        useSvg={true}
                        className="text-primary-700"
                      />
                    </div>
                    <p className="text-sm text-center">{name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-primary-800 mb-4">絵文字（フォールバック）</h3>
              <div className="grid grid-cols-5 gap-4">
                {payments.map(({ key, name }) => (
                  <div key={key} className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                      <PaymentIcon 
                        paymentMethod={key} 
                        size="lg" 
                        useSvg={false}
                      />
                    </div>
                    <p className="text-sm text-center">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* サイズバリエーション */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">サイズバリエーション</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="w-20 text-sm">Small (sm):</span>
              <CategoryIcon category="food" size="sm" useSvg={true} />
              <PaymentIcon paymentMethod="cash" size="sm" useSvg={true} />
            </div>
            <div className="flex items-center space-x-4">
              <span className="w-20 text-sm">Medium (md):</span>
              <CategoryIcon category="food" size="md" useSvg={true} />
              <PaymentIcon paymentMethod="cash" size="md" useSvg={true} />
            </div>
            <div className="flex items-center space-x-4">
              <span className="w-20 text-sm">Large (lg):</span>
              <CategoryIcon category="food" size="lg" useSvg={true} />
              <PaymentIcon paymentMethod="cash" size="lg" useSvg={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}