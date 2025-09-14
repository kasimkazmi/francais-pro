import { Metadata } from 'next'
import { Heart, Coffee, Users, Star, Gift, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Support Français Pro | Help Build the Future of French Learning',
  description: 'Support Français Pro and help us build the best French learning platform. Choose from various funding options and join our community of supporters.',
  keywords: ['support', 'donate', 'French learning', 'Français Pro', 'funding', 'sponsor'],
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Support Français Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help us build the future of French learning. Your support enables us to create 
            amazing content, improve the platform, and help more people learn French.
          </p>
        </div>

        {/* Why Support */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className=' text-gray-600 dark:text-gray-300 '>Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Help thousands of French learners worldwide access quality education
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className=' text-gray-600 dark:text-gray-300 '>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Support cutting-edge features and AI-powered learning tools
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className=' text-gray-600 dark:text-gray-300 '>Quality Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Enable creation of premium French learning materials and cultural content
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Funding Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* GitHub Sponsors */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600 dark:text-gray-300 ">
                <Gift className="h-5 w-5 text-blue-500" />
                GitHub Sponsors
              </CardTitle>
              <Badge variant="secondary" className=' text-gray-600 dark:text-gray-300 '>Developer Friendly</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Support the project through GitHub&apos;s native sponsorship platform
              </p>
              <Button className="w-full text-gray-600 dark:text-gray-300 " asChild>
                <a href="https://github.com/sponsors/kasimkazmi" target="_blank" rel="noopener noreferrer">
                  Sponsor on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Ko-fi */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-pink-500" />
                Ko-fi
              </CardTitle>
              <Badge variant="secondary">Buy Me a Coffee</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Show your appreciation with a small donation - perfect for coffee breaks!
              </p>
              <Button className="w-full" variant="outline" asChild>
                <a href="https://ko-fi.com/francais_pro" target="_blank" rel="noopener noreferrer">
                  Buy a Coffee
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Open Collective */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Open Collective
              </CardTitle>
              <Badge variant="secondary">Transparent</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Support with complete financial transparency and community governance
              </p>
              <Button className="w-full" variant="outline" asChild>
                <a href="https://opencollective.com/francais-pro" target="_blank" rel="noopener noreferrer">
                  Join Collective
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* What Your Support Enables */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What Your Support Enables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Development & Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• New learning modules and content</li>
                  <li>• AI-powered pronunciation feedback</li>
                  <li>• Mobile app development</li>
                  <li>• Advanced progress tracking</li>
                  <li>• Offline learning capabilities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Community & Support</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Community forums and discussions</li>
                  <li>• Live tutoring sessions</li>
                  <li>• Cultural events and workshops</li>
                  <li>• Multilingual support</li>
                  <li>• Accessibility improvements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Tiers */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Support Tiers</CardTitle>
            <CardDescription className="text-center">
              Choose the level of support that works for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <h3 className="font-bold text-lg mb-2">☕ Coffee Supporter</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$5/month</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Help keep the lights on and support basic development
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Your name in our supporters list</li>
                  <li>• Early access to new features</li>
                  <li>• Monthly progress updates</li>
                </ul>
              </div>

              <div className="text-center p-6 border rounded-lg border-blue-500">
                <h3 className="font-bold text-lg mb-2">🌟 French Enthusiast</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$15/month</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Support content creation and feature development
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Everything from Coffee Supporter</li>
                  <li>• Exclusive learning materials</li>
                  <li>• Priority support</li>
                  <li>• Beta testing access</li>
                </ul>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <h3 className="font-bold text-lg mb-2">🚀 Champion</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$50/month</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Help us build the future of French learning
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Everything from French Enthusiast</li>
                  <li>• Direct input on new features</li>
                  <li>• Personal thank you video</li>
                  <li>• Custom learning path</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thank You */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Merci Beaucoup! 🙏
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every contribution, no matter the size, helps us make French learning 
            more accessible and enjoyable for everyone. Thank you for being part 
            of our mission to spread the love of French language and culture!
          </p>
        </div>
      </div>
    </div>
  )
}
