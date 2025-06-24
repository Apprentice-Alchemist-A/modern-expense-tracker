'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="border-b border-primary-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="analytics" category="navigation" size="md" className="text-primary-600" />
              <h1 className="text-xl font-bold text-primary-900">Modern Expense Tracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/demo-dashboard">
                <Button variant="outline">デモを見る</Button>
              </Link>
              <Link href="/dashboard">
                <Button>ログインして使用</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-primary-900 mb-6">
            シンプルで美しい<br />
            <span className="text-primary-600">経費管理アプリ</span>
          </h2>
          <p className="text-xl text-primary-700 mb-8 leading-relaxed">
            Notion風の洗練されたUIで、日々の支出を効率的に管理。<br />
            直感的な操作で家計簿をもっと身近に。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/demo-dashboard">
              <Button size="lg" className="px-8">
                <Icon name="arrow-right" category="actions" size="sm" className="mr-2" />
                デモを体験
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8">
                <Icon name="user" category="navigation" size="sm" className="mr-2" />
                ログインして使用
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-primary-900 text-center mb-12">
          主な機能
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="analytics" category="navigation" size="md" className="text-primary-600" />
              </div>
              <CardTitle>リアルタイム分析</CardTitle>
              <CardDescription>
                支出データをリアルタイムで分析し、美しいグラフで可視化
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="analytics" category="navigation" size="md" className="text-success-600" />
              </div>
              <CardTitle>高度なフィルタリング</CardTitle>
              <CardDescription>
                日付範囲、カテゴリ、金額などの条件で素早く絞り込み
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="settings" category="navigation" size="md" className="text-warning-600" />
              </div>
              <CardTitle>カスタマイズ可能</CardTitle>
              <CardDescription>
                自分好みにカテゴリや支払方法をカスタマイズ
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary-900 mb-4">機能をお試しください</h3>
            <p className="text-lg text-primary-700">
              ログイン不要で主要機能をプレビューできます
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/demo-dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Icon name="analytics" category="navigation" size="md" className="text-primary-600 mb-2" />
                  <CardTitle>ダッシュボード</CardTitle>
                  <CardDescription>
                    支出サマリーとグラフ分析
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/demo-expenses">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Icon name="expense" category="navigation" size="md" className="text-success-600 mb-2" />
                  <CardTitle>支出一覧</CardTitle>
                  <CardDescription>
                    フィルター・ソート機能付き
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/demo">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Icon name="settings" category="navigation" size="md" className="text-warning-600 mb-2" />
                  <CardTitle>UIコンポーネント</CardTitle>
                  <CardDescription>
                    デザインシステム一覧
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">今すぐ始めてみませんか？</h3>
          <p className="text-xl text-primary-100 mb-8">
            アカウント作成は簡単。Googleアカウントで即座に利用開始できます。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/demo-dashboard">
              <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8">
                デモを試す
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="px-8">
                本格利用を始める
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-50 border-t border-primary-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-600">
            © 2025 Modern Expense Tracker. Built with Next.js & Supabase.
          </p>
        </div>
      </footer>
    </div>
  )
}