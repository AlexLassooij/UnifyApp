"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from 'react';
import { Home, BookCopy, BarChart3, Files, Users2, Search, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Compare", href: "/compare", icon: BookCopy },
    { name: "Grades", href: "/grades", icon: BarChart3 },
    { name: "Applications", href: "/applications", icon: Files },
    { name: "Forums", href: "/forums", icon: Users2 },
    { name: "Search", href: "/search", icon: Search },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className={`max-h-screen sticky top-0 overflow-y-auto flex flex-col justify-start pt-4 items-center ${isCollapsed ? 'w-10' : 'p-4 w-[192px]'} bg-[#c0dce9] transition-width duration-300`}>
      <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex justify-center items-center text-sm">
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <><ChevronLeft className="h-5 w-5"/><div>Collapse</div></>}
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-4 items-center">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-3 py-3 px-0 w-24 rounded-lg text-[#191919] hover:bg-white/50 transition-colors ${isActive ? 'bg-white/30' : ''}`}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;

