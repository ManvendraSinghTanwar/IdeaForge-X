import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Sparkles, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  IdeaForge X
                </span>
                <br />
                AI-Powered Content Brainstormer + Generator
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                A one-stop content creation companion that not only ideates but also creates every type of content —
                personalized, engaging, and brand-aligned.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Start Creating
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <BrainCircuit className="h-4 w-4 text-purple-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Multiple Content Types</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
              </div>
              <div className="relative p-4 h-full flex flex-col">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-gray-500">IdeaForge X</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="h-4 w-3/4 bg-purple-200 dark:bg-purple-900/50 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="h-4 w-3/4 bg-blue-200 dark:bg-blue-900/50 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="h-4 w-2/3 bg-green-200 dark:bg-green-900/50 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <div className="h-4 w-3/4 bg-amber-200 dark:bg-amber-900/50 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
