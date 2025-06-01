import Link from "next/link"
import { Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-md p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                  <path d="M7 7h.01"></path>
                </svg>
              </div>
              <span className="text-xl font-bold">IdeaForge X</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-Powered Content Brainstormer + Generator. Create personalized, engaging, and brand-aligned content with
              ease.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="#" className="hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="#" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} IdeaForge X. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
