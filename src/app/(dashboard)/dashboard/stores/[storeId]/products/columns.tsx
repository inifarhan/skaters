'use client'

import { ColumnDef } from '@tanstack/react-table'

import { formatDate, formatPrice } from '@/lib/utils'
import { CellAction } from './components/CellAction'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  price: number
  name: string
  category: string
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = formatPrice(price)
      return formatted
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ cell }) => formatDate(cell.getValue() as Date),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
