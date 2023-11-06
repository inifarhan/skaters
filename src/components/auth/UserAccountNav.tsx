'use client'

import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'
import { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu'
import UserAvatar from './UserAvatar'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className='h-8 w-8'
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='text-sm font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[200px] truncate text-xs text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild disabled>
            <Link href='/dashboard/account'>
              <UserIcon className='mr-2 h-4 w-4' aria-hidden='true' />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/dashboard/stores'>
              <LayoutDashboard className='mr-2 h-4 w-4' aria-hidden='true' />
              My Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} asChild>
          <div>
            <LogOut className='mr-2 h-4 w-4' aria-hidden='true' />
            Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
