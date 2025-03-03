import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, f as FormDescription, e as FormMessage } from "./form-Bv0Qu0pG.js";
import { Loader2, Plus, Check } from "lucide-react";
import { B as Button, t as toastDark } from "./button-CmMv2gJh.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-yhsCX6cN.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DSJtbVSd.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DYKmrJXP.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BHzYhrMl.js";
import { usePage, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import clsx from "clsx";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-tabs";
import "@radix-ui/react-dialog";
const setFromSchema = z.object({
  balance: z.number().min(0).max(1e6).default(0)
});
const addFormSchema = z.object({
  balance: z.number().gt(0).max(1e6)
});
function ResellerBalance({ reseller }) {
  var _a;
  const user = usePage().props.auth.user;
  const canAddBalance = user == null ? void 0 : user.all_permissions.includes("RESELLER_ADD_BALANCE");
  const [addBalanceOpen, setAddBalanceOpen] = useState(false);
  const [isSetPending, setSetPending] = useState(false);
  const [isAddPending, setAddPending] = useState(false);
  const setForm = useForm({
    resolver: zodResolver(setFromSchema)
  });
  const addForm = useForm({
    resolver: zodResolver(addFormSchema)
  });
  const setBalanceSubmit = async (values) => {
    setSetPending(true);
    router.post(route("users.setBalance", reseller == null ? void 0 : reseller.id), values, {
      onError: () => {
        toast.error("Error setting balance", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("Balance set", { style: toastDark });
        setSetPending(false);
      },
      onFinish: () => {
        setSetPending(false);
      }
    });
  };
  const addBalanceSubmit = async (values) => {
    setAddPending(true);
    setAddBalanceOpen(false);
    router.post(route("users.addBalance", reseller == null ? void 0 : reseller.id), values, {
      onError: () => {
        toast.error("Error setting balance", { style: toastDark });
      },
      onSuccess: () => {
        toast.success("Balance set", { style: toastDark });
        setSetPending(false);
      },
      onFinish: () => {
        setAddPending(false);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Card, { className: "mb-8", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Balance Management" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage reseller balance and view transaction history" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium", children: "Current Balance" }),
            /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold", children: [
              "$",
              reseller == null ? void 0 : reseller.balance
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "btn-primary",
              onClick: () => setAddBalanceOpen(true),
              disabled: isAddPending || !canAddBalance,
              children: [
                isAddPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Plus, {}),
                "Add Balance"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "history", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "history", children: "Transaction History" }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "set-balance", children: "Set Balance" })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "history", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Amount" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Balance" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: (_a = reseller == null ? void 0 : reseller.transactions) == null ? void 0 : _a.map((transaction) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-sm", children: transaction.created_at.replace("T", " ").split(".")[0] }),
              /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: transaction.type }),
              /* @__PURE__ */ jsxs(TableCell, { className: clsx(
                "",
                transaction.type === "credit" && "text-green-600",
                transaction.type === "debit" && "text-red-600",
                transaction.type === "set" && "text-indigo-600"
              ), children: [
                transaction.type !== "set" ? transaction.type === "credit" ? "+" : "-" : "",
                "$",
                transaction.amount
              ] }),
              /* @__PURE__ */ jsxs(TableCell, { children: [
                "$",
                transaction.total
              ] })
            ] }, transaction.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "set-balance", children: /* @__PURE__ */ jsx(Form, { ...setForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: setForm.handleSubmit(setBalanceSubmit), className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx(
              FormField,
              {
                control: setForm.control,
                name: "balance",
                render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "New Balance" }),
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
                  /* @__PURE__ */ jsx(FormDescription, { children: "This will set the reseller's balance to the specified amount. To add balance use the 'Add Balance' option instead." }),
                  /* @__PURE__ */ jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsxs(
              Button,
              {
                type: "submit",
                className: "btn-primary",
                disabled: isSetPending || !canAddBalance,
                children: [
                  isSetPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Check, {}),
                  "Set New Balance"
                ]
              }
            ) })
          ] }) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: addBalanceOpen, onOpenChange: setAddBalanceOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Add Balance" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Add funds to the reseller's account balance" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 py-4", children: /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: /* @__PURE__ */ jsx(Form, { ...addForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: addForm.handleSubmit(addBalanceSubmit), className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: addForm.control,
            name: "balance",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Ammount to Add" }),
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
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
          Button,
          {
            type: "submit",
            className: "btn-primary",
            disabled: isAddPending,
            children: [
              isAddPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Plus, {}),
              "Add Balance"
            ]
          }
        ) })
      ] }) }) }) })
    ] }) })
  ] });
}
export {
  ResellerBalance
};
