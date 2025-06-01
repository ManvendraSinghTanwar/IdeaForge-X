"use server"

// Enhanced content storage system with proper functionality

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
    reach: number
  }
  publishedTo?: {
    platform: string
    postId: string
    publishedAt: string
    url?: string
    performance?: {
      views: number
      likes: number
      comments: number
      shares: number
    }
  }[]
  tags?: string[]
  scheduledFor?: string
}

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

interface AnalyticsData {
  totalContent: number
  totalViews: number
  totalEngagement: number
  avgEngagementRate: number
  topPerforming: SavedContent[]
  platformBreakdown: Record<string, number>
  timeSeriesData: Array<{
    date: string
    views: number
    engagement: number
    posts: number
  }>
  growthMetrics: {
    viewsGrowth: number
    engagementGrowth: number
    followersGrowth: number
  }
}

// Mock storage with more realistic data
const contentStorage: SavedContent[] = [
  {
    id: "1",
    title: "10 Productivity Tips for Remote Workers",
    content: {
      title: "10 Productivity Tips for Remote Workers",
      introduction:
        "Working from home can be challenging, but with the right strategies, you can boost your productivity and maintain work-life balance.",
      sections: [
        {
          heading: "Set Up a Dedicated Workspace",
          content:
            "Having a specific area for work helps create mental boundaries between work and personal life. Choose a quiet corner, invest in good lighting, and keep it organized.",
        },
        {
          heading: "Establish a Routine",
          content:
            "Consistency is key to productivity. Wake up at the same time, get dressed as if you're going to the office, and stick to regular work hours.",
        },
        {
          heading: "Take Regular Breaks",
          content:
            "Don't forget to step away from your desk. Use the Pomodoro Technique: work for 25 minutes, then take a 5-minute break.",
        },
      ],
      conclusion:
        "Implementing these tips will boost your productivity and help you thrive in a remote work environment.",
      tags: ["productivity", "remote work", "tips"],
    },
    platform: "blog",
    keyword: "productivity",
    goal: "help remote workers be more productive",
    audience: "remote workers",
    tone: "professional",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    status: "published",
    analytics: {
      views: 3200,
      likes: 245,
      comments: 89,
      shares: 67,
      engagementRate: 12.5,
      clickThroughRate: 3.2,
      impressions: 8500,
      reach: 7200,
    },
    publishedTo: [
      {
        platform: "blog",
        postId: "blog-001",
        publishedAt: "2024-06-01T12:00:00Z",
        url: "https://yourblog.com/productivity-tips",
        performance: { views: 3200, likes: 245, comments: 89, shares: 67 },
      },
    ],
    tags: ["productivity", "remote work", "work from home"],
  },
  {
    id: "2",
    title: "The Future of AI in Marketing",
    content: {
      hook: "🧵 The AI revolution in marketing is here. Here's what you need to know:",
      thread: [
        "AI is transforming how we understand customers through advanced data analysis",
        "Personalization at scale is now possible with machine learning algorithms",
        "Predictive analytics helps forecast trends and customer behavior",
        "Automation frees up time for strategic thinking and creative work",
        "But remember: AI enhances human creativity, it doesn't replace it",
      ],
      hashtags: ["#AI", "#Marketing", "#Future", "#Technology", "#Innovation"],
      cta: "What's your experience with AI in marketing? Share your thoughts below! 👇",
    },
    platform: "twitter",
    keyword: "AI marketing",
    goal: "educate about AI in marketing",
    audience: "marketers",
    tone: "professional",
    createdAt: "2024-05-30T14:00:00Z",
    updatedAt: "2024-05-30T14:00:00Z",
    status: "published",
    analytics: {
      views: 1890,
      likes: 156,
      comments: 34,
      shares: 78,
      engagementRate: 14.2,
      clickThroughRate: 2.8,
      impressions: 4200,
      reach: 3800,
    },
    publishedTo: [
      {
        platform: "twitter",
        postId: "tweet-123456",
        publishedAt: "2024-05-30T15:00:00Z",
        url: "https://twitter.com/yourbrand/status/123456",
        performance: { views: 1890, likes: 156, comments: 34, shares: 78 },
      },
    ],
    tags: ["AI", "marketing", "technology"],
  },
  {
    id: "3",
    title: "Building Your Personal Brand on LinkedIn",
    content: {
      hook: "Your personal brand is your most valuable career asset. Here's how to build it:",
      story:
        "I used to think personal branding was just for influencers. I was wrong.\n\nAfter 5 years of building my presence on LinkedIn, I've learned that authentic personal branding opens doors you never knew existed.\n\nHere's what I wish I knew when I started:",
      insights:
        "• Be consistent with your message and values\n• Share your expertise generously\n• Engage authentically with others' content\n• Tell your story, including failures and lessons learned\n• Focus on providing value, not just promoting yourself",
      cta: "What's one piece of advice you'd give to someone starting their personal branding journey?",
      hashtags: ["#PersonalBranding", "#LinkedIn", "#CareerGrowth", "#Professional", "#Networking"],
    },
    platform: "linkedin",
    keyword: "personal branding",
    goal: "help professionals build their brand",
    audience: "professionals",
    tone: "inspirational",
    createdAt: "2024-05-28T16:00:00Z",
    updatedAt: "2024-05-28T16:00:00Z",
    status: "published",
    analytics: {
      views: 2100,
      likes: 189,
      comments: 45,
      shares: 23,
      engagementRate: 12.2,
      clickThroughRate: 1.9,
      impressions: 5600,
      reach: 4800,
    },
    publishedTo: [
      {
        platform: "linkedin",
        postId: "linkedin-789",
        publishedAt: "2024-05-28T17:00:00Z",
        url: "https://linkedin.com/posts/yourbrand-789",
        performance: { views: 2100, likes: 189, comments: 45, shares: 23 },
      },
    ],
    tags: ["personal branding", "career", "networking"],
  },
  {
    id: "4",
    title: "Social Media Strategy for 2025",
    content: {
      caption:
        "✨ Ready to dominate social media in 2025? Here's your complete strategy guide ✨\n\n🎯 Focus on authentic storytelling over perfect posts\n📱 Embrace short-form video content\n🤝 Build genuine community, not just followers\n📊 Use data to guide your content decisions\n🔄 Repurpose content across platforms strategically\n\nThe social media landscape is evolving fast. Those who adapt and stay authentic will thrive.\n\nDouble tap if you're ready to level up your social media game! 💪",
      hashtags: [
        "#SocialMediaStrategy",
        "#2025Trends",
        "#ContentCreator",
        "#DigitalMarketing",
        "#SocialMedia",
        "#Strategy",
        "#Growth",
        "#Engagement",
        "#Community",
        "#Authentic",
      ],
      cta: "Save this post for your 2025 planning! What's your biggest social media goal for next year?",
      imagePrompt: "A modern, colorful infographic showing social media strategy elements with icons and charts",
    },
    platform: "instagram",
    keyword: "social media strategy",
    goal: "help creators plan for 2025",
    audience: "content creators",
    tone: "inspirational",
    createdAt: "2024-05-25T12:00:00Z",
    updatedAt: "2024-05-25T12:00:00Z",
    status: "published",
    analytics: {
      views: 2800,
      likes: 234,
      comments: 67,
      shares: 45,
      engagementRate: 12.4,
      clickThroughRate: 2.1,
      impressions: 6200,
      reach: 5400,
    },
    publishedTo: [
      {
        platform: "instagram",
        postId: "instagram-456",
        publishedAt: "2024-05-25T13:00:00Z",
        url: "https://instagram.com/p/456",
        performance: { views: 2800, likes: 234, comments: 67, shares: 45 },
      },
    ],
    tags: ["social media", "strategy", "2025"],
  },
]

const socialAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "twitter",
    username: "@yourbrand",
    displayName: "Your Brand",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=twitter",
    isConnected: true,
    connectedAt: "2024-05-01T10:00:00Z",
    lastSync: "2024-06-01T08:00:00Z",
    followers: 12500,
    following: 890,
    posts: 1250,
    accessToken: "mock-twitter-token",
    settings: {
      autoPost: true,
      optimalTiming: true,
      crossPost: false,
    },
  },
  {
    id: "2",
    platform: "instagram",
    username: "@yourbrand",
    displayName: "Your Brand",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=instagram",
    isConnected: true,
    connectedAt: "2024-05-01T10:00:00Z",
    lastSync: "2024-06-01T08:00:00Z",
    followers: 8900,
    following: 450,
    posts: 320,
    accessToken: "mock-instagram-token",
    settings: {
      autoPost: false,
      optimalTiming: true,
      crossPost: true,
    },
  },
  {
    id: "3",
    platform: "linkedin",
    username: "your-name",
    displayName: "Your Name",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=linkedin",
    isConnected: false,
    connectedAt: "",
    lastSync: "",
    followers: 0,
    following: 0,
    posts: 0,
    settings: {
      autoPost: false,
      optimalTiming: false,
      crossPost: false,
    },
  },
]

