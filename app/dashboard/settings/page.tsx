"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Palette, Bell, Shield, CreditCard, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [persona, setPersona] = useState({
    brandName: "My Brand",
    industry: "technology",
    targetAudience: "entrepreneurs",
    brandVoice: "professional",
    brandValues: "innovation, authenticity, growth",
    brandDescription: "We help entrepreneurs build successful businesses through innovative solutions.",
  })

  const [preferences, setPreferences] = useState({
    defaultTone: "professional",
    defaultCreativity: 50,
    autoSave: true,
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  })

  const handleSavePersona = () => {
    toast({
      title: "Persona Saved",
      description: "Your brand persona has been updated successfully.",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Customize your IdeaForge X experience and brand persona.</p>
      </div>

      <Tabs defaultValue="persona" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="persona">Brand Persona</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="persona" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Brand Persona Builder
              </CardTitle>
              <CardDescription>
                Define your brand persona to ensure all AI-generated content matches your voice and style.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={persona.brandName}
                    onChange={(e) => setPersona({ ...persona, brandName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={persona.industry}
                    onValueChange={(value) => setPersona({ ...persona, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., entrepreneurs, students, professionals"
                    value={persona.targetAudience}
                    onChange={(e) => setPersona({ ...persona, targetAudience: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voice">Brand Voice</Label>
                  <Select
                    value={persona.brandVoice}
                    onValueChange={(value) => setPersona({ ...persona, brandVoice: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="values">Brand Values</Label>
                <Input
                  id="values"
                  placeholder="e.g., innovation, authenticity, growth"
                  value={persona.brandValues}
                  onChange={(e) => setPersona({ ...persona, brandValues: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Brand Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your brand, mission, and what makes you unique..."
                  value={persona.brandDescription}
                  onChange={(e) => setPersona({ ...persona, brandDescription: e.target.value })}
                  rows={4}
                />
              </div>

              <Button onClick={handleSavePersona} className="w-full md:w-auto">
                Save Brand Persona
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Content Preferences
              </CardTitle>
              <CardDescription>Set your default preferences for content generation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Tone</Label>
                  <Select
                    value={preferences.defaultTone}
                    onValueChange={(value) => setPreferences({ ...preferences, defaultTone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Creativity Level</Label>
                  <Select
                    value={preferences.defaultCreativity.toString()}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, defaultCreativity: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">Safe (30%)</SelectItem>
                      <SelectItem value="50">Balanced (50%)</SelectItem>
                      <SelectItem value="70">Creative (70%)</SelectItem>
                      <SelectItem value="90">Wild (90%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-save content</Label>
                      <p className="text-sm text-gray-500">Automatically save generated content to your vault</p>
                    </div>
                    <Switch
                      checked={preferences.autoSave}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, autoSave: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSavePreferences} className="w-full md:w-auto">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Manage how you receive updates and notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates about new features and tips</p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified about content generation completion</p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-gray-500">Weekly summary of your content creation activity</p>
                  </div>
                  <Switch
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Usage
              </CardTitle>
              <CardDescription>Manage your subscription and view usage statistics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">AI Credits</p>
                        <p className="text-2xl font-bold">850</p>
                        <p className="text-xs text-gray-500">of 1,000 remaining</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Plan</p>
                        <p className="text-2xl font-bold">Pro</p>
                        <p className="text-xs text-gray-500">$29/month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-2xl font-bold">Active</p>
                        <p className="text-xs text-gray-500">Renews Jun 15</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Manage Subscription</h3>
                <div className="flex gap-4">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">View Invoices</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
