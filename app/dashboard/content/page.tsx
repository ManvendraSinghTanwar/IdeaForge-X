"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Download,
  Share,
  Calendar,
  TrendingUp,
  FileText,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock content data
  const contentData = [
    {
      id: 1,
      title: "10 Productivity Tips for Remote Workers",
      type: "blog",
      status: "published",
      platform: "Website",
      createdAt: "2024-06-01",
      publishedAt: "2024-06-01",
      views: 1250,
      engagement: 85,
      keywords: ["productivity", "remote work"],
      performance: "high",
    },
    {
      id: 2,
      title: "The Future of AI in Marketing",
      type: "twitter",
      status: "scheduled",
      platform: "Twitter",
      createdAt: "2024-05-30",
      publishedAt: "2024-06-02",
      views: 0,
      engagement: 0,
      keywords: ["AI", "marketing"],
      performance: "pending",
    },
    {
      id: 3,
      title: "Building Your Personal Brand",
      type: "linkedin",
      status: "draft",
      platform: "LinkedIn",
      createdAt: "2024-05-28",
      publishedAt: null,
      views: 0,
      engagement: 0,
      keywords: ["personal branding", "career"],
      performance: "pending",
    },
    {
      id: 4,
      title: "Social Media Strategy for 2025",
      type: "instagram",
      status: "published",
      platform: "Instagram",
      createdAt: "2024-05-25",
      publishedAt: "2024-05-26",
      views: 890,
      engagement: 67,
      keywords: ["social media", "strategy"],
      performance: "medium",
    },
    {
      id: 5,
      title: "Email Marketing Best Practices",
      type: "email",
      status: "published",
      platform: "Email",
      createdAt: "2024-05-20",
      publishedAt: "2024-05-21",
      views: 2100,
      engagement: 92,
      keywords: ["email marketing", "conversion"],
      performance: "high",
    },
    {
      id: 6,
      title: "YouTube Growth Strategies",
      type: "youtube",
      status: "published",
      platform: "YouTube",
      createdAt: "2024-05-15",
      publishedAt: "2024-05-16",
      views: 3200,
      engagement: 78,
      keywords: ["YouTube", "growth"],
      performance: "high",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog":
        return <FileText className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "high":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredContent = contentData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAction = (action: string, contentId: number) => {
    const content = contentData.find((item) => item.id === contentId)
    switch (action) {
      case "view":
        toast({ title: "Opening content", description: `Viewing "${content?.title}"` })
        break
      case "edit":
        toast({ title: "Edit mode", description: `Editing "${content?.title}"` })
        break
      case "copy":
        toast({ title: "Copied", description: "Content copied to clipboard" })
        break
      case "delete":
        toast({ title: "Deleted", description: "Content moved to trash", variant: "destructive" })
        break
      case "share":
        toast({ title: "Share link", description: "Share link copied to clipboard" })
        break
      case "download":
        toast({ title: "Download", description: "Content downloaded successfully" })
        break
    }
  }

  const stats = {
    total: contentData.length,
    published: contentData.filter((item) => item.status === "published").length,
    scheduled: contentData.filter((item) => item.status === "scheduled").length,
    drafts: contentData.filter((item) => item.status === "draft").length,
    totalViews: contentData.reduce((sum, item) => sum + item.views, 0),
    avgEngagement: Math.round(
      contentData.filter((item) => item.status === "published").reduce((sum, item) => sum + item.engagement, 0) /
        contentData.filter((item) => item.status === "published").length,
    ),
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Content</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage and track all your created content across platforms.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Content</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
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
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">{stats.avgEngagement}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Content</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Platform</th>
                      <th className="p-4 font-medium">Performance</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <div className="flex gap-1 mt-1">
                              {item.keywords.slice(0, 2).map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <span className="capitalize">{item.type}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </td>
                        <td className="p-4">{item.platform}</td>
                        <td className="p-4">
                          {item.status === "published" ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Eye className="h-3 w-3" />
                                <span className="text-sm">{item.views.toLocaleString()}</span>
                              </div>
                              <div className={`text-sm ${getPerformanceColor(item.performance)}`}>
                                {item.engagement}% engagement
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                            {item.publishedAt && (
                              <div className="text-xs text-gray-500">
                                Published: {new Date(item.publishedAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAction("view", item.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("edit", item.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("copy", item.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction("share", item.id)}>
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("download", item.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleAction("delete", item.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Published Content</h3>
                <p className="text-gray-500">
                  {contentData.filter((item) => item.status === "published").length} published pieces
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Scheduled Content</h3>
                <p className="text-gray-500">
                  {contentData.filter((item) => item.status === "scheduled").length} scheduled pieces
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Draft Content</h3>
                <p className="text-gray-500">{contentData.filter((item) => item.status === "draft").length} drafts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
