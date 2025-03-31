"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ImageTextSection } from "@/components/screens/image_text_section"
import { studentsData } from "@/lib/team_data"

export default function Students() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribed with:", email)
    // Handle subscription logic
    setEmail("")
  }

  return (
    <section className="flex flex-col">
        <div className="flex flex-col py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#0d2d52] text-center mb-8">
                Take the stress out of your university search.
            </h1>

            <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-8 lg:gap-48 items-center">
                {/* Left side - Text and Form */}
                <div className="max-w-xl">
                
                <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d52] leading-tight mb-8">
                    Built for Students.
                    <br />
                    Backed by Data.
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9175e5]"
                    />
                    <button
                    type="submit"
                    className="px-6 py-3 bg-[#9175e5] text-white font-medium rounded-md hover:bg-[#7d63d1] transition-colors"
                    >
                    Subscribe
                    </button>
                </form>
                </div>

                {/* Right side - Illustration */}
                <div className="flex justify-center md:justify-end">
                <Image
                    src="/landing/cartoon_spinning_ball.png"
                    alt="cartoon_spinning_ball"
                    width={400}
                    height={400}
                    className="max-w-full h-auto"
                    priority
                />
                </div>
            </div>
      </div>


      {studentsData.map((item, index) => (
        <ImageTextSection
            key={`student-${index}`}
            imageUrl={item.imageUrl}
            imageAlt={item.imageAlt}
            title={item.name}
            description={
            <>
                {item.paragraphs.map((paragraph, pIndex) => (
                <p key={`paragraph-${index}-${pIndex}`} className="mb-4 last:mb-0">
                    {paragraph}
                </p>
                ))}
            </>
            }
            imageOnLeft={item.imageOnLeft ?? (index % 2 === 0)}
            centerText={false}
            backgroundColor={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            maxWidth="max-w-[600px] lg:max-w-[800px]"
            imageHeight={item.imageHeight}
            imageWidth={item.imageWidth}
            descriptionFontsize="text-xl"
            isNumberedList={item.isNumberedList} // Pass the numbered list property
        />
        ))}
    </section>
  )
}

