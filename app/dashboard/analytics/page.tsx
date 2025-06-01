"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Eye, Heart, Users, Calendar, Target, Award, Clock, BarChart3 } from "lucide-react"
import { getContentAnalytics } from "@/lib/content-storage"
import { Chart, PieChart } from "@/components/ui/chart"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const analyticsData = await getContentAnalytics(timeRange)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      blog: "📝",
      twitter: "🐦",
      instagram: "📸",
      linkedin: "💼",
      youtube: "🎥",
      email: "📧",
    }
    return icons[type as keyof typeof icons] || "📄"
  }

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? "text-green-600" : "text-red-600"
  }

  const getPerformanceLevel = (rate: number) => {
    if (rate >= 12)
      return { label: "Excellent", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
    if (rate >= 8) return { label: "Good", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" }
    if (rate >= 5)
      return { label: "Average", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" }
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" }
  }

  if (loading || !analytics) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Loading your content performance data...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Prepare chart data
  const viewsChartData = analytics.timeSeriesData.map((item: any) => ({
    name: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: item.views,
  }))

  const engagementChartData = analytics.timeSeriesData.map((item: any) => ({
    name: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: item.engagement,
  }))

  const platformChartData = Object.entries(analytics.platformBreakdown).map(([platform, count], index) => ({
    name: platform.charAt(0).toUpperCase() + platform.slice(1),
    value: count as number,
    color: `hsl(${(index * 360) / Object.keys(analytics.platformBreakdown).length}, 70%, 50%)`,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your content performance and discover insights to improve your strategy.
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="365d">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Content</p>
                <p className="text-2xl font-bold">{analytics.totalContent}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12% vs last period</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{analytics.growthMetrics.viewsGrowth}%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Engagement</p>
                <p className="text-2xl font-bold">{analytics.totalEngagement.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{analytics.growthMetrics.engagementGrowth}%</span>
                </div>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Engagement Rate</p>
                <p className="text-2xl font-bold">{analytics.avgEngagementRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Content Performance</TabsTrigger>
          <TabsTrigger value="platforms">Platform Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Views Over Time Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Daily views for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart data={viewsChartData} height={250} type="line" />
              </CardContent>
            </Card>

            {/* Engagement Over Time Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Over Time</CardTitle>
                <CardDescription>Daily engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart data={engagementChartData} height={250} type="bar" />
              </CardContent>
            </Card>
          </div>

          {/* Platform Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution by Platform</CardTitle>
              <CardDescription>How your content is distributed across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <PieChart data={platformChartData} size={300} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best content based on engagement and reach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPerforming.map((content: any, index: number) => {
                  const performance = getPerformanceLevel(content.analytics.engagementRate)
                  return (
                    <div
                      key={content.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-medium">
                          {index + 1}
                        </div>
                        <div className="text-2xl">{getTypeIcon(content.platform)}</div>
                        <div>
                          <h3 className="font-medium">{content.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className="capitalize">{content.platform}</span>
                            <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                            <Badge className={performance.color}>{performance.label}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-500">Views</p>
                          <p className="font-medium">{content.analytics.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Likes</p>
                          <p className="font-medium">{content.analytics.likes}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Comments</p>
                          <p className="font-medium">{content.analytics.comments}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Engagement</p>
                          <p className="font-medium">{content.analytics.engagementRate}%</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Content count by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart data={platformChartData} height={250} type="bar" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Breakdown</CardTitle>
                <CardDescription>Detailed platform statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.platformBreakdown).map(([platform, count]) => (
                    <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getTypeIcon(platform)}</span>
                        <div>
                          <h3 className="font-medium capitalize">{platform}</h3>
                          <p className="text-sm text-gray-500">{count} posts</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{Math.round(((count as number) / analytics.totalContent) * 100)}%</p>
                        <p className="text-sm text-gray-500">of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Best Performing Times</CardTitle>
                <CardDescription>When your audience is most active</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Best Day</span>
                  </div>
                  <Badge>Tuesday</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Best Time</span>
                  </div>
                  <Badge>2:00 PM - 4:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Peak Engagement</span>
                  </div>
                  <Badge>Wednesday 3:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Top Content Type</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {Object.entries(analytics.platformBreakdown).sort(
                      ([, a], [, b]) => (b as number) - (a as number),
                    )[0]?.[0] || "Blog Posts"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Insights</CardTitle>
                <CardDescription>Key metrics and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">Strong Performance</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your engagement rate is {analytics.avgEngagementRate}% - above industry average
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">Opportunity</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Consider posting more video content for higher engagement
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800 dark:text-purple-200">Achievement</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    You've reached {analytics.totalViews.toLocaleString()}+ total views this period!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
