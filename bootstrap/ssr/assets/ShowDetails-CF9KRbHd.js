import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage, Deferred, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { Loader2, Check, CheckIcon, CopyIcon, EyeOffIcon, EyeIcon, RotateCw, Trash, X } from "lucide-react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-yhsCX6cN.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { B as Button, c as cn, t as toastDark } from "./button-CmMv2gJh.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage, f as FormDescription } from "./form-Bv0Qu0pG.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DpEcowDc.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel } from "./alert-dialog-CrhIZ7GE.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
import "@radix-ui/react-label";
import "@radix-ui/react-alert-dialog";
const formSchema = z.object({
  name: z.string(),
  status: z.string().min(0),
  download_url: z.string().optional().nullable()
});
function ShowDetails({ application }) {
  const user = usePage().props.auth.user;
  const [isPending, setPending] = useState(false);
  const [isDeletePending, setDeletePending] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [renewPending, setRenewPending] = useState(false);
  const canUpdate = user == null ? void 0 : user.all_permissions.includes("APPS_UPDATE");
  const canDelete = user == null ? void 0 : user.all_permissions.includes("APPS_DELETE");
  const isOwner = (user == null ? void 0 : user.role) === "owner";
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  useEffect(() => {
    if (application) {
      form.reset({
        name: application == null ? void 0 : application.name,
        status: application == null ? void 0 : application.status,
        download_url: application == null ? void 0 : application.download_url
      });
    }
  }, [application]);
  const handleCopy = (string) => {
    navigator.clipboard.writeText(string);
  };
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const onSubmit = async (values) => {
    setPending(true);
    router.put(route("applications.update", application.id), values, {
      onError: () => {
        toast.error("Error updating application", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("Application updated", { style: toastDark });
      },
      onFinish: () => setPending(false)
    });
  };
  const handleDelete = () => {
    setDeletePending(true);
    router.delete(route("applications.delete", application.id), {
      onError: () => {
        toast.error("Error deleting application", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("Application deleted", { style: toastDark });
      },
      onFinish: () => setDeletePending(false)
    });
  };
  const handleRenewSecret = () => {
    setRenewPending(true);
    router.post(route("applications.renewSecret", application.id), {}, {
      preserveScroll: true,
      onError: () => {
        toast.error("Error renewing application secret", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("Application secret renewed", { style: toastDark });
      },
      onFinish: () => setRenewPending(false)
    });
  };
  const Loading = () => /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center space-x-2 pb-6", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-indigo-600", size: 36 }) });
  const DeleteDialog = () => /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        className: "text-red-900",
        type: "button",
        disabled: isDeletePending || !canDelete,
        children: [
          isDeletePending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Trash, {}),
          "Delete application"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete application?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Are you sure you want to delete this application? This action will delete all asociated licenses and cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxs(AlertDialogCancel, { children: [
          /* @__PURE__ */ jsx(X, {}),
          "Cancel"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "destructive", onClick: handleDelete, children: [
          /* @__PURE__ */ jsx(Trash, {}),
          "Delete"
        ] })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Application details" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage your application details" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Deferred, { data: "application", fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "App name" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Enter your application name",
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
            name: "status",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Status" }),
              /* @__PURE__ */ jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a status" }) }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "available", children: "Available" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "unavailable", children: "Unavailable" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "hidden", children: "Hidden" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "download_url",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Download URL" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "https://example.net/downloads/release.zip",
                  type: "text",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormDescription, { children: "(Optional) Download URL for launchers" }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-2", children: [
          /* @__PURE__ */ jsx(DeleteDialog, {}),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              className: "btn-primary",
              disabled: isPending || !canUpdate,
              children: isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
                "Saving changes..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Check, {}),
                " Save changes"
              ] })
            }
          )
        ] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Application credentials" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage your application credentials" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Deferred, { data: "application", fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Label, { children: "App ID" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: inputRef,
                className: "peer ps-9",
                readOnly: true,
                value: application == null ? void 0 : application.app_hash_id
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleCopy(application == null ? void 0 : application.app_hash_id),
                className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed",
                "aria-label": copied ? "Copied" : "Copy to clipboard",
                disabled: copied,
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "transition-all",
                        copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      ),
                      children: /* @__PURE__ */ jsx(CheckIcon, { className: "stroke-emerald-500", size: 16, "aria-hidden": "true" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "absolute transition-all",
                        copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                      ),
                      children: /* @__PURE__ */ jsx(CopyIcon, { size: 16, "aria-hidden": "true" })
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Label, { children: "App Secret" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  readOnly: true,
                  value: application == null ? void 0 : application.app_secret,
                  className: "pe-9 peer ps-9",
                  type: isVisible ? "text" : "password"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleCopy(application == null ? void 0 : application.app_secret),
                  className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed",
                  "aria-label": copied ? "Copied" : "Copy to clipboard",
                  disabled: copied,
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "transition-all",
                          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        ),
                        children: /* @__PURE__ */ jsx(CheckIcon, { className: "stroke-emerald-500", size: 16, "aria-hidden": "true" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "absolute transition-all",
                          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                        ),
                        children: /* @__PURE__ */ jsx(CopyIcon, { size: 16, "aria-hidden": "true" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                  type: "button",
                  onClick: toggleVisibility,
                  "aria-label": isVisible ? "Hide password" : "Show password",
                  "aria-pressed": isVisible,
                  "aria-controls": "password",
                  children: isVisible ? /* @__PURE__ */ jsx(EyeOffIcon, { size: 16, "aria-hidden": "true" }) : /* @__PURE__ */ jsx(EyeIcon, { size: 16, "aria-hidden": "true" })
                }
              )
            ] }),
            isOwner && /* @__PURE__ */ jsxs(
              Button,
              {
                className: "btn-primary",
                disabled: !canUpdate || renewPending,
                onClick: handleRenewSecret,
                children: [
                  renewPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(RotateCw, { size: 16, "aria-hidden": "true" }),
                  "Renew"
                ]
              }
            )
          ] })
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  ShowDetails as default
};
