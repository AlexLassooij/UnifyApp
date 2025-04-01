"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { LogOut } from "lucide-react"
import { useAuth } from "@/store/authProvider"

export default function AccountPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const { signOut } = useAuth();
  

  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
    

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#9175e5] data-[state=active]:bg-transparent px-4 py-2 text-sm font-medium"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#9175e5] data-[state=active]:bg-transparent px-4 py-2 text-sm font-medium"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#9175e5] data-[state=active]:bg-transparent px-4 py-2 text-sm font-medium"
            >
              Subscription
            </TabsTrigger>
          </TabsList>

          {/* System Settings Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">System Settings</h2>
              <Button variant="outline" className="rounded-full px-6">
                Edit
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Language</h3>
                <p className="text-gray-600">English</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <p className="text-gray-600">Dark Mode</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Time Zone</h3>
                <p className="text-gray-600">Mountain Standard Time</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Currency Format</h3>
                <p className="text-gray-600">CAD</p>
              </div>

              <Button
                variant="ghost"
                className="text-[#9175e5] hover:bg-[#9175e5]/10 px-0 flex items-center"
                onClick={signOut}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            </div>
          </div>

         <Separator className="my-8" />
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Email Reminders</h3>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-medium">Weekly Summaries</h3>
                <Switch checked={true} />
              </div>
            </div>
          </div>
{/*
          <Separator className="my-8" />

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Connected Accounts</h2>
              <Button variant="outline" className="rounded-full px-6">
                Edit
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Google</h3>
                <p className="text-gray-600">viviennewu@gmail.com</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Apple Sign In</h3>
                <p className="text-gray-600">viviennewu@icloud.com</p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-xl font-bold mb-6">Security</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Type your current password</p>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="border-b border-gray-300 rounded-none focus:border-[#9175e5] focus:ring-0 px-0 py-2 bg-transparent"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Type your new password</p>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border-b border-gray-300 rounded-none focus:border-[#9175e5] focus:ring-0 px-0 py-2 bg-transparent"
                    />
                  </div>
                  <Button className="bg-[#9175e5] hover:bg-[#7d63d1]">Save</Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <Button className="bg-[#9175e5] hover:bg-[#7d63d1]">Change Device</Button>
              </div>

              <div>
                <h3 className="font-medium mb-4">Download my data</h3>
                <Button className="bg-[#9175e5] hover:bg-[#7d63d1]">Save</Button>
              </div>

              <div>
                <h3 className="font-medium mb-4">Delete Account</h3>
                <Button variant="destructive" className="bg-[#0a2e52] hover:bg-[#0a2e52]/90">
                  Delete Permanently
                </Button>
              </div>
            </div>
          </div> */}
        </Tabs>
      </div>
    </div>
  )
}

