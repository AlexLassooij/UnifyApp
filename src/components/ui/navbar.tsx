"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation"
import { useState } from 'react';
import { Home, BookCopy, Files, Users2, Search, User, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function AppNavbar({ defaultIsCollapsed = false }) {
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Compare", href: "/compare", icon: BookCopy },
    { name: "Grades", href: "/grades", icon: ClipboardList },
    { name: "Applications", href: "/applications", icon: Files },
    { name: "Forums", href: "/forums", icon: Users2 },
    { name: "Search", href: "/search", icon: Search },
    { name: "Account", href: "/account", icon: User },
  ];


  return (
    <div className={`max-h-screen sticky top-0 overflow-y-auto flex flex-col justify-start pt-4 items-center ${isCollapsed ? 'min-w-12' : 'p-4 w-[192px] min-w-[142px]' } bg-[#c0dce9] transition-all ease-in-out duration-300 rounded-tr-2xl rounded-br-2xl`}>
      <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex justify-center items-center text-sm font-medium transition-all ease-in-out duration-300">
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <><ChevronLeft className="h-5 w-5"/><div>Collapse</div></>}
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-4 items-center w-full">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-3 py-3 w-full rounded-lg text-[#191919] hover:bg-white/50 transition-colors ${isCollapsed ? '' : 'px-16'} ${isActive ? 'bg-white/30' : ''} `}
            >
              <item.icon className="h-5 w-5 transition-all ease-in-out duration-300" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export function AppNavbarWrapper() {
  const pathname = usePathname()

  // Define paths that should show the navbar (public routes)
  const isOnboardingRoute = pathname.includes("/onboarding")


  // Only render the navbar on public routes
  // if (isOnboardingRoute) return null

  return <AppNavbar defaultIsCollapsed={isOnboardingRoute}/>
}


export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary rounded-br-2xl rounded-bl-2xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo_larger.svg"
            alt="Unify Logo"
            width={60}
            height={60}
          />
          <h1 className="pt-1 text-4xl font-medium text-default font-spartan">Unify</h1>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/students" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Students</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/parents" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Parents</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/testimonials" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Testimonials</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <Link href="/login" className={cn(navigationMenuTriggerStyle(), "font-bold")}>
            Log In
          </Link>
          <Button asChild className="text-lg font-bold bg-purple-light hover:bg-purple">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export function PublicComponentWrapper({children}: Readonly<{children: React.ReactNode;}>) {

  const publicRoutes = ["/", "/login", "/signup", "/about", "/testimonials", "/students", "/parents"]
  const pathname = usePathname()

  // Define paths that should show the navbar (public routes)
  const isPublicRoute = publicRoutes.includes(pathname)

  // Only render the navbar on public routes
  if (!isPublicRoute) return <></>

  return <>{children ?? null}</>
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

function NavItem({ icon, label, active = false, href = "#" }: NavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center space-y-1">
      <div className={cn("p-2", active ? "text-foreground" : "text-muted-foreground")}>{icon}</div>
      <span className={cn("text-sm", active ? "font-medium" : "font-normal")}>{label}</span>
    </Link>
  );
}


