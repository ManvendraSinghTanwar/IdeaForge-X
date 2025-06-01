import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Calendar } from "lucide-react"

interface EmailTemplateProps {
  content: {
    subject: string
    preheader?: string
    greeting: string
    body: string
    cta: string
    signature: string
    ps?: string
  }
}

export function EmailTemplate({ content }: EmailTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Email Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <div className="font-semibold">Your Brand &lt;hello@yourbrand.com&gt;</div>
              <div className="text-sm text-gray-500">to: subscriber@email.com</div>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Email Content */}
      <Card>
        <CardHeader className="border-b">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">{content.subject || "Email subject will be generated here"}</h1>
            {content.preheader && <p className="text-sm text-gray-600 dark:text-gray-400">{content.preheader}</p>}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-4">
            <p>{content.greeting || "Hello there,"}</p>

            <div className="whitespace-pre-line leading-relaxed">
              {content.body || "Email content will be generated here..."}
            </div>

            <div className="text-center py-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                {content.cta || "Take Action"}
              </Button>
            </div>

            <div className="pt-4 border-t">
              <div className="whitespace-pre-line text-sm">{content.signature || "Best regards,\nYour Name"}</div>
            </div>

            {content.ps && (
              <div className="pt-2 border-t border-dashed">
                <p className="text-sm italic">
                  <strong>P.S.</strong> {content.ps}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
