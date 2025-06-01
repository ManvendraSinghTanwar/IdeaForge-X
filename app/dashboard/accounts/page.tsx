"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Plus,
  RefreshCw,
  Settings,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Zap,
  Clock,
  Share,
} from "lucide-react"
import {
  getSocialAccounts,
  connectSocialAccount,
  disconnectSocialAccount,
  syncSocialAccount,
  updateAccountSettings,
  getSavedContent,
  publishContent,
  scheduleContent,
} from "@/lib/content-storage"
import { toast } from "@/hooks/use-toast"

interface SocialAccount {
  id: string
  platform: string
  username: string
  displayName: string
  profileImage: string
  isConnected: boolean
  connectedAt: string
  lastSync: string
  followers: number
  following: number
  posts: number
  accessToken?: string
  refreshToken?: string
  settings: {
    autoPost: boolean
    optimalTiming: boolean
    crossPost: boolean
  }
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [savedContent, setSavedContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState<string | null>(null)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [publishing, setPublishing] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<string>("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scheduleDate, setScheduleDate] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [socialAccounts, content] = await Promise.all([getSocialAccounts(), getSavedContent()])
      setAccounts(socialAccounts)
      setSavedContent(content.filter((c) => c.status === "draft"))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (platform: string) => {
    setConnecting(platform)
    try {
      // Mock OAuth flow - in real app would redirect to OAuth provider
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate OAuth flow

      const mockCredentials = {
        username: `@yourbrand`,
        displayName: "Your Brand",
        followers: Math.floor(Math.random() * 10000) + 1000,
        following: Math.floor(Math.random() * 1000) + 100,
        posts: Math.floor(Math.random() * 500) + 50,
        accessToken: `mock-${platform}-token-${Date.now()}`,
      }

      const connectedAccount = await connectSocialAccount(platform, mockCredentials)

      setAccounts((prev) => {
        const existingIndex = prev.findIndex((acc) => acc.platform === platform)
        if (existingIndex !== -1) {
          const updated = [...prev]
          updated[existingIndex] = connectedAccount
          return updated
        } else {
          return [...prev, connectedAccount]
        }
      })

      toast({
        title: "Connected Successfully! 🎉",
        description: `Your ${platform} account has been connected and is ready for publishing.`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Failed to connect ${platform} account. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setConnecting(null)
    }
  }

  const handleDisconnect = async (platform: string) => {
    try {
      await disconnectSocialAccount(platform)
      setAccounts((prev) =>
        prev.map((acc) => (acc.platform === platform ? { ...acc, isConnected: false, accessToken: undefined } : acc)),
      )

      toast({
        title: "Disconnected",
        description: `Your ${platform} account has been disconnected.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to disconnect ${platform} account.`,
        variant: "destructive",
      })
    }
  }

  const handleSync = async (platform: string) => {
    setSyncing(platform)
    try {
      const syncedAccount = await syncSocialAccount(platform)
      if (syncedAccount) {
        setAccounts((prev) => prev.map((acc) => (acc.platform === platform ? syncedAccount : acc)))

        toast({
          title: "Synced Successfully",
          description: `${platform} account data has been updated with latest metrics.`,
        })
      }
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: `Failed to sync ${platform} account.`,
        variant: "destructive",
      })
    } finally {
      setSyncing(null)
    }
  }

  const handleSettingsUpdate = async (platform: string, setting: string, value: boolean) => {
    try {
      await updateAccountSettings(platform, { [setting]: value })
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.platform === platform ? { ...acc, settings: { ...acc.settings, [setting]: value } } : acc,
        ),
      )

      toast({
        title: "Settings Updated",
        description: `${platform} settings have been saved.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      })
    }
  }

  const handlePublish = async () => {
    if (!selectedContent || selectedPlatforms.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select content and at least one platform.",
        variant: "destructive",
      })
      return
    }

    setPublishing(selectedContent)
    try {
      if (scheduleDate) {
        await scheduleContent(selectedContent, scheduleDate, selectedPlatforms)
        toast({
          title: "Content Scheduled! 📅",
          description: `Content will be published on ${new Date(scheduleDate).toLocaleDateString()}.`,
        })
      } else {
        await publishContent(selectedContent, selectedPlatforms)
        toast({
          title: "Content Published! 🚀",
          description: `Content has been published to ${selectedPlatforms.join(", ")}.`,
        })
      }

      // Refresh content list
      const updatedContent = await getSavedContent()
      setSavedContent(updatedContent.filter((c) => c.status === "draft"))
      setSelectedContent("")
      setSelectedPlatforms([])
      setScheduleDate("")
    } catch (error) {
      toast({
        title: "Publishing Failed",
        description: "Failed to publish content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPublishing(null)
    }
  }

  const platformConfig = {
    twitter: {
      name: "Twitter",
      icon: <Twitter className="h-6 w-6" />,
      color: "bg-blue-500",
      description: "Share threads and engage with your audience",
    },
    instagram: {
      name: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      color: "bg-pink-500",
      description: "Post visual content and stories",
    },
    linkedin: {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      color: "bg-blue-600",
      description: "Professional networking and content",
    },
    youtube: {
      name: "YouTube",
      icon: <Youtube className="h-6 w-6" />,
      color: "bg-red-500",
      description: "Upload videos and manage your channel",
    },
    facebook: {
      name: "Facebook",
      icon: <Facebook className="h-6 w-6" />,
      color: "bg-blue-700",
      description: "Share posts and manage your page",
    },
  }

  const availablePlatforms = Object.keys(platformConfig).filter(
    (platform) => !accounts.some((acc) => acc.platform === platform),
  )

  const connectedAccounts = accounts.filter((acc) => acc.isConnected)
  const totalFollowers = connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0)
  const totalPosts = connectedAccounts.reduce((sum, acc) => sum + acc.posts, 0)

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Social Media Accounts</h1>
          <p className="text-gray-500 dark:text-gray-400">Loading your connected accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Social Media Accounts</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Connect and manage your social media accounts for seamless content publishing and analytics.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Connected Accounts</p>
                <p className="text-2xl font-bold">{connectedAccounts.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Followers</p>
                <p className="text-2xl font-bold">{totalFollowers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                <p className="text-2xl font-bold">{totalPosts.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Draft Content</p>
                <p className="text-2xl font-bold">{savedContent.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="publish">Publish Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Connected Accounts
              </CardTitle>
              <CardDescription>Manage your connected social media accounts and sync data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {connectedAccounts.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Connected Accounts</h3>
                  <p className="text-gray-500 mb-4">Connect your social media accounts to start publishing content.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {accounts
                    .filter((acc) => acc.isConnected)
                    .map((account) => {
                      const config = platformConfig[account.platform as keyof typeof platformConfig]
                      return (
                        <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${config.color} text-white`}>{config.icon}</div>
                            <div>
                              <h3 className="font-semibold">{config.name}</h3>
                              <p className="text-sm text-gray-500">{account.username}</p>
                              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                <span>{account.followers.toLocaleString()} followers</span>
                                <span>{account.posts} posts</span>
                                <span>Last sync: {new Date(account.lastSync).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSync(account.platform)}
                              disabled={syncing === account.platform}
                            >
                              {syncing === account.platform ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDisconnect(account.platform)}>
                              Disconnect
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Platforms */}
          {availablePlatforms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Connect New Account
                </CardTitle>
                <CardDescription>Add more social media accounts to expand your reach.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {availablePlatforms.map((platform) => {
                    const config = platformConfig[platform as keyof typeof platformConfig]
                    return (
                      <Card key={platform} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${config.color} text-white`}>{config.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium">{config.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{config.description}</p>
                              <Button
                                className="w-full mt-3"
                                onClick={() => handleConnect(platform)}
                                disabled={connecting === platform}
                              >
                                {connecting === platform ? (
                                  <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Connecting...
                                  </>
                                ) : (
                                  <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Connect
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="publish" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="h-5 w-5" />
                Publish Content
              </CardTitle>
              <CardDescription>Select content from your vault and publish to connected platforms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {savedContent.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Draft Content</h3>
                  <p className="text-gray-500 mb-4">Create some content first to publish it to your social accounts.</p>
                  <Button asChild>
                    <a href="/dashboard/create">Create Content</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Content to Publish</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={selectedContent}
                      onChange={(e) => setSelectedContent(e.target.value)}
                    >
                      <option value="">Choose content...</option>
                      {savedContent.map((content) => (
                        <option key={content.id} value={content.id}>
                          {content.title} ({content.platform})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Platforms</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {connectedAccounts.map((account) => {
                        const config = platformConfig[account.platform as keyof typeof platformConfig]
                        const isSelected = selectedPlatforms.includes(account.platform)
                        return (
                          <div
                            key={account.platform}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              isSelected
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedPlatforms((prev) => prev.filter((p) => p !== account.platform))
                              } else {
                                setSelectedPlatforms((prev) => [...prev, account.platform])
                              }
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded ${config.color} text-white`}>{config.icon}</div>
                              <span className="font-medium">{config.name}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Schedule (Optional)</Label>
                    <Input
                      type="datetime-local"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>

                  <Button
                    onClick={handlePublish}
                    disabled={!selectedContent || selectedPlatforms.length === 0 || publishing === selectedContent}
                    className="w-full"
                  >
                    {publishing === selectedContent ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : scheduleDate ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule Content
                      </>
                    ) : (
                      <>
                        <Share className="h-4 w-4 mr-2" />
                        Publish Now
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Publishing Settings
              </CardTitle>
              <CardDescription>Configure how content is published to your accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {connectedAccounts.map((account) => {
                const config = platformConfig[account.platform as keyof typeof platformConfig]
                return (
                  <div key={account.platform} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${config.color} text-white`}>{config.icon}</div>
                      <div>
                        <h3 className="font-semibold">{config.name}</h3>
                        <p className="text-sm text-gray-500">{account.username}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Auto-publish new content</label>
                          <p className="text-sm text-gray-500">Automatically publish new content to this platform</p>
                        </div>
                        <Switch
                          checked={account.settings.autoPost}
                          onCheckedChange={(checked) => handleSettingsUpdate(account.platform, "autoPost", checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Optimal timing</label>
                          <p className="text-sm text-gray-500">Use AI to determine the best posting times</p>
                        </div>
                        <Switch
                          checked={account.settings.optimalTiming}
                          onCheckedChange={(checked) =>
                            handleSettingsUpdate(account.platform, "optimalTiming", checked)
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Cross-post optimization</label>
                          <p className="text-sm text-gray-500">Automatically optimize content for this platform</p>
                        </div>
                        <Switch
                          checked={account.settings.crossPost}
                          onCheckedChange={(checked) => handleSettingsUpdate(account.platform, "crossPost", checked)}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your content and accounts efficiently.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/dashboard/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Content
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/dashboard/vault">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Vault
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/dashboard/analytics">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    connectedAccounts.forEach((acc) => handleSync(acc.platform))
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
