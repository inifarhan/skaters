'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between px-1 pb-4'>
        <Input
          placeholder='Search'
          // value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          // onChange={(event) =>
          //   table.getColumn(searchKey)?.setFilterValue(event.target.value)
          // }
          className='max-w-sm'
        />
        <Link aria-label='Create new row' href={`/dashboard/stores/${params.storeId}/products/new`}>
          <div
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'h-8',
              }),
            )}>
            <PlusCircleIcon className='mr-2 h-4 w-4' aria-hidden='true' />
            New
          </div>
        </Link>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
