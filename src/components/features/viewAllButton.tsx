import { ChevronRight } from "lucide-react"

interface ViewAllButtonProps {
  onClick?: () => void
  className?: string
}

export default function ViewAllButton({ onClick, className }: ViewAllButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[#191919] font-medium
        transition-colors duration-200 ease-in-out bg-[#a78bfa] bg-opacity-0 hover:bg-opacity-10
      `}
    >
      View All
      <ChevronRight className="w-5 h-5" />
    </button>
  )
}
