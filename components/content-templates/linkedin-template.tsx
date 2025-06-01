import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal } from "lucide-react"

interface LinkedInTemplateProps {
  content: {
    hook: string
    story: string
    insights: string
    cta: string
    hashtags: string[]
  }
}

export function LinkedInTemplate({ content }: LinkedInTemplateProps) {
  return (
    <Card className="max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
            Y
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Your Name</span>
              <span className="text-blue-600">• 1st</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Your Professional Title | Helping companies grow
            </div>
            <div className="text-sm text-gray-500">2h • 🌐</div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="font-medium leading-relaxed">
            {content.hook || "Your compelling hook will be generated here..."}
          </p>

          <div className="whitespace-pre-line leading-relaxed">
            {content.story || "Your story content will be generated here..."}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border-l-4 border-blue-500">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Key Insights:</p>
            <div className="whitespace-pre-line text-blue-700 dark:text-blue-300">
              {content.insights || "Key insights will be generated here..."}
            </div>
          </div>

          <p className="font-medium">{content.cta || "Your call to action will be generated here..."}</p>

          {content.hashtags && content.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {content.hashtags.map((tag, index) => (
                <span key={index} className="text-blue-600 dark:text-blue-400 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ThumbsUp className="w-4 h-4" />
            <span>47 reactions</span>
            <span>•</span>
            <span>12 comments</span>
          </div>
        </div>

        <div className="flex items-center justify-around pt-2 border-t">
          <Button variant="ghost" size="sm" className="flex-1">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <Repeat2 className="w-4 h-4 mr-2" />
            Repost
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
