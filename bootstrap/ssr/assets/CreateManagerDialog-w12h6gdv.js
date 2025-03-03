import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { B as Button, P as PERMISSIONS, p as parsePermission, u as useRandomPassword, t as toastDark } from "./button-CmMv2gJh.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BHzYhrMl.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { Plus, RefreshCcw, Loader2 } from "lucide-react";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-Bv0Qu0pG.js";
import { C as Checkbox } from "./checkbox-DqkbCq-q.js";
import { L as Label } from "./label-p_6QBjcN.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-label";
const formSchema = z.object({
  name: z.string().min(6).max(24).regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  password: z.string().min(8).max(64),
  permissions: z.array(z.string()).optional()
});
function CreateManagerDialog() {
  const user = usePage().props.auth.user;
  const canCreate = user == null ? void 0 : user.all_permissions.includes("MANAGER_CREATE");
  const [open, setOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: []
    }
  });
  const onSubmit = async (values) => {
    setPending(true);
    router.post(
      route("users.storeManager"),
      values,
      {
        onError: () => {
          toast.error("Error creating user", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("User created", { style: toastDark });
          setOpen(false);
        },
        onFinish: () => {
          setPending(false);
        }
      }
    );
  };
  const setRandomPassword = () => {
    const password = useRandomPassword();
    form.setValue("password", password);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        className: "btn-primary hover:bg-indigo-700",
        disabled: !canCreate,
        children: [
          /* @__PURE__ */ jsx(Plus, {}),
          "New manager"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "bg-zinc-950 border border-zinc-900", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Create new manager" }),
        /* @__PURE__ */ jsx(DialogDescription, {})
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Username *" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Enter a username",
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
            name: "password",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Password *" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    className: "pe-9",
                    placeholder: "Enter a password",
                    ...field
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    onClick: setRandomPassword,
                    children: /* @__PURE__ */ jsx(RefreshCcw, { size: 16, strokeWidth: 2, "aria-hidden": "true" })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "permissions",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Label, { children: "Permissions" }),
                /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col space-y-2 rounded-md border p-4", children: [
                  /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: PERMISSIONS.map((permission, idx) => {
                    var _a;
                    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(
                        Checkbox,
                        {
                          checked: ((_a = field.value) == null ? void 0 : _a.includes(permission)) || false,
                          onCheckedChange: (checked) => {
                            const updatedPermissions = checked ? [...field.value || [], permission] : (field.value || []).filter((p) => p !== permission);
                            field.onChange(updatedPermissions);
                          }
                        },
                        idx
                      ),
                      /* @__PURE__ */ jsx(Label, { className: "uppercase text-xs", children: parsePermission(permission) })
                    ] }, idx);
                  }) }) }),
                  /* @__PURE__ */ jsx(FormMessage, {})
                ] })
              ] });
            }
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
              "Creating user..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Plus, {}),
              " Create user"
            ] })
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  CreateManagerDialog
};
