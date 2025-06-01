"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Twitter,
  Instagram,
  FileText,
  Youtube,
  Mail,
  Linkedin,
  Sparkles,
  Save,
  Copy,
  RefreshCw,
  Settings,
  User,
  Target,
  Brain,
  AlertCircle,
  CheckCircle,
  Share,
} from "lucide-react"
import { generateContent } from "@/lib/ai-actions"
import { saveContent } from "@/lib/content-storage"
import { toast } from "@/hooks/use-toast"

// Import platform templates
import { TwitterTemplate } from "@/components/content-templates/twitter-template"
import { InstagramTemplate } from "@/components/content-templates/instagram-template"
import { BlogTemplate } from "@/components/content-templates/blog-template"
import { YouTubeTemplate } from "@/components/content-templates/youtube-template"
import { EmailTemplate } from "@/components/content-templates/email-template"
import { LinkedInTemplate } from "@/components/content-templates/linkedin-template"

export default function CreatePage() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedContentId, setSavedContentId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    keyword: "",
    goal: "",
    audience: "",
    tone: "professional",
    creativity: [50],
    contentType: "",
    additionalContext: "",
  })
  const [generatedContent, setGeneratedContent] = useState<any>(null)

  const handleGenerate = async () => {
    if (!formData.keyword || !formData.goal || !formData.contentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in keyword, goal, and select a content type.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setGeneratedContent(null)
    setError(null)
    setSavedContentId(null)

    try {
      console.log("🚀 Starting generation with:", formData)
      const result = await generateContent(formData)
      console.log("✅ Generation successful:", result)

      setGeneratedContent(result)
      toast({
        title: "Content Generated! 🎉",
        description: `Your ${formData.contentType} content is ready using Llama 3.3 70B.`,
      })
    } catch (error) {
      console.error("❌ Generation failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setError(errorMessage)

      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveToVault = async () => {
    if (!generatedContent) return

    setSaving(true)
    try {
      const savedContent = await saveContent({
        title: generatedContent.title || `${formData.contentType} about ${formData.keyword}`,
        content: generatedContent,
        platform: formData.contentType,
        keyword: formData.keyword,
        goal: formData.goal,
        audience: formData.audience,
        tone: formData.tone,
        status: "draft",
      })

      setSavedContentId(savedContent.id)
      toast({
        title: "Saved to Vault! 💾",
        description: "Content has been saved to your vault for future access.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your content.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCopyContent = () => {
    if (generatedContent) {
      const textContent = JSON.stringify(generatedContent, null, 2)
      navigator.clipboard.writeText(textContent)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    }
  }

  const renderPlatformContent = () => {
    if (!generatedContent) return null

    // Add error boundary for template rendering
    try {
      switch (generatedContent.platform) {
        case "twitter":
          return <TwitterTemplate content={generatedContent} />
        case "instagram":
          return <InstagramTemplate content={generatedContent} />
        case "blog":
          return <BlogTemplate content={generatedContent} />
        case "youtube":
          return <YouTubeTemplate content={generatedContent} />
        case "email":
          return <EmailTemplate content={generatedContent} />
        case "linkedin":
          return <LinkedInTemplate content={generatedContent} />
        default:
          return (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Generated Content</h3>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(generatedContent, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )
      }
    } catch (error) {
      console.error("Error rendering template:", error)
      return (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-red-600">Content Generated (Fallback View)</h3>
              <p className="text-sm text-gray-600">
                There was an issue displaying the template. Here's the raw content:
              </p>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
                {JSON.stringify(generatedContent, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )
    }
  }

  const contentTypes = [
    {
      id: "twitter",
      name: "Twitter Thread",
      icon: <Twitter className="h-6 w-6" />,
      description: "Hook + body + CTA with viral structure",
      color: "bg-blue-500",
    },
    {
      id: "instagram",
      name: "Instagram Caption",
      icon: <Instagram className="h-6 w-6" />,
      description: "Hashtag-optimized, tone-matched",
      color: "bg-pink-500",
    },
    {
      id: "blog",
      name: "Blog Post",
      icon: <FileText className="h-6 w-6" />,
      description: "SEO-friendly, brand-tone matched",
      color: "bg-green-500",
    },
    {
      id: "youtube",
      name: "YouTube Script",
      icon: <Youtube className="h-6 w-6" />,
      description: "Hook + intro + segments + outro",
      color: "bg-red-500",
    },
    {
      id: "email",
      name: "Email Campaign",
      icon: <Mail className="h-6 w-6" />,
      description: "Subject line, body, personalization",
      color: "bg-purple-500",
    },
    {
      id: "linkedin",
      name: "LinkedIn Post",
      icon: <Linkedin className="h-6 w-6" />,
      description: "Professional tone with storytelling",
      color: "bg-blue-600",
    },
  ]

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "funny", label: "Funny" },
    { value: "inspirational", label: "Inspirational" },
    { value: "sarcastic", label: "Sarcastic" },
    { value: "educational", label: "Educational" },
  ]

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Create Content with AI
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Generate platform-specific content using Llama 3.3 70B Instruct Turbo with realistic templates.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Generation Error</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Check the browser console for more details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Display */}
      {savedContentId && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 dark:text-green-200">Content Saved Successfully!</h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your content has been saved to your vault and is ready for publishing.
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/vault">View in Vault</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Content Brief
              </CardTitle>
              <CardDescription>
                Tell us what you want to create and we'll generate platform-specific content for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword or Topic *</Label>
                  <Input
                    id="keyword"
                    placeholder="e.g., productivity, AI, marketing"
                    value={formData.keyword}
                    onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal or Objective *</Label>
                  <Input
                    id="goal"
                    placeholder="e.g., increase engagement, educate audience"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., entrepreneurs, students, professionals"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Additional Context</Label>
                <Textarea
                  id="context"
                  placeholder="Any specific requirements, style preferences, or additional information..."
                  value={formData.additionalContext}
                  onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Platform & Content Type
              </CardTitle>
              <CardDescription>Choose the platform and content type you want to generate.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {contentTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.contentType === type.id
                        ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setFormData({ ...formData, contentType: type.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${type.color} text-white`}>{type.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{type.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tone & Style</Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Creativity Level: {formData.creativity[0]}%</Label>
                <Slider
                  value={formData.creativity}
                  onValueChange={(value) => setFormData({ ...formData, creativity: value })}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Safe</span>
                  <span>Balanced</span>
                  <span>Wild</span>
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleGenerate}
                disabled={loading || !formData.keyword || !formData.goal || !formData.contentType}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                size="lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating with Llama 3.3...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate with Llama 3.3
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Model Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Model Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Model</span>
                  <Badge variant="secondary">Llama 3.3 70B</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Provider</span>
                  <Badge variant="outline">Together AI</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant={error ? "destructive" : "default"}>
                    {error ? "Error" : loading ? "Generating..." : "Ready"}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Using Meta's Llama 3.3 70B Instruct Turbo with enhanced error handling and fallback content.
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Content Created</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">AI Credits Left</span>
                <Badge variant="outline">850</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Saved Ideas</span>
                <Badge variant="secondary">24</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Generated {contentTypes.find((t) => t.id === formData.contentType)?.name}
                    <Badge variant="secondary" className="ml-2">
                      {generatedContent.model || "Llama 3.3 70B"}
                    </Badge>
                    {savedContentId && (
                      <Badge variant="default" className="ml-2 bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Saved
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Platform-optimized content for "{formData.keyword}" targeting{" "}
                    {formData.audience || "general audience"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyContent}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveToVault} disabled={saving || !!savedContentId}>
                    {saving ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : savedContentId ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {savedContentId ? "Saved" : "Save to Vault"}
                  </Button>
                  {savedContentId && (
                    <Button variant="default" size="sm" asChild>
                      <a href="/dashboard/accounts">
                        <Share className="h-4 w-4 mr-2" />
                        Publish
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Platform-specific content display */}
          <div className="space-y-6">{renderPlatformContent()}</div>
        </div>
      )}
    </div>
  )
}
