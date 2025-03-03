// @ts-ignore
// @ts-nocheck

import * as React from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { ArrowUpDown, Check, CheckCircle, ChevronRight, Clipboard, Loader2 } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { Input } from "@/Components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/Components/ui/table"
import { Badge } from "@/Components/ui/badge"
import { Label } from "@/Components/ui/label"
import clsx from "clsx"
import { formatDuration } from "@/lib/utils"
import { router, WhenVisible } from "@inertiajs/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/Components/ui/tooltip";
import { IndexCreateLicenseDialog } from "@/Pages/Licenses/Fragments/IndexCreateLicenseDialog"

export function IndexLicensesTable({ licenses, applications }: { licenses: object[], applications: object[] }) {

    const columns: ColumnDef<object>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div></div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center ml-2">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "license_key",
            header: ({ column }) => {
                return (
                    <div>
                        License Key
                    </div>
                )
            },
            cell: ({ row }) => (
                <div
                    className="flex flex-row items-center gap-2 max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => copyToClipboard(row.getValue("license_key"))}
                                    className="h-4 w-4 text-indigo-50">
                                    {copied ? <CheckCircle/> : <Clipboard />}
                                    <span className="sr-only">Copy license key</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Label className="lowercase cursor-text">{row.getValue("license_key")}</Label>
                </div>
            ),
        },
        {
            accessorKey: "app_name",
            header: ({ column }) => {
                return (
                    <div>
                        Application
                    </div>
                )
            },
            cell: ({ row }) => (
                <div className=" flex flex-row items-center gap-2">
                    <Label className="lowercase">{row.getValue("app_name")}</Label>
                </div>
            ),
        },
        {
            accessorKey: "duration",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown />
                        Duration
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{formatDuration(row.getValue("duration"))}</div>,
        },
        {
            accessorKey: "expiry_date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown />
                        Time Left
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row.getValue("status") === 'unused') return <div>N/A</div>;
                // calculate the remaning time from the expiry date and the current date
                const expiry_date = new Date(row.getValue("expiry_date"));
                const current_date = new Date();
                const time_difference = expiry_date.getTime() - current_date.getTime();
                return <div className="lowercase">{formatDuration(time_difference)}</div>;

            }
        },
        {
            accessorKey: "note",
            header: ({ column }) => {
                return (
                    <div>
                        Note
                    </div>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("note")}</div>,
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
                    row.getValue("status") === "unused" && "badge-success",
                    row.getValue("status") === "active" && "badge-primary",
                    row.getValue("status") === "expired" && "badge-danger",
                    row.original.revoked === "1" && "badge-danger"
                )}>
                    {row.original.revoked === '1' ? 'Revoked' : row.getValue("status")}
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

    const [copied, setCopied] = React.useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: licenses || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // globalFilterFn: (row, columnId, filterValue) => {
        //     const licenseKey = row.original.license_key?.toLowerCase() ?? "";
        //     const comment = row.original.comment?.toLowerCase() ?? "";
        //     const search = filterValue.toLowerCase();
        //     return licenseKey.includes(search) || comment.includes(search);
        // },
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const copyToClipboard = (string: string) => {
        navigator.clipboard.writeText(string)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <IndexCreateLicenseDialog applications={applications} />
                <Input
                    placeholder="Search..."
                    value={(table.getColumn("license_key")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("license_key")?.setFilterValue(event.target.value)
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
                                    onClick={() => router.visit(route('licenses.show', row.original.id))}
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
                                    <WhenVisible data="licenses" fallback={<div className="flex items-center justify-center"><Loader2 className="animate-spin text-indigo-700" size={32} /></div>}>
                                        No results.
                                    </WhenVisible>
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
