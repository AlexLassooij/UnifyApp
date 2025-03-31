import type React from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail } from "lucide-react"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#002f40] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Column - About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Unify</h2>
            <p className="mb-4">Helping students make confident, informed choices about their future.</p>
            <p>Built by students. Backed by experts.</p>
          </div>

          {/* Second Column - Navigation */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Company</h2>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-[#a78bfa] transition-colors">
                Home
              </Link>
              <Link href="/students" className="hover:text-[#a78bfa] transition-colors">
                Students
              </Link>
              <Link href="/parents" className="hover:text-[#a78bfa] transition-colors">
                Parents
              </Link>
              <Link href="/testimonials" className="hover:text-[#a78bfa] transition-colors">
                Testimonials
              </Link>
              <Link href="/about" className="hover:text-[#a78bfa] transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Third Column - Newsletter */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
            <div className="space-y-4">
              <Input type="email" placeholder="Email*" className="bg-transparent border-white/20 focus:border-white" />
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  className="mt-1 border-white/50 data-[state=checked]:bg-[#a78bfa] data-[state=checked]:border-[#a78bfa]"
                />
                <div className="space-y-1">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-xs text-gray-300">
                    You agree to our{" "}
                    <Link href="/terms" className="text-[#a78bfa] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#a78bfa] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <Button className="bg-[#a78bfa] hover:bg-[#9175e5] text-white">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* Fourth Column - Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-2 mb-6">
              <p>
                <a href="mailto:help@unifyapp.ca" className="hover:text-[#a78bfa] transition-colors">
                  help@unifyapp.ca
                </a>
              </p>
              <p>
                <a href="tel:+14038279530" className="hover:text-[#a78bfa] transition-colors">
                  (403)-827-9530
                </a>
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/unify.ca/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-[#a78bfa] transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6 hover:text-[#a78bfa] transition-colors" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTokIcon className="h-6 w-6 hover:text-[#a78bfa] transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 hover:text-[#a78bfa] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-white/10 text-sm">
          <p>© 2025 Unify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Custom TikTok icon since it's not available in Lucide
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