// Generate time series data for charts
const generateTimeSeriesData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 500) + 200,
      engagement: Math.floor(Math.random() * 50) + 20,
      posts: Math.floor(Math.random() * 3) + 1,
    })
  }

  return data
}

export async function saveContent(
  content: Omit<SavedContent, "id" | "createdAt" | "updatedAt" | "analytics">,
): Promise<SavedContent> {
  const newContent: SavedContent = {
    ...content,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    analytics: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      engagementRate: 0,
      clickThroughRate: 0,
      impressions: 0,
      reach: 0,
    },
  }

  contentStorage.push(newContent)
  console.log("Content saved:", newContent.title)
  return newContent
}

export async function getSavedContent(): Promise<SavedContent[]> {
  return contentStorage.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getContentById(id: string): Promise<SavedContent | null> {
  return contentStorage.find((content) => content.id === id) || null
}

export async function updateContent(id: string, updates: Partial<SavedContent>): Promise<SavedContent | null> {
  const index = contentStorage.findIndex((content) => content.id === id)
  if (index === -1) return null

  contentStorage[index] = {
    ...contentStorage[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  console.log("Content updated:", contentStorage[index].title)
  return contentStorage[index]
}

export async function deleteContent(id: string): Promise<boolean> {
  const index = contentStorage.findIndex((content) => content.id === id)
  if (index === -1) return false

  const deleted = contentStorage.splice(index, 1)[0]
  console.log("Content deleted:", deleted.title)
  return true
}

export async function getSocialAccounts(): Promise<SocialAccount[]> {
  return socialAccounts
}

export async function connectSocialAccount(platform: string, credentials: any): Promise<SocialAccount> {
  const existingIndex = socialAccounts.findIndex((account) => account.platform === platform)

  const connectedAccount: SocialAccount = {
    id: existingIndex !== -1 ? socialAccounts[existingIndex].id : Date.now().toString(),
    platform,
    username: credentials.username || `@yourbrand`,
    displayName: credentials.displayName || "Your Brand",
    profileImage: credentials.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform}`,
    isConnected: true,
    connectedAt: new Date().toISOString(),
    lastSync: new Date().toISOString(),
    followers: credentials.followers || Math.floor(Math.random() * 10000) + 1000,
    following: credentials.following || Math.floor(Math.random() * 1000) + 100,
    posts: credentials.posts || Math.floor(Math.random() * 500) + 50,
    accessToken: credentials.accessToken || `mock-${platform}-token-${Date.now()}`,
    refreshToken: credentials.refreshToken,
    settings: {
      autoPost: false,
      optimalTiming: true,
      crossPost: false,
    },
  }

  if (existingIndex !== -1) {
    socialAccounts[existingIndex] = connectedAccount
  } else {
    socialAccounts.push(connectedAccount)
  }

  console.log("Social account connected:", platform)
  return connectedAccount
}

export async function disconnectSocialAccount(platform: string): Promise<boolean> {
  const index = socialAccounts.findIndex((account) => account.platform === platform)
  if (index === -1) return false

  socialAccounts[index] = {
    ...socialAccounts[index],
    isConnected: false,
    accessToken: undefined,
    refreshToken: undefined,
  }

  console.log("Social account disconnected:", platform)
  return true
}

export async function updateAccountSettings(
  platform: string,
  settings: Partial<SocialAccount["settings"]>,
): Promise<boolean> {
  const index = socialAccounts.findIndex((account) => account.platform === platform)
  if (index === -1) return false

  socialAccounts[index].settings = {
    ...socialAccounts[index].settings,
    ...settings,
  }

  console.log("Account settings updated:", platform, settings)
  return true
}

export async function syncSocialAccount(platform: string): Promise<SocialAccount | null> {
  const account = socialAccounts.find((acc) => acc.platform === platform)
  if (!account || !account.isConnected) return null

  // Mock sync - in real app would call actual APIs
  account.lastSync = new Date().toISOString()
  account.followers += Math.floor(Math.random() * 10) // Mock growth
  account.posts += Math.floor(Math.random() * 2) // Mock new posts

  console.log("Social account synced:", platform)
  return account
}

export async function publishContent(contentId: string, platforms: string[]): Promise<boolean> {
  const content = await getContentById(contentId)
  if (!content) return false

  const publishedTo = platforms.map((platform) => ({
    platform,
    postId: `${platform}-${Date.now()}`,
    publishedAt: new Date().toISOString(),
    url: `https://${platform}.com/yourbrand/post/${Date.now()}`,
    performance: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
    },
  }))

  await updateContent(contentId, {
    status: "published",
    publishedTo: [...(content.publishedTo || []), ...publishedTo],
  })

  console.log("Content published to platforms:", platforms)
  return true
}

