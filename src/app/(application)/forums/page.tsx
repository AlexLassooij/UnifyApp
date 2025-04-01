'use client'

import Image from "next/image";
import Link from "next/link";
import { CalendarClock, MessagesSquare, UserPlus, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ForumsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center mb-2">
          <MessagesSquare size={48} className="text-purple-500" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Forums Coming Soon</h1>
        
        <p className="text-xl text-gray-600">
          We&apos;re building a community space where students can connect, share experiences, and get answers.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <FeatureCard 
            icon={<UserPlus className="h-6 w-6 text-purple-500" />}
            title="Connect with Peers"
            description="Discuss applications, programs, and universities with students on the same journey."
          />
          
          <FeatureCard 
            icon={<CalendarClock className="h-6 w-6 text-purple-500" />}
            title="Get Timely Advice"
            description="Learn from others who've been through the process recently."
          />
          
          <FeatureCard 
            icon={<Activity className="h-6 w-6 text-purple-500" />}
            title="Stay Updated"
            description="Receive notifications on topics that matter most to you."
          />
        </div>
      </div>
    </div>
  );
}

// Helper components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-2 rounded-full bg-purple-50">{icon}</div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
