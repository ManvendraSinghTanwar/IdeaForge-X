"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollText, Home, Settings, Folder, PlusCircle, BarChart, Share2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Create Content",
      href: "/dashboard/create",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      name: "My Content",
      href: "/dashboard/content",
      icon: <ScrollText className="h-5 w-5" />,
    },
    {
      name: "My Vault",
      href: "/dashboard/vault",
      icon: <Folder className="h-5 w-5" />,
    },
    {
      name: "Social Accounts",
      href: "/dashboard/accounts",
      icon: <Share2 className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 z-40 w-full border-t bg-background">
        <div className="flex h-16 items-center justify-around">
          {links.slice(0, 5).map((link) => (
            <Link key={link.name} href={link.href}>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-12 w-12", pathname === link.href && "bg-accent text-accent-foreground")}
              >
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full w-[240px] flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === link.href && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
