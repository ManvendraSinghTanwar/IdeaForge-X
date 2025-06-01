import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from "lucide-react"

interface TwitterTemplateProps {
  content: {
    hook: string
    thread: string[]
    hashtags: string[]
    cta: string
  }
}

export function TwitterTemplate({ content }: TwitterTemplateProps) {
  const allTweets = [
    content.hook || "Your compelling hook tweet here...",
    ...(content.thread || ["Tweet content will be generated here..."]),
    content.cta || "Call to action tweet...",
  ]

  return (
    <div className="space-y-4">
      {allTweets.map((tweet, index) => (
        <Card key={index} className="max-w-xl mx-auto border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Your Brand</span>
                  <span className="text-blue-500">✓</span>
                  <span className="text-gray-500">@yourbrand</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500">now</span>
                </div>
                {index > 0 && (
                  <div className="text-sm text-gray-500">
                    Replying to <span className="text-blue-500">@yourbrand</span>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{tweet}</p>

              {index === 0 && <div className="text-sm text-gray-500">🧵 Thread {allTweets.length - 1}/n</div>}

              {index === allTweets.length - 1 && content.hashtags && content.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {content.hashtags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-blue-500 bg-blue-50 dark:bg-blue-950">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between max-w-md pt-2">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">12</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                  <Repeat2 className="w-4 h-4 mr-1" />
                  <span className="text-sm">34</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm">156</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
