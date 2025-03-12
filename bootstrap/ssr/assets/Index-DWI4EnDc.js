import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BDkfhEOo.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DSJtbVSd.js";
import { router, Deferred, Head } from "@inertiajs/react";
import * as React from "react";
import React__default from "react";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Loader2, ArrowUpDown, ChevronRight } from "lucide-react";
import { B as Button } from "./button-CmMv2gJh.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DYKmrJXP.js";
import { CreateManagerDialog } from "./CreateManagerDialog-DhiSudP1.js";
import { CreateResellerDialog } from "./CreateResellerDialog--VXfOOyC.js";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "react-hot-toast";
import "@radix-ui/react-tabs";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "react-hook-form";
import "@hookform/resolvers/zod";
import "zod";
import "./dialog-BHzYhrMl.js";
import "./form-Bv0Qu0pG.js";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "./checkbox-DqkbCq-q.js";
import "@radix-ui/react-checkbox";
function ManagersTable({ managers }) {
  var _a, _b;
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Username"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "", children: row.getValue("name") })
    },
    {
      accessorKey: "disabled",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Disabled"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("disabled") == "1" ? "Yes" : "No" })
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-zinc-600" }) });
      }
    }
  ];
  const [sorting, setSorting] = React__default.useState([]);
  const [columnFilters, setColumnFilters] = React__default.useState([]);
  const [columnVisibility, setColumnVisibility] = React__default.useState({});
  const [rowSelection, setRowSelection] = React__default.useState({});
  const table = useReactTable({
    data: managers || [],
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
      rowSelection
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center py-4 gap-4", children: [
      /* @__PURE__ */ jsx(CreateManagerDialog, {}),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search...",
          value: ((_a = table.getColumn("name")) == null ? void 0 : _a.getFilterValue()) ?? "",
          onChange: (event) => {
            var _a2;
            return (_a2 = table.getColumn("name")) == null ? void 0 : _a2.setFilterValue(event.target.value);
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
          onClick: () => router.visit(route("users.showManager", row.original.id)),
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
          children: /* @__PURE__ */ jsx(Deferred, { data: "managers", fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-indigo-700", size: 32 }) }), children: "No results" })
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
  ] }) });
}
function ResellersTable({ resellers }) {
  var _a, _b;
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Username"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("name") })
    },
    {
      accessorKey: "created_keys",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Keys created"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { children: [
        row.getValue("created_keys"),
        " keys"
      ] })
    },
    {
      accessorKey: "apps_count",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Apps access"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("apps_count") })
    },
    {
      accessorKey: "balance",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Balance"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { children: [
        row.getValue("balance"),
        " credits"
      ] })
    },
    {
      accessorKey: "disabled",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Disabled"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("disabled") ? "Yes" : "No" })
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-zinc-600" }) });
      }
    }
  ];
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: resellers || [],
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
      rowSelection
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center py-4 gap-4", children: [
      /* @__PURE__ */ jsx(CreateResellerDialog, {}),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search...",
          value: ((_a = table.getColumn("name")) == null ? void 0 : _a.getFilterValue()) ?? "",
          onChange: (event) => {
            var _a2;
            return (_a2 = table.getColumn("name")) == null ? void 0 : _a2.setFilterValue(event.target.value);
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
          onClick: () => router.visit(route("users.showReseller", row.original.id)),
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
          children: /* @__PURE__ */ jsx(Deferred, { data: "resellers", fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-indigo-700", size: 32 }) }), children: "No results" })
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
  ] }) });
}
function Index({ managers, resellers }) {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "User Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "User Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "View and manage your users" })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "manager", className: "w-full", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "manager", children: "Managers" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "reseller", children: "Resellers" })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "manager", children: /* @__PURE__ */ jsx(ManagersTable, { managers }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "reseller", children: /* @__PURE__ */ jsx(ResellersTable, { resellers }) })
      ] })
    ] })
  ] });
}
export {
  Index as default
};
