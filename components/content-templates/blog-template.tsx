import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, User, Clock } from "lucide-react"

interface BlogTemplateProps {
  content: {
    title: string
    metaDescription?: string
    introduction: string
    sections: Array<{
      heading: string
      content: string
    }>
    conclusion: string
    tags?: string[]
  }
}

export function BlogTemplate({ content }: BlogTemplateProps) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight">{content.title}</h1>
          {content.metaDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-400">{content.metaDescription}</p>
          )}
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Your Name</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
          </div>
        </div>

        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{content.introduction}</p>

          {content.sections && content.sections.length > 0 ? (
            content.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="text-2xl font-semibold mt-8 mb-4">{section.heading || `Section ${index + 1}`}</h2>
                <div className="whitespace-pre-line leading-relaxed">
                  {section.content || "Section content will be generated here..."}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold mt-8 mb-4">Main Content</h2>
              <div className="whitespace-pre-line leading-relaxed">Blog content will be generated here...</div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">Conclusion</h3>
            <p className="leading-relaxed">{content.conclusion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
