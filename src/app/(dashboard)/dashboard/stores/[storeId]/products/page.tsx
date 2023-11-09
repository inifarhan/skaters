import { ProductColumn, columns } from './columns'
import { DataTable } from '@/components/ui/DataTable'

async function getData(): Promise<ProductColumn[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      price: 2000000,
      name: 'Seblak',
      category: 'Clothing',
      createdAt: '2023-11-08 12:07:39.905',
    },
    {
      id: '728ed52f',
      price: 1000000,
      name: 'Skateboard',
      category: 'Skateboards',
      createdAt: '2023-11-08 12:07:39.905',
    },
    {
      id: '728ed52f',
      price: 150000,
      name: 'Headset Hitam',
      category: 'Accessories',
      createdAt: '2023-11-08 12:07:39.905',
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
