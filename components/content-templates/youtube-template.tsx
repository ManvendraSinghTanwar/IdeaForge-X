import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ThumbsUp, ThumbsDown, Share, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface YouTubeTemplateProps {
  content: {
    title: string
    description: string
    hook: string
    introduction: string
    mainContent: Array<{
      timestamp: string
      section: string
      content: string
    }>
    conclusion: string
    tags?: string[]
  }
}

export function YouTubeTemplate({ content }: YouTubeTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Video Player Mock */}
      <Card className="overflow-hidden">
        <div className="aspect-video bg-black flex items-center justify-center relative">
          <div className="text-center text-white">
            <Play className="w-16 h-16 mb-4 mx-auto" />
            <p className="text-lg font-semibold">{content.title || "Untitled Video"}</p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            8:45
          </div>
        </div>
      </Card>

      {/* Video Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{content.title || "Untitled Video"}</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                Y
              </div>
              <div>
                <div className="font-semibold">Your Channel</div>
                <div className="text-sm text-gray-500">125K subscribers</div>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Subscribe</Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-1" />
              1.2K
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Script Content */}
      <Card>
        <CardHeader>
          <CardTitle>Video Script</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-red-600 mb-2">Hook (0:00 - 0:15)</h3>
            <p className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
              {content.hook || "Engaging hook will be generated here..."}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-600 mb-2">Introduction (0:15 - 0:45)</h3>
            <p className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              {content.introduction || "Video introduction will be generated here..."}
            </p>
          </div>

          {content.mainContent && content.mainContent.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600 mb-2">Main Content</h3>
              {content.mainContent.map((item, index) => (
                <div key={index} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.timestamp || `${index + 1}:00`}</Badge>
                    <span className="font-medium">{item.section || `Section ${index + 1}`}</span>
                  </div>
                  <p>{item.content || "Content section"}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600 mb-2">Main Content</h3>
              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                <p>Main video content will be generated here...</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-purple-600 mb-2">Conclusion & CTA</h3>
            <p className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
              {content.conclusion || "Concluding remarks and call to action will be generated here..."}
            </p>
          </div>

          {content.tags && content.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
