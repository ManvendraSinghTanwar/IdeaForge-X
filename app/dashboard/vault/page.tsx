"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Copy, Edit, Trash2, Calendar, Tag, Eye, TrendingUp, Share, BarChart3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSavedContent, deleteContent } from "@/lib/content-storage"
import { toast } from "@/hooks/use-toast"

interface SavedContent {
  id: string
  title: string
  content: any
  platform: string
  keyword: string
  goal: string
  audience: string
  tone: string
  createdAt: string
  updatedAt: string
  status: "draft" | "published" | "scheduled"
  analytics: {
    views: number
    likes: number
    comments: number
    shares: number
    engagementRate: number
    clickThroughRate: number
    impressions: number
  }
  publishedTo?: {
    platform: string
    postId: string
    publishedAt: string
    url?: string
  }[]
}

export default function VaultPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [savedContent, setSavedContent] = useState<SavedContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const content = await getSavedContent()
      setSavedContent(content)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load saved content.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteContent(id)
      setSavedContent((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: "Deleted",
        description: "Content has been deleted from your vault.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content.",
        variant: "destructive",
      })
    }
  }

  const handleCopy = (content: SavedContent) => {
    const textContent = JSON.stringify(content.content, null, 2)
    navigator.clipboard.writeText(textContent)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    })
  }

  const contentTypes = [
    { value: "all", label: "All Content" },
    { value: "blog", label: "Blog Posts" },
    { value: "twitter", label: "Twitter Threads" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "youtube", label: "YouTube" },
    { value: "email", label: "Email" },
  ]

  const statusTypes = [
    { value: "all", label: "All Status" },
    { value: "draft", label: "Drafts" },
    { value: "published", label: "Published" },
    { value: "scheduled", label: "Scheduled" },
  ]

  const getTypeColor = (type: string) => {
    const colors = {
      blog: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      twitter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      linkedin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      youtube: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      email: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const filteredContent = savedContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.platform === filterType
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const sortedContent = filteredContent.sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "performance":
        return b.analytics.engagementRate - a.analytics.engagementRate
      case "views":
        return b.analytics.views - a.analytics.views
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Vault</h1>
          <p className="text-gray-500 dark:text-gray-400">Loading your saved content...</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Vault</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and organize your saved content ideas and generated content with performance analytics.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Content</p>
                <p className="text-2xl font-bold">{savedContent.length}</p>
              </div>
              <Tag className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {savedContent.filter((item) => item.status === "published").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">
                  {savedContent.reduce((sum, item) => sum + item.analytics.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Engagement</p>
                <p className="text-2xl font-bold">
                  {savedContent.length > 0
                    ? Math.round(
                        (savedContent.reduce((sum, item) => sum + item.analytics.engagementRate, 0) /
                          savedContent.length) *
                          100,
                      ) / 100
                    : 0}
                  %
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusTypes.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedContent.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(item.platform)}>{item.platform}</Badge>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(item)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Tag className="h-3 w-3" />
                {item.keyword}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Performance Metrics */}
                {item.status === "published" && (
                  <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span className="text-sm font-medium">{item.analytics.views.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-gray-500">Views</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-sm font-medium">{item.analytics.engagementRate}%</span>
                      </div>
                      <span className="text-xs text-gray-500">Engagement</span>
                    </div>
                  </div>
                )}

                {/* Published Platforms */}
                {item.publishedTo && item.publishedTo.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Published to:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.publishedTo.map((pub, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {pub.platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {item.status === "draft" && (
                      <Button variant="default" size="sm" asChild>
                        <a href="/dashboard/accounts">
                          <Share className="h-3 w-3 mr-1" />
                          Publish
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedContent.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No content found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Try adjusting your search terms" : "Start creating content to see it here"}
                </p>
              </div>
              <Button asChild>
                <a href="/dashboard/create">Create New Content</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
