'use client'

import Image from "next/image"
import { ImageTextSection } from "@/components/screens/image_text_section"

export default function Parents() {
  return (
    <main className="flex flex-col">
        <ImageTextSection
            imageUrl="/landing/cartoon_chilling.png"
            imageAlt="cartoons chilling"
            title="Support your child’s future with confidence."
            description="No more guesswork. Get the tools and insights you need to guide your child with ease."
            imageOnLeft={true}
            centerText={false}
            imageHeight={350}
            imageWidth={350}
        />

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
        <ImageTextSection
            imageUrl="/landing/girl_cap_up.png"
            imageAlt="girl_graduating"
            title="Know What They Need — Before They Need It."
            description="Get personalized recommendations for schools and programs based on your child’s goals, interests, and grades."
            imageOnLeft={false}
            centerText={false}
            imageHeight={300}
            imageWidth={350}
        />

        <ImageTextSection
            imageUrl="/landing/laptop_aerial.png"
            imageAlt="laptop_aerial"
            title="Smart Planning, Family Budget Approved."
            description={
            <>
                <p className="mb-4">Private consultants can cost hundreds — even thousands — for the same guidance.</p>  
                <p className="mb-4">Unify gives you expert-backed tools in one affordable, self-guided platform.</p>
                <p className="mb-4">Why pay $200/hour when you can access smarter planning, built with the same insight and more transparency?</p>
                <p>Unify helps families stay informed and on budget — no compromises, no confusion.</p>
            </>
            }
            imageOnLeft={true}
            centerText={false}
            imageHeight={600}
            imageWidth={400}
            maxWidth="max-w-[600px] lg:max-w-[800px]"
        />
        
    

    </main>
  )
}

