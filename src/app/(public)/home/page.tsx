import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* First screen */}
      <section className="min-h-screen py-16 rounded-br-2xl rounded-bl-2xl z-10">
        <div className="container mx-auto grid gap-8 px-6 md:px-4 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-default sm:text-5xl md:text-6xl">
              Unify brings all the university information to you!
            </h1>
            <p className="text-lg text-[#343434] max-w-[600px]">
              Set yourself up for success by using this all-in-one tool to compare universities, track grades and
              deadlines, and chat with current undergraduate students!
            </p>
            <div className="flex justify-center items-center">
              <Image
                src="/brand/landing1.svg"
                alt="Student using dashboard"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-default max-w-md">Plan for your future today by signing up!</h2>
            <div className="space-y-4 max-w-md mx-auto md:mx-0">
              <Card className="border-[#ccdde2] hover:bg-[#d7e8f0] transition-colors">
                <Link href="/signup" className="flex items-center justify-between p-4">
                  <span>I&apos;m a Student</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Card>
              <Card className="border-[#ccdde2] hover:bg-[#d7e8f0] transition-colors">
                <Link href="/signup" className="flex items-center justify-between p-4">
                  <span>I&apos;m a Parent</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Card>
              <Card className="border-[#ccdde2] hover:bg-[#d7e8f0] transition-colors">
                <Link href="/signup" className="flex items-center justify-between p-4">
                  <span>I&apos;m an Educational Consultant</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Second screen */}
      <section className="min-h-screen bg-[#002f40] py-16 rounded-tr-2xl rounded-tl-2xl">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              simplifying the university application process
            </h2>
          </div>
          <div className="flex justify-center">
            <Card className="bg-white rounded-lg p-8">
              <CardContent className="p-0">
                <Image
                    src="/brand/landing2.svg"
                    alt="Student using dashboard"
                    width={300}
                    height={300}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

