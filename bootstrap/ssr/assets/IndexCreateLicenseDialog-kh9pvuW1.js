import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { usePage, Deferred, router } from "@inertiajs/react";
import { B as Button, d as durationUnits, c as cn, t as toastDark } from "./button-CmMv2gJh.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BHzYhrMl.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { Plus, Tag, Calendar, Clock1, StickyNote, Layers, Loader2 } from "lucide-react";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage, f as FormDescription } from "./form-Bv0Qu0pG.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DpEcowDc.js";
import { S as Switch } from "./switch-Cp3w_Ulq.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-switch";
const formSchema = z.object({
  app_id: z.string(),
  duration_unit: z.string(),
  duration_value: z.number().min(1),
  note: z.string(),
  bulk_amount: z.number().min(1).max(256).default(1)
});
function IndexCreateLicenseDialog({ applications }) {
  const user = usePage().props.auth.user;
  const canCreate = user == null ? void 0 : user.all_permissions.includes("KEYS_CREATE");
  const [open, isOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  const [isBulk, setBulk] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = async (values) => {
    setPending(true);
    const _values = {
      ...values,
      is_bulk: isBulk
    };
    router.post(
      route("licenses.store"),
      _values,
      {
        onError: () => {
          toast.error("Error creating license", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("License created", { style: toastDark });
        },
        onFinish: () => setPending(false)
      }
    );
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Deferred, { data: "applications", fallback: /* @__PURE__ */ jsxs(Button, { className: "btn-primary", disabled: true, children: [
    " ",
    /* @__PURE__ */ jsx(Plus, {}),
    "New license"
  ] }), children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: isOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        className: "btn-primary",
        disabled: !canCreate,
        children: [
          /* @__PURE__ */ jsx(Plus, {}),
          "New license"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "bg-zinc-950 border border-zinc-900", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Create new license" }),
        /* @__PURE__ */ jsx(DialogDescription, {})
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "app_id",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxs(FormLabel, { children: [
                /* @__PURE__ */ jsx(Tag, { className: "inline mr-0.5", size: 14 }),
                "Application *"
              ] }),
              /* @__PURE__ */ jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an application" }) }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: applications.map((app) => /* @__PURE__ */ jsx(SelectItem, { value: app == null ? void 0 : app.id, children: app == null ? void 0 : app.name }, app == null ? void 0 : app.id)) })
              ] }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
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
          )
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "note",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxs(FormLabel, { children: [
                /* @__PURE__ */ jsx(StickyNote, { className: "inline mb-0.5 mr-1", size: 14 }),
                "Note"
              ] }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Frank's license",
                  type: "text",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormDescription, { children: "Add a note to better identify this license" }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-row items-center justify-between rounded-lg border p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Bulk create" }),
            /* @__PURE__ */ jsx(FormDescription, { children: "Create multiple licenses at once" })
          ] }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Switch,
            {
              checked: isBulk,
              onCheckedChange: setBulk
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "bulk_amount",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: cn(
              "flex-1",
              isBulk ? "block" : "hidden"
            ), children: [
              /* @__PURE__ */ jsxs(FormLabel, { children: [
                /* @__PURE__ */ jsx(Layers, { className: "inline mb-0.5 mr-1", size: 14 }),
                "Bulk Amount *"
              ] }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "How many licenses you want to create?",
                  type: "number",
                  ...field,
                  onChange: (e) => field.onChange(Number(e.target.value) || 0)
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "btn-primary",
            disabled: isPending,
            children: isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
              "Creating license..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Plus, {}),
              " Create license"
            ] })
          }
        ) })
      ] }) })
    ] })
  ] }) }) });
}
export {
  IndexCreateLicenseDialog
};
