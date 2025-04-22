import { CheckCircle } from "lucide-react";
import { ComponentProps } from "react";

import {tv, VariantProps} from "tailwind-variants";

const button = tv({
  base: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded data-[success=true]: bg-emerald-400 hover:bg-emerald-600',
  variants: {
    size: {
      default: 'h-10 px-4',
      xs: 'h-8 px-3',
      sm: 'h-10 px-2 text-xs',
    },
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-gray-500 hover:bg-gray-700',
      success: 'bg-green-500 hover:bg-green-700',
    },
    success: {
      true: 'bg-emerald-400 hover:bg-emerald-600',
      false: 'bg-blue-500 hover:bg-blue-700',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'primary',
  },
});

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>

export const Button = ({success, size, color, className, ...props} : ButtonProps) => {
  return (
    <button
      data-success={success}
      className={button({size, color, success, className})}
      {...props}
    >
      {success ? <CheckCircle className="h-4 w-4" /> : props.children}
    </button>
  )
};