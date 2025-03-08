import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card, a as CardHeader, b as CardContent } from "./card-H30tULAN.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { A as Authenticated } from "./AuthenticatedLayout-CREkYVRC.js";
import { Head, Deferred } from "@inertiajs/react";
import "react";
import "./button-CmMv2gJh.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "lucide-react";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "react-hot-toast";
function Index({ plans }) {
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscriptions" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "My Subscriptions" }) }),
    /* @__PURE__ */ jsxs(Card, { className: "", children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-2xl", children: "Available Plans" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx(Deferred, { data: "plans", fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: plans == null ? void 0 : plans.map((plan) => /* @__PURE__ */ jsx("div", { className: "border rounded-md p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xl", children: plan == null ? void 0 : plan.name }),
        /* @__PURE__ */ jsxs(Label, { children: [
          "Apps: ",
          plan == null ? void 0 : plan.max_applications,
          " - Keys: ",
          plan == null ? void 0 : plan.max_keys,
          " - Managers: ",
          plan == null ? void 0 : plan.max_managers,
          " - Resellers: ",
          plan == null ? void 0 : plan.max_resellers
        ] }),
        /* @__PURE__ */ jsxs(Label, { children: [
          "$",
          plan == null ? void 0 : plan.price,
          "/",
          plan == null ? void 0 : plan.billing_interval
        ] })
      ] }) })) }) }) })
    ] })
  ] }) });
}
export {
  Index as default
};
