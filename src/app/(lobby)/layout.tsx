import Navbar from '@/components/layouts/Navbar'
import { getAuthSession } from '@/lib/auth'

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()

  return (
    <div>
      <Navbar user={session?.user} />
      <div className='max-w-7xl mx-auto'>{children}</div>
    </div>
  )
}
