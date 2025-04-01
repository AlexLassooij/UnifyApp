'use client'

import Image from "next/image"
import { ImageTextSection } from "@/components/screens/image_text_section"
import { teamData } from "@/lib/landing_page_data"
export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src="/landing/ubc_background.jpg"
          alt="Scenic view of mountains and city"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Redefining Access to Education,
              <br />
              One Student at a Time.
            </h1>
          </div>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a456c] leading-tight">
              We&apos;re on a mission to make university guidance accessible, empowering, and equitable for every student.
            </h2>
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-lg font-medium text-[#0a456c]">
            <p>
              Many students apply to university without clear guidance — and not everyone can afford private
              consultants. As students ourselves, we know how confusing and unequal the process can feel.
            </p>

            <p>
              That&apos;s why we created Unify: a platform that simplifies admissions, offers expert-backed tools, and
              supports students from all backgrounds.
            </p>

            <p>
              With team members who are transfer, international, and domestic students, we understand different journeys
              — and we&apos;re here to help others find theirs.
            </p>
          </div>
        </div>
      </div>

      {teamData.map((testimonial, index) => (
        <ImageTextSection
          key={`testimonial-${index}`}
          imageUrl={testimonial.imageUrl}
          imageAlt={testimonial.imageAlt}
          title={
            <>
              <h3 className="mb-1">{testimonial.name}</h3>
              <p className="text-xl md:text-3xl text-gray-600 font-normal mt-2">{testimonial.title}</p>
            </>
          }
          description={
            <>
              {testimonial.paragraphs.map((paragraph, pIndex) => (
                <p key={`paragraph-${index}-${pIndex}`} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </>
          }
          imageOnLeft={testimonial.imageOnLeft}
          centerText={false}
          imageHeight={350}
          imageWidth={350}
          backgroundColor={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          maxWidth="max-w-[600px] lg:max-w-[800px]"
          descriptionFontsize="text-xl md:text-xl"

        />
      ))}
    </div>
  )
}

