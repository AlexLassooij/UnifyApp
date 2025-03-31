'use client'

import Image from "next/image"
import { ImageTextSection } from "@/components/screens/image_text_section"
import { parentsData } from "@/lib/landing_page_data"

export default function Parents() {
  return (
    <main className="flex flex-col">
        {parentsData.map((section, index) => (
            <>
            {index === 1 && (
            <section className="hidden sm:block h-auto bg-white p-8">
            <div className="h-full container mx-auto grid px-4 md:px-6 justify-center items-center">
                <Image
                    src="/landing/testimonial.png"
                    alt="testimonials"
                    width={1000}
                    height={500}
                    className="max-w[400px] md:max-w-[750px] lg:max-w-[1000px] h-auto"
                />
            </div>
        </section>
            )}
            <ImageTextSection
            key={`parent-section-${index}`}
            imageUrl={section.imageUrl}
            imageAlt={section.imageAlt}
            title={section.title}
            description={
                Array.isArray(section.description) ? (
                <>
                    {section.description.map((paragraph, pIndex) => (
                    <p key={`paragraph-${index}-${pIndex}`} className={pIndex < section.description.length - 1 ? "mb-4" : ""}>
                        {paragraph}
                    </p>
                    ))}
                </>
                ) : (
                section.description
                )
            }
            imageOnLeft={section.imageOnLeft}
            centerText={section.centerText}
            imageHeight={section.imageHeight}
            imageWidth={section.imageWidth}
            maxWidth={section.maxWidth}
            backgroundColor={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            />
        </>
      ))}
    </main>
  )
}

