import type React from "react"

// defined to save space in the code
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardContent: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      <div className="m-4">{children}</div>
    </div>
  )
}

export const CardFooter: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

