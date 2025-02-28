import { Check } from "lucide-react"
import { useState } from "react"

interface CustomCheckboxProps {
  initialChecked?: boolean
  className?: string
}

export default function CustomCheckbox({ initialChecked = false, className }: CustomCheckboxProps) {
  const [checked, setChecked] = useState(initialChecked)

  const handleClick = () => {
    const newCheckedState = !checked
    setChecked(newCheckedState)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        w-6 h-6 rounded-[3px] border border-[#a78bfa] flex items-center justify-center
        transition-colors duration-200 ease-in-out
        ${className}
      `}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && <Check className="w-4 h-4 text-[#a78bfa]" />}
    </button>
  )
}