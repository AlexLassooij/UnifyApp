import { useState } from "react"
import { Bookmark } from "lucide-react"

interface BookmarkButtonProps {
  onClick?: (isBookmarked: boolean) => void
  initialBookmarked?: boolean
  className?: string
}

export default function BookmarkButton({ onClick, initialBookmarked = false, className }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)

  const handleClick = () => {
    const newState = !isBookmarked
    setIsBookmarked(newState)
    if (onClick) {
      onClick(newState)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`
        p-[5px] flex items-center justify-center
        transition-colors duration-200 ease-in-out
        group
        ${className}
      `}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <div className="relative w-[26.5px] h-[31.5px]">
        <Bookmark
          className={`
            absolute inset-0 w-full h-full
            transition-colors duration-200 ease-in-out
            stroke-[#ffc107] stroke-[1.5]
            ${isBookmarked ? "fill-[#ffc107]" : "fill-transparent"}
          `}
        />
        {!isBookmarked && (
          <div
            className="
              absolute inset-[1.5px] 
              bg-[#ffc107] opacity-0 bg-hover:opacity-20
              transition-opacity duration-200 ease-in-out
            "
          />
        )}
      </div>
    </button>
  )
}