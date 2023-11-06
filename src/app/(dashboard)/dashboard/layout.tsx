import Navbar from '@/components/layouts/Navbar'
import { SidebarNav } from '@/components/layouts/SidebarNav'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <>
      <Navbar user={session?.user} />
      <div className='container flex'>
        <aside className='hidden md:block border-r min-h-screen pt-10 pr-6 w-[200px]'>
          <SidebarNav />
        </aside>
        <main className='pt-10 pl-10 w-full'>{children}</main>
      </div>
    </>
  )
}
