'use client'

import Image from "next/image"
import { ImageTextSection } from "@/components/screens/image_text_section"
import { testimonialData } from "@/lib/landing_page_data"

export default function Testimonials() {
  return (
    <main className="flex flex-col">
        <ImageTextSection
            imageUrl="/landing/cartoon_pointing.png"
            imageAlt="cartoons pointing"
            title={
                <>
                    <h3 className="mb-1">Real Voices.</h3>
                    <h3>Real Confidence.</h3>
                </>
                }
            description="What students, parents, and experts are saying about Unify."
            imageOnLeft={true}
            centerText={false}
            imageHeight={350}
            imageWidth={300}
        />
    
    {testimonialData.map((testimonial, index) => (
        <ImageTextSection
          key={`testimonial-${index}`}
          imageUrl={testimonial.imageUrl}
          imageAlt={testimonial.imageAlt}
          title={testimonial.category}
          description={
            <>
              {testimonial.quotes.map((quote, quoteIndex) => (
                <div key={`quote-${index}-${quoteIndex}`}>
                  <p className="mb-0">"{quote.text}"</p>
                  <p className="mb-4">— {quote.author}</p>
                </div>
              ))}
            </>
          }
          imageOnLeft={testimonial.imageOnLeft}
          centerText={true}
          imageHeight={testimonial.imageHeight}
          imageWidth={testimonial.imageWidth}
          maxWidth="max-w-[600px] lg:max-w-[800px]"
          descriptionFontsize="text-xl"
          backgroundColor={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
        />
      ))}
        
    

    </main>
  )
}

