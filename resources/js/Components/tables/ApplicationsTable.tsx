// @ts-ignore
// @ts-nocheck

import React, { useState } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight, Loader2, Plus } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Badge } from "@/Components/ui/badge"
import { Deferred, Link, router, usePage } from "@inertiajs/react"
import clsx from "clsx"

export function ApplicationsTable({ applications }: {
    applications: object[]
}) {

    const columns: ColumnDef<object>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown />
                        Name
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize text-zinc-200">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "app_hash_id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown />
                        App ID
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="text-zinc-200">
                    {row.getValue("app_hash_id")}
                </div>
            ),
        },
        {
            accessorKey: "licenses_count",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown />
                        Keys
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase text-zinc-200">
                {row.getValue("licenses_count")} keys
            </div>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown />
                        Status
                    </Button>
                )
            },
            cell: ({ row }) =>
                <Badge className={clsx("capitalize w-20 flex flex-row justify-center items-center gap-1",
                    row.getValue("status") === "available" && "badge-success",
                    row.getValue("status") === "unavailable" && "badge-danger",
                    row.getValue("status") === "hidden" && "badge-warning"
                )}>
                    {row.getValue("status")}
                </Badge>
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex justify-end">
                        <ChevronRight className="text-zinc-600" />
                    </div>
                )
            },
        },
    ]

    const user = usePage().props.auth.user;

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data: applications || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const canCreate = user?.all_permissions.includes('APPS_CREATE');

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Link href={route('applications.create')}>
                    <Button
                        disabled={!canCreate}
                        className="btn-primary">
                        <Plus />
                        New application
                    </Button>
                </Link>
                <Input
                    placeholder="Search..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="bg-zinc-950 rounded-md border">
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
                                                    header.getContext()
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
                                    data-state={row.getIsSelected() && "selected"}
                                    className="cursor-pointer"
                                    onClick={() => router.visit(route('applications.show', row.original.id))}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <Deferred
                                        data="applications"
                                        fallback={
                                            <div className="flex items-center justify-center">
                                                <Loader2 className="animate-spin text-indigo-700" size={32} />
                                            </div>
                                        }>
                                        No results.
                                    </Deferred>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
