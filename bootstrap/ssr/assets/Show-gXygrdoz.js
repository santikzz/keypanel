import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, router, Head, Deferred, Link } from "@inertiajs/react";
import toast from "react-hot-toast";
import { A as Authenticated } from "./AuthenticatedLayout-BDkfhEOo.js";
import { C as Card, a as CardHeader, c as CardTitle, d as CardDescription, b as CardContent, e as CardFooter } from "./card-H30tULAN.js";
import { Loader2, Clock, Calendar, Clock1, Check, LayoutGrid, UserRound, CheckCircle, Copy, ClockAlert, Infinity, HardDrive, StickyNote, RotateCcw, Trash2, CircleHelp, Ban, CircleDashed } from "lucide-react";
import { d as durationUnits, B as Button, t as toastDark, f as formatDuration } from "./button-CmMv2gJh.js";
import { B as Badge } from "./badge-DkVXOvzh.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DYKmrJXP.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DpEcowDc.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-BHzYhrMl.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-Bv0Qu0pG.js";
import clsx from "clsx";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "@radix-ui/react-select";
import "@radix-ui/react-label";
const formSchema = z.object({
  duration_unit: z.string(),
  duration_value: z.number().min(1)
});
function AddTimeDialog({ license }) {
  const user = usePage().props.auth.user;
  const canAddTime = user == null ? void 0 : user.all_permissions.includes("KEYS_ADD_TIME");
  const [open, setOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  const [valueDisabled, setValueDisabled] = useState(false);
  const localDurationUnits = durationUnits.filter((unit) => unit.value !== "lifetime");
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = async (values) => {
    setOpen(false);
    setPending(true);
    router.post(
      route("licenses.addtime", license == null ? void 0 : license.id),
      values,
      {
        onError: () => {
          toast.error("Error updating license", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("License time updated", { style: toastDark });
        },
        onFinish: () => setPending(false)
      }
    );
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        size: "sm",
        className: "btn-primary flex items-center gap-1",
        disabled: isPending || !canAddTime,
        children: [
          isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
          "Add Time"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Add Time to License" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Extend the duration of this license key." })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "duration_unit",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col flex-1 mt-2.5", children: [
              /* @__PURE__ */ jsxs(FormLabel, { children: [
                /* @__PURE__ */ jsx(Calendar, { className: "inline mb-0.5 mr-1", size: 14 }),
                "Duration Unit *"
              ] }),
              /* @__PURE__ */ jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a time unit" }) }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: localDurationUnits.map((unit) => /* @__PURE__ */ jsx(SelectItem, { value: unit.value, children: unit.label }, unit.value)) })
              ] }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "duration_value",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: clsx("flex-1", valueDisabled ? "hidden" : "block"), children: [
              /* @__PURE__ */ jsxs(FormLabel, { children: [
                /* @__PURE__ */ jsx(Clock1, { className: "inline mb-0.5 mr-1", size: 14 }),
                "Duration Value *"
              ] }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Enter a duration value",
                  type: "number",
                  ...field,
                  onChange: (e) => field.onChange(Number(e.target.value) || 0)
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
          Button,
          {
            type: "submit",
            className: "btn-primary",
            children: [
              /* @__PURE__ */ jsx(Check, {}),
              " Add time"
            ]
          }
        ) })
      ] }) })
    ] })
  ] });
}
function Show({ license }) {
  const user = usePage().props.auth.user;
  const canUpdate = user == null ? void 0 : user.all_permissions.includes("KEYS_CREATE");
  const canDelete = user == null ? void 0 : user.all_permissions.includes("KEYS_DELETE");
  const canResetHwid = user == null ? void 0 : user.all_permissions.includes("KEYS_RESET_HWID");
  const [copied, setCopied] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState("active");
  const [showAddTimeDialog, setShowAddTimeDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [savePending, setSavePending] = useState(false);
  const [resetPending, setResetPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const activityLog = [
    // { id: 1, date: "2023-10-15 14:30:22", action: "License created", user: "John Doe", ip: "192.168.1.1" },
    // { id: 2, date: "2023-11-02 09:15:43", action: "License activated", user: "Customer", ip: "203.0.113.45" },
    // { id: 3, date: "2023-12-10 16:22:10", action: "HWID updated", user: "Customer", ip: "203.0.113.45" },
    // { id: 4, date: "2024-01-05 11:05:37", action: "Login attempt", user: "Customer", ip: "203.0.113.45" },
  ];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(license == null ? void 0 : license.license_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleSaveStatus = () => {
    setSavePending(true);
    router.put(
      route("licenses.update", license == null ? void 0 : license.id),
      { status: licenseStatus },
      {
        onError: () => {
          toast.error("Error updating license status", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("License status updated", { style: toastDark });
        },
        onFinish: () => setSavePending(false)
      }
    );
  };
  const handleResetHwid = () => {
    setShowResetDialog(false);
    setResetPending(true);
    router.post(
      route("licenses.resethwid", license == null ? void 0 : license.id),
      { hwid: "RESET" },
      {
        onError: () => {
          toast.error("Error resetting HWID", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("HWID reseted", { style: toastDark });
        },
        onFinish: () => setResetPending(false)
      }
    );
  };
  const handleDelete = () => {
    setShowDeleteDialog(false);
    setDeletePending(true);
    router.delete(route("licenses.delete", license == null ? void 0 : license.id), {
      onError: () => {
        toast.error("Error deleting license", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("License deleted", { style: toastDark });
      },
      onFinish: () => setDeletePending(false)
    });
  };
  useEffect(() => {
    setSaveEnabled(licenseStatus !== (license == null ? void 0 : license.status));
  }, [licenseStatus]);
  const getStatusBadge = (status) => {
    switch (status) {
      case "unused":
        return /* @__PURE__ */ jsxs(Badge, { className: "text-sm badge-primary", children: [
          /* @__PURE__ */ jsx(CircleDashed, { size: 14, className: "mr-1" }),
          "Unused"
        ] });
      case "active":
        return /* @__PURE__ */ jsxs(Badge, { className: "text-sm badge-success", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 14, className: "mr-1" }),
          "Active"
        ] });
      case "expired":
        return /* @__PURE__ */ jsxs(Badge, { className: "text-sm badge-danger", children: [
          /* @__PURE__ */ jsx(ClockAlert, { size: 14, className: "mr-1" }),
          "Expired"
        ] });
      case "revoked":
        return /* @__PURE__ */ jsxs(Badge, { className: "text-sm badge-danger", children: [
          /* @__PURE__ */ jsx(Ban, { size: 14, className: "mr-1" }),
          "Revoked"
        ] });
      default:
        return /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(CircleHelp, { size: 14, className: "mr-1" }),
          "Unknown"
        ] });
    }
  };
  const formattedDate = new Date(license == null ? void 0 : license.created_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "License Details" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "License Details" }) }),
      /* @__PURE__ */ jsx(Card, { className: "mb-8", children: /* @__PURE__ */ jsx(Deferred, { data: "license", fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-indigo-700", size: 32 }) }), children: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-xl", children: [
              /* @__PURE__ */ jsx(LayoutGrid, { className: "inline mb-1 mr-1", size: 22 }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  className: "hover:underline hover:text-indigo-700",
                  href: (license == null ? void 0 : license.application) && route("applications.show", license == null ? void 0 : license.application.id),
                  children: license == null ? void 0 : license.application.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              /* @__PURE__ */ jsx(UserRound, { className: "inline mb-1 mr-0.5", size: 14 }),
              "Created by",
              " ",
              /* @__PURE__ */ jsx(
                Link,
                {
                  className: "hover:underline hover:text-indigo-700",
                  href: (license == null ? void 0 : license.issuer) && route("applications.show", license == null ? void 0 : license.issuer.id),
                  children: license == null ? void 0 : license.issuer.name
                }
              ),
              " on ",
              formattedDate
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: getStatusBadge(license == null ? void 0 : license.status) })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium mb-2", children: "License Key" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Input, { value: license == null ? void 0 : license.license_key, readOnly: true, className: "font-mono bg-muted" }),
              /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", onClick: copyToClipboard, className: "shrink-0", children: [
                copied ? /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Copy license key" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { className: "badge-primary aspect-square p-1.5", children: /* @__PURE__ */ jsx(Clock1, { size: 16 }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Duration" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "ml-9 capitalize", children: formatDuration(license == null ? void 0 : license.duration, license == null ? void 0 : license.lifetime) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { className: "badge-primary aspect-square p-1.5", children: /* @__PURE__ */ jsx(ClockAlert, { size: 16 }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Time Left" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "ml-9", children: (license == null ? void 0 : license.status) === "unused" || (license == null ? void 0 : license.status) === "expired" || (license == null ? void 0 : license.status) === "revoked" ? "N/A" : (license == null ? void 0 : license.lifetime) ? /* @__PURE__ */ jsx(Infinity, {}) : `~ ${formatDuration(license == null ? void 0 : license.time_left)}` })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { className: "badge-primary aspect-square p-1.5", children: /* @__PURE__ */ jsx(HardDrive, { size: 16 }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "HWID" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "ml-9", children: (license == null ? void 0 : license.hwid) === null ? "N/A" : (license == null ? void 0 : license.hwid) === "RESET" ? /* @__PURE__ */ jsx(Label, { className: "text-rose-600", children: "Pending Reset" }) : license == null ? void 0 : license.hwid })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { className: "badge-primary aspect-square p-1.5", children: /* @__PURE__ */ jsx(StickyNote, { size: 16 }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Note" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "ml-9", children: license == null ? void 0 : license.note })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col sm:flex-row gap-3 border-t pt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2", children: [
            /* @__PURE__ */ jsxs(Select, { value: licenseStatus, onValueChange: setLicenseStatus, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Change status" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "active", children: "Active" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "expired", children: "Expired" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "revoked", children: "Revoked" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                className: "aspect-square btn-primary size-9",
                onClick: handleSaveStatus,
                disabled: !saveEnabled || savePending || !canUpdate,
                children: savePending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Check, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 w-full sm:w-auto sm:ml-auto", children: [
            /* @__PURE__ */ jsxs(Dialog, { open: showResetDialog, onOpenChange: setShowResetDialog, children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  className: "btn-primary flex items-center gap-1",
                  disabled: resetPending || (license == null ? void 0 : license.hwid) === "RESET" || (license == null ? void 0 : license.hwid) === null || !canResetHwid,
                  children: [
                    resetPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }),
                    "Reset HWID"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsxs(DialogHeader, { children: [
                  /* @__PURE__ */ jsx(DialogTitle, { children: "Reset Hardware ID" }),
                  /* @__PURE__ */ jsx(DialogDescription, { children: "Are you sure you want to reset the HWID for this license key?" })
                ] }),
                /* @__PURE__ */ jsxs(DialogFooter, { children: [
                  /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowResetDialog(false), children: "Cancel" }),
                  /* @__PURE__ */ jsx(Button, { className: "btn-primary", onClick: handleResetHwid, children: "Reset" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(AddTimeDialog, { license }),
            /* @__PURE__ */ jsxs(Dialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  className: "btn-danger flex items-center gap-1",
                  disabled: deletePending || !canDelete,
                  children: [
                    deletePending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
                    "Delete"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsxs(DialogHeader, { children: [
                  /* @__PURE__ */ jsx(DialogTitle, { children: "Delete License Key" }),
                  /* @__PURE__ */ jsx(DialogDescription, { children: "This will permanently delete the license, This action cannot be undone." })
                ] }),
                /* @__PURE__ */ jsxs(DialogFooter, { children: [
                  /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowDeleteDialog(false), children: "Cancel" }),
                  /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: handleDelete, children: "Delete" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Activity Log" }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Date & Time" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Action" }),
            /* @__PURE__ */ jsx(TableHead, { children: "User" }),
            /* @__PURE__ */ jsx(TableHead, { children: "IP Address" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: activityLog.map((log) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-sm", children: log.date }),
            /* @__PURE__ */ jsx(TableCell, { children: log.action }),
            /* @__PURE__ */ jsx(TableCell, { children: log.user }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-sm", children: log.ip })
          ] }, log.id)) })
        ] }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "border-t p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Showing 4 of 4 entries" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: true, children: "Previous" }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: true, children: "Next" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
