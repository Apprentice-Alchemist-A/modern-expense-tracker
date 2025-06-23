export default function DemoPage() {
  return (
    <div className="min-h-screen bg-primary-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            デザインシステムプレビュー
          </h1>
          <p className="text-primary-600">
            Notion風のデザインシステムのプレビューページです
          </p>
        </div>

        {/* カラーパレット */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">カラーパレット</h2>
          
          {/* プライマリカラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-primary-800 mb-4">プライマリカラー</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary-50 rounded-md border"></div>
                <p className="text-sm text-center">50</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary-100 rounded-md"></div>
                <p className="text-sm text-center">100</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary-300 rounded-md"></div>
                <p className="text-sm text-center">300</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary-500 rounded-md"></div>
                <p className="text-sm text-center">500</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary-900 rounded-md"></div>
                <p className="text-sm text-center">900</p>
              </div>
            </div>
          </div>

          {/* セマンティックカラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-primary-800 mb-4">セマンティックカラー</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-success rounded-md"></div>
                <p className="text-sm text-center">Success</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-warning rounded-md"></div>
                <p className="text-sm text-center">Warning</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-error rounded-md"></div>
                <p className="text-sm text-center">Error</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-info rounded-md"></div>
                <p className="text-sm text-center">Info</p>
              </div>
            </div>
          </div>

          {/* カテゴリカラー */}
          <div>
            <h3 className="text-lg font-medium text-primary-800 mb-4">カテゴリカラー</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-category-food rounded-md flex items-center justify-center text-white text-2xl">
                  🍴
                </div>
                <p className="text-sm text-center">食費</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-category-transport rounded-md flex items-center justify-center text-white text-2xl">
                  🚇
                </div>
                <p className="text-sm text-center">交通費</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-category-entertainment rounded-md flex items-center justify-center text-white text-2xl">
                  🎮
                </div>
                <p className="text-sm text-center">娯楽費</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-category-daily rounded-md flex items-center justify-center text-white text-2xl">
                  🧴
                </div>
                <p className="text-sm text-center">日用品</p>
              </div>
            </div>
          </div>
        </div>

        {/* タイポグラフィ */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">タイポグラフィ</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-primary-600 mb-1">text-4xl</p>
              <p className="text-4xl">経費・食事管理アプリ</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 mb-1">text-3xl</p>
              <p className="text-3xl">大見出し</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 mb-1">text-2xl</p>
              <p className="text-2xl">中見出し</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 mb-1">text-xl</p>
              <p className="text-xl">小見出し</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 mb-1">text-base</p>
              <p className="text-base">本文テキスト</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 mb-1">text-sm</p>
              <p className="text-sm">小さなテキスト</p>
            </div>
          </div>
        </div>

        {/* シャドウ */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">シャドウ</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm">shadow-sm</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-base">
              <p className="text-sm">shadow-base</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm">shadow-md</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm">shadow-lg</p>
            </div>
          </div>
        </div>

        {/* アニメーション */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-6">アニメーション</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-primary-100 p-8 rounded-lg animate-fade-in">
              <p className="text-center">フェードイン</p>
            </div>
            <div className="bg-primary-100 p-8 rounded-lg animate-slide-in">
              <p className="text-center">スライドイン</p>
            </div>
            <div className="bg-primary-100 p-8 rounded-lg animate-scale-in">
              <p className="text-center">スケールイン</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}