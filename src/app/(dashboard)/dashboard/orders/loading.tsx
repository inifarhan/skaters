import OrderCardSkeleton from '@/components/skeletons/OrderCardSkeleton'

export default function OrdersPageLoading() {
  return (
    <div className='py-4 px-1'>
      <OrderCardSkeleton />
    </div>
  )
}
