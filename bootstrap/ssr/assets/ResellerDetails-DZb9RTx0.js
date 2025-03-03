import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { B as Button, u as useRandomPassword, t as toastDark } from "./button-CmMv2gJh.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { RefreshCcw, Loader2, Trash, Check } from "lucide-react";
import { F as Form, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage, a as FormField, f as FormDescription } from "./form-Bv0Qu0pG.js";
import { S as Switch } from "./switch-Cp3w_Ulq.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-yhsCX6cN.js";
import { usePage, Deferred, router } from "@inertiajs/react";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel } from "./alert-dialog-CrhIZ7GE.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@radix-ui/react-alert-dialog";
const formSchema = z.object({
  password: z.string().min(8).max(64).optional().or(z.literal("")),
  disabled: z.boolean().optional()
});
function ResellerDetails({ reseller }) {
  const user = usePage().props.auth.user;
  const canUpdate = user == null ? void 0 : user.all_permissions.includes("RESELLER_UPDATE");
  const canDelete = user == null ? void 0 : user.all_permissions.includes("RESELLER_DELETE");
  const [isPending, setPending] = useState(false);
  const [isDeletePending, setDeletePending] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = (values) => {
    console.log("test");
    setPending(true);
    router.put(
      route("users.updateReseller", reseller == null ? void 0 : reseller.id),
      values,
      {
        onError: () => {
          toast.error("Error updating reseller", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("Reseller updated", { style: toastDark });
        },
        onFinish: () => setPending(false)
      }
    );
  };
  const handleDelete = () => {
    setDeletePending(true);
    setDeleteOpen(false);
    router.delete(
      route("users.delete", reseller == null ? void 0 : reseller.id),
      {
        onError: () => {
          toast.error("Error deleting user", { style: toastDark });
        },
        onSuccess: () => {
          toast.success("User deleted", { style: toastDark });
        },
        onFinish: () => {
          setDeletePending(false);
        }
      }
    );
  };
  const setRandomPassword = () => {
    const password = useRandomPassword();
    form.setValue("password", password);
  };
  useEffect(() => {
    if (reseller) {
      form.reset({
        disabled: reseller.disabled
      });
    }
  }, [reseller]);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Update details" }) }),
    /* @__PURE__ */ jsx(Deferred, { data: "reseller", fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-indigo-700", size: 32 }) }), children: /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Username" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { value: reseller == null ? void 0 : reseller.name, readOnly: true, disabled: true }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "password",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  className: "pe-9",
                  placeholder: "Change password",
                  ...field,
                  disabled: !canUpdate
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
            /* @__PURE__ */ jsx(FormDescription, { children: "Leave empty to keep the current password" }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "disabled",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-row items-center justify-between rounded-lg border p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Disable account" }),
              /* @__PURE__ */ jsx(FormDescription, { children: "When disabled, the user will not be able to log in" })
            ] }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Switch,
              {
                checked: field.value,
                onCheckedChange: field.onChange,
                disabled: !canUpdate
              }
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs(AlertDialog, { open: deleteOpen, onOpenChange: setDeleteOpen, children: [
          /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              className: "text-red-500/75",
              disabled: isDeletePending || !canDelete,
              children: isDeletePending ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
                "Delete"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Trash, {}),
                "Delete"
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }),
              /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete this account and cannot be undone." })
            ] }),
            /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsx(Button, { className: "btn-danger", onClick: handleDelete, children: "Delete" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "btn-primary",
            disabled: isPending || !canUpdate,
            children: isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
              " Saving changes..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, {}),
              " Save changes"
            ] })
          }
        )
      ] })
    ] }) }) }) })
  ] });
}
export {
  ResellerDetails
};
