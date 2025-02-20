"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookCopy, BarChart3, Files, Users2, Search, Settings } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Compare", href: "/compare", icon: BookCopy },
    { name: "Grades", href: "/grades", icon: BarChart3 },
    { name: "Applications", href: "/applications", icon: Files },
    { name: "Forums", href: "/forums", icon: Users2 },
    { name: "Search", href: "/search", icon: Search },
    { name: "Settings", href: "/settings", icon: Settings },
  ]  

  return (
    <div className="w-[192px] bg-[#c0dce9] h-screen sticky top-0 overflow-y-auto flex flex-col justify-between p-8">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col text-lg font-[500] items-center gap-3 py-4 px-0 rounded-lg text-[#191919] hover:bg-white/50 transition-colors ${
              isActive ? "bg-white/30" : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

