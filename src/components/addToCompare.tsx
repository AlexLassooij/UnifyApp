import { Plus } from "lucide-react"

interface AddToCompareButtonProps {
  onClick?: () => void
  className?: string
}

export default function AddToCompareButton({ onClick, className }: AddToCompareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[#191919] font-medium
        transition-colors duration-200 ease-in-out bg-[#a78bfa] bg-opacity-0 hover:bg-opacity-10
        ${className}
      `}
    >
      Add to Compare
      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#191919]">
        <Plus className="w-4 h-4" />
      </div>
    </button>
  )
}