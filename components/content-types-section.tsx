import { Twitter, Instagram, FileText, Youtube, Mail, Linkedin, Video, Megaphone, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContentTypesSection() {
  const contentTypes = [
    {
      icon: <Twitter className="h-6 w-6" />,
      title: "Twitter Threads",
      description: "Hook + body + CTA with viral structure",
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      title: "Instagram Captions",
      description: "Hashtag-optimized, tone-matched",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Carousels",
      description: "Slide-by-slide breakdown with visuals",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Blog Posts",
      description: "SEO-friendly, brand-tone matched",
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      title: "YouTube Scripts",
      description: "Hook + intro + segments + outro",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Campaigns",
      description: "Subject line, body, personalization tokens",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn Posts",
      description: "Professional tone with storytelling",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Reel/Short Ideas",
      description: "Script + scene suggestions + audio cues",
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: "Ad Copy",
      description: "Variants for headlines, taglines, body",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "TikTok Scripts",
      description: "Gen Z tone, trend-aligned hooks",
    },
  ]

  return (
    <section id="content-types" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm dark:bg-blue-900">Content Types</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Supported Content Types</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Create any type of content with our AI-powered platform, all creation-ready.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {contentTypes.map((type, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-50">
                    {type.icon}
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription>{type.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
