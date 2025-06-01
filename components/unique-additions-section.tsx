import { Search, Sliders, User, Layout, Palette, MoveRightIcon as SwipeRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UniqueAdditionsSection() {
  const uniqueAdditions = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "AI + Market Intelligence Fusion",
      description: "Combines GPT with Google Trends, X (Twitter) trending hashtags, and competitor headline scraping",
    },
    {
      icon: <Sliders className="h-6 w-6" />,
      title: "Creativity Dial",
      description: "Set tone: Safe | Balanced | Wild and vibe: Funny | Professional | Inspirational | Sarcastic",
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Persona Builder",
      description: "Define your brand persona (input: tone, vibe, audience) for AI content that matches your voice",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Content Blueprint Templates",
      description: "Select templates for each content type (e.g., PAS, AIDA, Storytelling, Listicle, etc.)",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Moodboard + Visual AI",
      description: "Auto-generate thumbnail ideas, AI images, and slide visuals",
    },
    {
      icon: <SwipeRight className="h-6 w-6" />,
      title: "Interactive Swipe UI",
      description: "Swipe left/right on content ideas or hooks, save to 'My Vault' or tweak with AI prompt",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-900">
              Unique Additions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover the unique additions that make IdeaForge X stand out from other content creation tools.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {uniqueAdditions.map((addition, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-50">
                    {addition.icon}
                  </div>
                  <CardTitle className="text-lg">{addition.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription>{addition.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
