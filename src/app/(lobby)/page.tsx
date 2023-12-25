import Categories from '@/components/Categories'
import Hero from '@/components/Hero'
import Products from '@/components/Products'

export default function Lobby() {
  return (
    <main>
      <Hero />
      <div className='max-w-7xl mx-auto'>
        <Categories />
        <Products />
      </div>
    </main>
  )
}
