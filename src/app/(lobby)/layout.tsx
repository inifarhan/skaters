import Navbar from "@/components/layouts/Navbar"

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}
