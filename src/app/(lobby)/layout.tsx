import Footer from '@/components/layouts/Footer'
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
      <div>{children}</div>
      <Footer />
    </div>
  )
}
