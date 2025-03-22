import { LucideIcon as LucideIconType } from 'lucide-react';
import { cn } from "@/lib/utils";

// CSS color variables mapping (matching your branding)
const IconColors = {
  default: "var(--color-text-default)",
  muted: "var(--color-text-muted)",
  primary: "var(--color-brand-primary)",
  secondary: "var(--color-brand-secondary)",
  accent: "var(--color-brand-accent)",
  secondary_accent: "var(--color-brand-secondary-accent)",
} as const;

export const IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export type IconSize = keyof typeof IconSizes;
export type IconColor = keyof typeof IconColors;

export interface LucideIconProps {
  icon: LucideIconType;
  size?: IconSize ;
  color?: IconColor;
  className?: string;
}

export function LucideIcon({ 
  icon: IconComponent, 
  size = "md", 
  color = "default", 
  className 
}: LucideIconProps) {
  
    return (
        <div 
          style={{ 
            color: IconColors[color],
            width: `${IconSizes[size]}px`,
            height: `${IconSizes[size]}px`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className={className}
        >
          <IconComponent 
            style={{ 
              width: '100%', 
              height: '100%' 
            }} 
          />
        </div>
      );
}