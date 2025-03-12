import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DKZMjIQM.js";
import { usePage, Head } from "@inertiajs/react";
import { PayPalProductList } from "./PayPalProductList-CIOybe3i.js";
import { PayPalPlanList } from "./PayPalPlanList-C6WhANMx.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DSJtbVSd.js";
import { TierPlans } from "./TierPlans-DiNhF8lg.js";
import "react";
import "@radix-ui/react-avatar";
import "./button-CmMv2gJh.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "lucide-react";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "react-hot-toast";
import "./card-H30tULAN.js";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "./collapsible-DUtqt5i7.js";
import "@radix-ui/react-collapsible";
import "@uiw/react-textarea-code-editor";
import "@radix-ui/react-tabs";
function Index({ pp_products, pp_plans, plans }) {
  usePage().props.auth.user;
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscriptions" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "PayPal Settings" }) }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "paypal", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "paypal", children: "PayPal Settings" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "tiers", children: "Tier Plans" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "none", children: "Empty" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "paypal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(PayPalProductList, { pp_products }),
        /* @__PURE__ */ jsx(PayPalPlanList, { pp_plans })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "tiers", children: /* @__PURE__ */ jsx(TierPlans, { plans }) })
    ] })
  ] }) });
}
export {
  Index as default
};
