import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { A as Authenticated } from "./AuthenticatedLayout-DpU-xXnC.js";
import { B as Button, t as toastDark } from "./button-CmMv2gJh.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage, f as FormDescription } from "./form-Bv0Qu0pG.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DpEcowDc.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { Loader2, Plus } from "lucide-react";
import { C as Card, a as CardHeader, b as CardContent } from "./card-H30tULAN.js";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
const formSchema = z.object({
  name: z.string(),
  status: z.string().min(0).default("available"),
  download_url: z.string().optional().nullable()
});
function Create() {
  const [isPending, setPending] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = async (values) => {
    setPending(true);
    router.post(route("applications.store"), values, {
      onError: () => {
        toast.error("Error creating application", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("Application created", { style: toastDark });
      },
      onFinish: () => setPending(false)
    });
  };
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Applications Management" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "View and manage your releases" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Create a new application" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Create a new application to manage your releases" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "App name *" }),
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
              /* @__PURE__ */ jsx(FormLabel, { children: "Status *" }),
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
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "btn-primary",
            disabled: isPending,
            children: isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
              "Creating app..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Plus, {}),
              " Create app"
            ] })
          }
        ) })
      ] }) }) })
    ] })
  ] }) });
}
export {
  Create as default
};
