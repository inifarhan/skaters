import { MouseEventHandler } from 'react'

import { cn } from '@/lib/utils'

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full flex items-center justify-center bg-white border shadow-md p-2 duration-300 transition-all',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton
