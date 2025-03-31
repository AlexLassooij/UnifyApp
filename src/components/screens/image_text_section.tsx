import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ImageTextSectionProps {
  imageUrl: string;
  imageAlt: string;
  title: ReactNode | string;
  description: ReactNode | string;
  imageOnLeft?: boolean;
  centerText?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  maxWidth?: string;
  imageWidth?: number;
  imageHeight?: number;
  paddingY?: string;
  descriptionFontsize?: string;
  isNumberedList?: boolean; // Add this property
}

export function ImageTextSection({
  imageUrl,
  imageAlt,
  title,
  description,
  imageOnLeft = true,
  centerText = false,
  backgroundColor = "bg-white",
  titleColor = "text-[#0d2d52]",
  textColor = "text-[#343434]",
  maxWidth = "max-w-[600px]",
  imageWidth = 600,
  imageHeight = 500,
  paddingY = "py-16",
  descriptionFontsize = "text-xl md:text-2xl",
  isNumberedList = false
}: ImageTextSectionProps) {

    // Function to render description based on format
  const renderDescription = () => {
    if (typeof description === 'string') {
      return isNumberedList ? (
        <ol className="list-decimal pl-6">
          <li>{description}</li>
        </ol>
      ) : (
        <div>{description}</div>
      );
    }
    
    // For JSX content, we need to handle it differently
    if (isNumberedList && React.isValidElement(description) && description.type === React.Fragment) {
      // Extract children from fragment and wrap each in a list item
      return (
        <ol className="list-decimal pl-6 space-y-4">
        {/* // @ts-expect-error - Ignoring index signature error for preferenceData */}
          {React.Children.map((description as React.ReactElement<{ children: ReactNode }>).props.children, (child, index) => {
            if (React.isValidElement(child)) {
              return <li key={index} className="pl-2 mb-4">{child}</li>;
            }
            return <li key={index} className="pl-2 mb-4">{child}</li>;
          })}
        </ol>
      );
    }
    
    // Return as is if not a numbered list
    return description;
  };
  return (
    <section className={`h-auto ${paddingY} p-8 md:px-12 ${backgroundColor}`}>
      <div className="h-full container mx-auto grid gap-8 lg:gap-16 px-4 md:px-6 md:grid-cols-12 justify-center items-center">
        {/* Image column - conditionally ordered */}
        <div 
          className={cn(
            "col-span-12 md:col-span-5 flex justify-center",
            imageOnLeft ? "md:order-first" : "md:order-last"
          )}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="max-w-[400px] lg:max-w-full h-auto"
          />
        </div>
        
        {/* Text column */}
        <div 
          className={cn(
            "col-span-12 md:col-span-7 space-y-6"
          )}
        >
          <div className={`text-4xl md:text-5xl font-bold ${titleColor} mb-4`}>
            {title}
          </div>
          <div className={cn(`${descriptionFontsize} font-medium ${textColor} ${centerText ? "mx-auto" : ""} ${maxWidth}`, centerText ? "text-center md:text-center" : "text-left md:text-left")}>
            {renderDescription()}
          </div>
        </div>
      </div>
    </section>
  );
}