export async function scheduleContent(contentId: string, scheduledFor: string, platforms: string[]): Promise<boolean> {
  const content = await getContentById(contentId)
  if (!content) return false

  await updateContent(contentId, {
    status: "scheduled",
    scheduledFor,
  })

  console.log("Content scheduled for:", scheduledFor, "on platforms:", platforms)
  return true
}

export async function getContentAnalytics(timeRange = "30d"): Promise<AnalyticsData> {
  const now = new Date()
  const daysAgo = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
  const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

  const filteredContent = contentStorage.filter((content) => new Date(content.createdAt) >= startDate)

  const totalViews = filteredContent.reduce((sum, content) => sum + content.analytics.views, 0)
  const totalEngagement = filteredContent.reduce(
    (sum, content) => sum + content.analytics.likes + content.analytics.comments + content.analytics.shares,
    0,
  )
  const avgEngagementRate =
    filteredContent.length > 0
      ? filteredContent.reduce((sum, content) => sum + content.analytics.engagementRate, 0) / filteredContent.length
      : 0

  const timeSeriesData = generateTimeSeriesData(Number.parseInt(timeRange.replace("d", "")))

  return {
    totalContent: filteredContent.length,
    totalViews,
    totalEngagement,
    avgEngagementRate: Math.round(avgEngagementRate * 100) / 100,
    topPerforming: filteredContent.sort((a, b) => b.analytics.engagementRate - a.analytics.engagementRate).slice(0, 5),
    platformBreakdown: filteredContent.reduce(
      (acc, content) => {
        acc[content.platform] = (acc[content.platform] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
    timeSeriesData,
    growthMetrics: {
      viewsGrowth: 18.5,
      engagementGrowth: 12.3,
      followersGrowth: 8.7,
    },
  }
}
