import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Package, ChevronDown, Loader2, Trash, Plus, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-Bv0Qu0pG.js";
import { f as formatDuration, B as Button, d as durationUnits, t as toastDark } from "./button-CmMv2gJh.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-yhsCX6cN.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DYKmrJXP.js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-BHzYhrMl.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { usePage, Deferred, WhenVisible, router } from "@inertiajs/react";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as SelectGroup } from "./select-DpEcowDc.js";
import toast from "react-hot-toast";
import "@radix-ui/react-slot";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const formSchema = z.object({
  name: z.string().max(24),
  duration_unit: z.string(),
  duration_value: z.number().gt(0),
  cost: z.number().gt(0).default(0)
});
function ResellerApplications({ reseller, applications, resellerApps }) {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const user = usePage().props.auth.user;
  const canManageOptions = user == null ? void 0 : user.all_permissions.includes("RESELLER_UPDATE");
  const [assignApplicationOpen, setAssignApplicationOpen] = useState(false);
  const [addTimeOptionOpen, setAddTimeOptionOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedAssignApp, setSelectedAssignApp] = useState(null);
  const [isAssignPending, setAssignPending] = useState(false);
  const [isAddTimePending, setAddTimePending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const onSubmit = async (values) => {
    setAddTimePending(true);
    setAddTimeOptionOpen(false);
    router.post(
      route("resellers.addTimeType"),
      { ...values, reseller_app_id: selectedApp == null ? void 0 : selectedApp.id },
      {
        preserveScroll: true,
        onError: () => {
          toast.error("Error adding time option", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("Time option added", { style: toastDark });
        },
        onFinish: () => {
          setAddTimePending(false);
        }
      }
    );
  };
  const handleDeleteOption = (option) => {
    setDeletePending(true);
    router.delete(
      route("resellers.deleteTimeType", option.id),
      {
        preserveScroll: true,
        onError: () => {
          toast.error("Error deleting time option", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("Time option deleted", { style: toastDark });
        },
        onFinish: () => {
          setDeletePending(false);
        }
      }
    );
  };
  const handleAssignApplication = () => {
    setAssignPending(true);
    setAssignApplicationOpen(false);
    const values = {
      app_id: selectedAssignApp,
      user_id: reseller == null ? void 0 : reseller.id
    };
    router.post(
      route("resellers.addApp"),
      values,
      {
        preserveScroll: true,
        onError: () => {
          toast.error("Error assigning application", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("Application assigned", { style: toastDark });
        },
        onFinish: () => {
          setAssignPending(false);
          setSelectedAssignApp(null);
        }
      }
    );
  };
  const openAddTimeOption = (app) => {
    setSelectedApp(app);
    setAddTimeOptionOpen(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Application Access" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage reseller access to applications and license creation options" })
      ] }),
      /* @__PURE__ */ jsx(
        Deferred,
        {
          data: "resellerApps",
          fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-indigo-600" }) }),
          children: /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: resellerApps == null ? void 0 : resellerApps.map((app) => {
            var _a;
            return /* @__PURE__ */ jsxs(Collapsible, { className: "border rounded-md", children: [
              /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-4 font-medium", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Package, { className: "h-4 w-4 mr-2" }),
                  app.app.name
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 transition-transform duration-200" }) })
              ] }),
              /* @__PURE__ */ jsx(CollapsibleContent, { className: "px-4 pb-4 pt-0 space-y-2", children: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs(Table, { children: [
                  /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
                    /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
                    /* @__PURE__ */ jsx(TableHead, { children: "Duration (days)" }),
                    /* @__PURE__ */ jsx(TableHead, { children: "Cost" }),
                    /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Action" })
                  ] }) }),
                  /* @__PURE__ */ jsx(TableBody, { children: (_a = app.time_types) == null ? void 0 : _a.map((option) => /* @__PURE__ */ jsxs(TableRow, { children: [
                    /* @__PURE__ */ jsx(TableCell, { children: option.name }),
                    /* @__PURE__ */ jsx(TableCell, { children: formatDuration(option.duration) }),
                    /* @__PURE__ */ jsxs(TableCell, { children: [
                      "$",
                      option.cost
                    ] }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => handleDeleteOption(option),
                        disabled: deletePending || !canManageOptions,
                        children: deletePending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsx(Trash, { className: "h-4 w-4 text-rose-600" })
                      }
                    ) })
                  ] }, option.id)) })
                ] }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => openAddTimeOption(app),
                    disabled: isAddTimePending || !canManageOptions,
                    children: [
                      isAddTimePending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
                      "Add Time Option"
                    ]
                  }
                )
              ] }) })
            ] }, app.id);
          }) })
        }
      ),
      /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(
        Button,
        {
          className: "btn-primary",
          onClick: () => setAssignApplicationOpen(true),
          disabled: isAssignPending || !canManageOptions,
          children: [
            isAssignPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsx(Plus, {}),
            "Assign Application"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: addTimeOptionOpen, onOpenChange: setAddTimeOptionOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Add Time Option" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new time option" })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Name *" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "e.g., 1 Month",
                  type: "text",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "duration_unit",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col flex-1 mt-2.5", children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Duration Unit *" }),
              /* @__PURE__ */ jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a time unit" }) }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: durationUnits.map((unit) => /* @__PURE__ */ jsx(SelectItem, { value: unit.value, children: unit.label }, unit.value)) })
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
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex-1", children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Duration Value *" }),
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
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "cost",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Cost *" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    className: "peer ps-6 pe-12",
                    placeholder: "0.00",
                    type: "number",
                    step: "0.01",
                    min: "0.00",
                    ...field,
                    value: (field.value ?? 0).toFixed(2),
                    onChange: (e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50", children: "$" })
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Button, { type: "submit", className: "btn-primary", children: [
          /* @__PURE__ */ jsx(Plus, {}),
          "Confirm"
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: assignApplicationOpen, onOpenChange: setAssignApplicationOpen, children: /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsx(WhenVisible, { data: "applications", fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-indigo-600" }) }), children: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Assign Application" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          "Assign an application to ",
          reseller == null ? void 0 : reseller.name
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Select, { onValueChange: setSelectedAssignApp, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an application" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: /* @__PURE__ */ jsx(SelectGroup, { children: applications == null ? void 0 : applications.filter((app) => !resellerApps.some((ra) => ra.app_id === app.id)).map((app) => /* @__PURE__ */ jsx(SelectItem, { value: app.id, children: app.name }, app.id)) }) })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setAssignApplicationOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "btn-primary",
            onClick: handleAssignApplication,
            disabled: selectedAssignApp === null,
            children: [
              /* @__PURE__ */ jsx(Check, {}),
              "Confirm"
            ]
          }
        )
      ] })
    ] }) }) }) })
  ] });
}
export {
  ResellerApplications
};
