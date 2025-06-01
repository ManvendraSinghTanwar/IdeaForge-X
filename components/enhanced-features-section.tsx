import { Calendar, RefreshCw, Zap, Lightbulb, Link2, Repeat } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EnhancedFeaturesSection() {
  const enhancedFeatures = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Auto-Calendar Mode",
      description: "AI plans your content for 30 days",
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Refine This",
      description: "Real-time rewriter for tone, length, or intent",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Mode",
      description: "Create full blog/threads in under 60s",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Challenge Me Mode",
      description: "Daily surprise content prompt with rewards",
    },
    {
      icon: <Link2 className="h-6 w-6" />,
      title: "Import from Link",
      description: "Drop a link → auto remix into other formats",
    },
    {
      icon: <Repeat className="h-6 w-6" />,
      title: "Smart Recycle",
      description: "Takes your old content and remixes it into a new format",
    },
  ]

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm dark:bg-amber-900">
              Enhanced Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Boost Your Content Creation</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Take advantage of these enhanced features to streamline your content creation process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {enhancedFeatures.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-50">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
