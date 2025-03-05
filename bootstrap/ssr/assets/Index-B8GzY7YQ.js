import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Loader2, CheckCircle, Clipboard, ArrowUpDown, ChevronRight } from "lucide-react";
import { B as Button, f as formatDuration } from "./button-CmMv2gJh.js";
import { C as Checkbox } from "./checkbox-DqkbCq-q.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DYKmrJXP.js";
import { B as Badge } from "./badge-DkVXOvzh.js";
import { L as Label } from "./label-p_6QBjcN.js";
import clsx from "clsx";
import { router, WhenVisible, Head } from "@inertiajs/react";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-DG-ngQKF.js";
import { IndexCreateLicenseDialog } from "./IndexCreateLicenseDialog-D-CIdUk1.js";
import { A as Authenticated } from "./AuthenticatedLayout-CREkYVRC.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "tailwind-merge";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-label";
import "@radix-ui/react-tooltip";
import "react-hook-form";
import "@hookform/resolvers/zod";
import "zod";
import "react-hot-toast";
import "./dialog-BHzYhrMl.js";
import "@radix-ui/react-dialog";
import "./form-Bv0Qu0pG.js";
import "./select-DpEcowDc.js";
import "@radix-ui/react-select";
import "./switch-Cp3w_Ulq.js";
import "@radix-ui/react-switch";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-scroll-area";
function IndexLicensesTable({ licenses, applications, timeOptions }) {
  var _a, _b;
  const columns = [
    {
      id: "select",
      header: ({ table: table2 }) => /* @__PURE__ */ jsx("div", {}),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex items-center ml-2", children: /* @__PURE__ */ jsx(
        Checkbox,
        {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          "aria-label": "Select row"
        }
      ) }),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "license_key",
      header: ({ column }) => {
        return /* @__PURE__ */ jsx("div", { children: "License Key" });
      },
      cell: ({ row }) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-row items-center gap-2 max-w-lg",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  onClick: () => copyToClipboard(row.getValue("license_key")),
                  className: "h-4 w-4 text-indigo-50",
                  children: [
                    copied ? /* @__PURE__ */ jsx(CheckCircle, {}) : /* @__PURE__ */ jsx(Clipboard, {}),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Copy license key" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(TooltipContent, { className: "px-2 py-1 text-xs", children: "Copy to clipboard" })
            ] }) }),
            /* @__PURE__ */ jsx(Label, { className: "lowercase cursor-text", children: row.getValue("license_key") })
          ]
        }
      )
    },
    {
      accessorKey: "app_name",
      header: ({ column }) => {
        return /* @__PURE__ */ jsx("div", { children: "Application" });
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: " flex flex-row items-center gap-2", children: /* @__PURE__ */ jsx(Label, { className: "lowercase", children: row.getValue("app_name") }) })
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Duration"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "lowercase", children: formatDuration(row.getValue("duration")) })
    },
    {
      accessorKey: "expiry_date",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Time Left"
            ]
          }
        );
      },
      cell: ({ row }) => {
        if (row.getValue("status") === "unused") return /* @__PURE__ */ jsx("div", { children: "N/A" });
        const expiry_date = new Date(row.getValue("expiry_date"));
        const current_date = /* @__PURE__ */ new Date();
        const time_difference = expiry_date.getTime() - current_date.getTime();
        return /* @__PURE__ */ jsx("div", { className: "lowercase", children: formatDuration(time_difference) });
      }
    },
    {
      accessorKey: "note",
      header: ({ column }) => {
        return /* @__PURE__ */ jsx("div", { children: "Note" });
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "lowercase", children: row.getValue("note") })
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Status"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx(Badge, { className: clsx(
        "capitalize w-20 flex flex-row justify-center items-center gap-1",
        row.getValue("status") === "unused" && "badge-success",
        row.getValue("status") === "active" && "badge-primary",
        row.getValue("status") === "expired" && "badge-danger",
        row.original.revoked === "1" && "badge-danger"
      ), children: row.original.revoked === "1" ? "Revoked" : row.getValue("status") })
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-zinc-600" }) });
      }
    }
  ];
  const [copied, setCopied] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
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
      rowSelection
    }
  });
  const copyToClipboard = (string) => {
    navigator.clipboard.writeText(string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center py-4 gap-4", children: [
      /* @__PURE__ */ jsx(IndexCreateLicenseDialog, { applications, timeOptions }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search...",
          value: ((_a = table.getColumn("license_key")) == null ? void 0 : _a.getFilterValue()) ?? "",
          onChange: (event) => {
            var _a2;
            return (_a2 = table.getColumn("license_key")) == null ? void 0 : _a2.setFilterValue(event.target.value);
          },
          className: "max-w-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-zinc-950 rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
          header.column.columnDef.header,
          header.getContext()
        ) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_b = table.getRowModel().rows) == null ? void 0 : _b.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          className: "cursor-pointer",
          onClick: () => router.visit(route("licenses.show", row.original.id)),
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: /* @__PURE__ */ jsx(WhenVisible, { data: "licenses", fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-indigo-700", size: 32 }) }), children: "No results." })
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [
        table.getFilteredSelectedRowModel().rows.length,
        " of",
        " ",
        table.getFilteredRowModel().rows.length,
        " row(s) selected."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Index({ licenses, applications, timeOptions }) {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Licenses Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Licenses Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "View and manage your licenses" })
      ] }),
      /* @__PURE__ */ jsx(IndexLicensesTable, { licenses, applications, timeOptions })
    ] })
  ] });
}
export {
  Index as default
};
