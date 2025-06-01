import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, FileText, MessageSquare, PlusCircle, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome to IdeaForge X. Start creating content with AI.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Types</CardTitle>
            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Blog, Twitter, Instagram, LinkedIn</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saved Ideas</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+8 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
            <Zap className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">850/1000 remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Content Analytics</CardTitle>
            <CardDescription>Your content creation activity over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full">
              <div className="flex h-full items-end gap-2">
                {[40, 25, 45, 55, 70, 60, 50, 65, 75, 80, 65, 70].map((height, i) => (
                  <div key={i} className="relative flex w-full flex-col items-center">
                    <div
                      className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-md w-full"
                      style={{ height: `${height}%` }}
                    />
                    <span className="mt-1 text-xs text-gray-500">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>Your recently created content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "10 Ways to Boost Productivity",
                  type: "Blog Post",
                  date: "2 days ago",
                },
                {
                  title: "The Future of AI in Marketing",
                  type: "Twitter Thread",
                  date: "3 days ago",
                },
                {
                  title: "How to Build a Personal Brand",
                  type: "LinkedIn Post",
                  date: "5 days ago",
                },
                {
                  title: "Social Media Strategy for 2025",
                  type: "Instagram Carousel",
                  date: "1 week ago",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/dashboard/create">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <PlusCircle className="h-4 w-4" />
                  Create New Content
                </Button>
              </Link>
              <Link href="/dashboard/vault">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <FileText className="h-4 w-4" />
                  View Saved Ideas
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <BarChart className="h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
            <CardDescription>Upcoming scheduled content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Email Newsletter",
                  date: "Tomorrow, 9:00 AM",
                },
                {
                  title: "Instagram Post",
                  date: "Jun 3, 12:00 PM",
                },
                {
                  title: "YouTube Video",
                  date: "Jun 5, 3:00 PM",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
