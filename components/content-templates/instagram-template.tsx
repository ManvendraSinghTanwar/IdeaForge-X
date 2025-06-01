import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"

interface InstagramTemplateProps {
  content: {
    caption: string
    hashtags: string[]
    cta: string
    imagePrompt?: string
  }
}

export function InstagramTemplate({ content }: InstagramTemplateProps) {
  return (
    <Card className="max-w-md mx-auto border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <div>
              <span className="font-semibold text-sm">yourbrand</span>
              <div className="text-xs text-gray-500">Your Location</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📸</div>
          {content.imagePrompt ? (
            <p className="text-xs text-gray-600 dark:text-gray-400">Image: {content.imagePrompt}</p>
          ) : (
            <p className="text-xs text-gray-600 dark:text-gray-400">Your visual content here</p>
          )}
        </div>
      </div>

      <CardContent className="p-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Heart className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <MessageCircle className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Send className="w-6 h-6" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Bookmark className="w-6 h-6" />
            </Button>
          </div>

          <div className="text-sm font-semibold">1,234 likes</div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-semibold">yourbrand</span>{" "}
              <span className="whitespace-pre-line">
                {content.caption || "Your Instagram caption will be generated here..."}
              </span>
            </div>

            {content.cta && (
              <div className="text-sm">
                <span className="font-semibold">yourbrand</span> <span>{content.cta}</span>
              </div>
            )}

            {content.hashtags && content.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {content.hashtags.map((tag, index) => (
                  <span key={index} className="text-sm text-blue-600 dark:text-blue-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 uppercase tracking-wide">2 hours ago</div>
        </div>
      </CardContent>
    </Card>
  )
}
