import { Brain, Lightbulb, Target, CheckCircle } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-900">
              Core Concept
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Input a keyword, get complete content
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              You input a keyword, goal, or niche, and IdeaForge X outputs everything you need for content creation.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-50">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Content Ideas</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Generate fresh, engaging content ideas tailored to your niche and audience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-50">
                <Target className="h-5 w-5" />
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Hooks, CTAs, and Angles</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Craft attention-grabbing hooks and effective calls-to-action that convert.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-50">
                <Brain className="h-5 w-5" />
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">AI-Generated Complete Content</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get fully-formed content in multiple formats, ready to publish or customize.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-50">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Visuals, Mood Boards, and Hashtags</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Complete your content with visual suggestions, mood boards, and optimized hashtags.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
