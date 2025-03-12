import { jsx, jsxs } from "react/jsx-runtime";
import React__default from "react";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Plus, Loader2, ArrowUpDown, ChevronRight } from "lucide-react";
import { B as Button } from "./button-CmMv2gJh.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DYKmrJXP.js";
import { B as Badge } from "./badge-DkVXOvzh.js";
import { usePage, Link, router, Deferred, Head } from "@inertiajs/react";
import clsx from "clsx";
import { A as Authenticated } from "./AuthenticatedLayout-BDkfhEOo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "tailwind-merge";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "react-hot-toast";
function ApplicationsTable({ applications }) {
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
              "Name"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "capitalize text-zinc-200", children: row.getValue("name") })
    },
    {
      accessorKey: "app_hash_id",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "App ID"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-zinc-200", children: row.getValue("app_hash_id") })
    },
    {
      accessorKey: "license_count",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              /* @__PURE__ */ jsx(ArrowUpDown, {}),
              "Keys"
            ]
          }
        );
      },
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "lowercase text-zinc-200", children: [
        row.getValue("license_count"),
        " keys"
      ] })
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
        row.getValue("status") === "available" && "badge-success",
        row.getValue("status") === "unavailable" && "badge-danger",
        row.getValue("status") === "hidden" && "badge-warning"
      ), children: row.getValue("status") })
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-zinc-600" }) });
      }
    }
  ];
  const user = usePage().props.auth.user;
  const [sorting, setSorting] = React__default.useState([]);
  const [columnFilters, setColumnFilters] = React__default.useState([]);
  const [columnVisibility, setColumnVisibility] = React__default.useState({});
  const [rowSelection, setRowSelection] = React__default.useState({});
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
      rowSelection
    }
  });
  const canCreate = user == null ? void 0 : user.all_permissions.includes("APPS_CREATE");
  const reachedLimit = (user == null ? void 0 : user.application_count) >= (user == null ? void 0 : user.subscription.max_applications);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center py-4 gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: route("applications.create"), children: /* @__PURE__ */ jsxs(
        Button,
        {
          disabled: !canCreate || reachedLimit,
          className: "btn-primary",
          children: [
            /* @__PURE__ */ jsx(Plus, {}),
            "New application",
            " (",
            user == null ? void 0 : user.application_count,
            "/",
            user == null ? void 0 : user.subscription.max_applications,
            ")"
          ]
        }
      ) }),
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
          onClick: () => router.visit(route("applications.show", row.original.id)),
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
          children: /* @__PURE__ */ jsx(
            Deferred,
            {
              data: "applications",
              fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-indigo-700", size: 32 }) }),
              children: "No results."
            }
          )
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
function Index({ applications }) {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Applications Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Applications Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "View and manage your releases" })
      ] }),
      /* @__PURE__ */ jsx(ApplicationsTable, { applications })
    ] })
  ] });
}
export {
  Index as default
};
