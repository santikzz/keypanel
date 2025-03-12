import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./button-CmMv2gJh.js";
import { C as Card, a as CardHeader, b as CardContent, e as CardFooter } from "./card-H30tULAN.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { usePage, Deferred, router } from "@inertiajs/react";
import { C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DUtqt5i7.js";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-collapsible";
function PayPalPlanList({ plans }) {
  var _a;
  usePage().props.auth.user;
  const createPlanRequestBase = `{
  "product_id": "PROD-02484232WP582913W",
  "name": "KeyCore Tier 1",
  "description": "KeyCore Tier 1",
  "status": "ACTIVE",
  "billing_cycles": [
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 1,
      "pricing_scheme": {
        "fixed_price": {
          "value": "3",
          "currency_code": "USD"
        }
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "setup_fee_failure_action": "CANCEL",
    "payment_failure_threshold": 3
  }
}`;
  const [createPlanRequest, setCreatePlanRequest] = useState(createPlanRequestBase);
  const [createPending, setCreatePending] = useState(false);
  const handleCreatePlan = () => {
    setCreatePending(true);
    router.post(
      route("paypal.createPlan"),
      JSON.parse(createPlanRequest),
      {
        onFinish: () => setCreatePending(false)
      }
    );
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-xl", children: "PayPal Products" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Deferred, { data: "products", fallback: /* @__PURE__ */ jsx("div", { children: "Loading products..." }), children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: (_a = plans == null ? void 0 : plans.plans) == null ? void 0 : _a.map((plan, idx) => /* @__PURE__ */ jsxs(Collapsible, { className: "p-2 border rounded-md bg-zinc-900", children: [
      /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex flex-row justify-between w-full items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            "ID: ",
            plan == null ? void 0 : plan.id
          ] }),
          /* @__PURE__ */ jsxs(Label, { children: [
            "NAME: ",
            plan == null ? void 0 : plan.name
          ] })
        ] }),
        /* @__PURE__ */ jsx(ChevronDown, {})
      ] }),
      /* @__PURE__ */ jsx(CollapsibleContent, { className: "bg-zinc-950 p-2 border rounded-md mt-2", children: /* @__PURE__ */ jsx(
        CodeEditor,
        {
          "data-color-mode": "dark",
          value: JSON.stringify(plan, null, 2),
          language: "json",
          padding: 15,
          style: {
            backgroundColor: "#09090b",
            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
          }
        }
      ) })
    ] }, idx)) }) }) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "border-t flex-col items-start gap-4", children: [
      /* @__PURE__ */ jsx(Label, { className: "mt-4 text-xl", children: "Create new plan" }),
      /* @__PURE__ */ jsx(
        CodeEditor,
        {
          "data-color-mode": "dark",
          value: createPlanRequest,
          className: " w-full h-84 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800",
          language: "json",
          onChange: (evn) => setCreatePlanRequest(evn.target.value),
          padding: 15,
          style: {
            backgroundColor: "#18181b",
            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
          }
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "btn-primary",
          disabled: createPending,
          onClick: handleCreatePlan,
          children: [
            createPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Plus, {}),
            "Create Plan"
          ]
        }
      )
    ] })
  ] });
}
export {
  PayPalPlanList
};
