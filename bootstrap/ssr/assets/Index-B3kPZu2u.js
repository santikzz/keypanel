import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button } from "./button-CmMv2gJh.js";
import { C as Card, a as CardHeader, b as CardContent, e as CardFooter } from "./card-H30tULAN.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { A as Authenticated } from "./AuthenticatedLayout-BVM_0bbh.js";
import { usePage, Head, Deferred, router } from "@inertiajs/react";
import "react";
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
  const user = usePage().props.auth.user;
  const { flash } = usePage().props;
  const handleSubscribe = (paddlePriceId) => {
    router.get(route("paddle.checkout"), { paddlePriceId });
  };
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscriptions" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Plans" }) }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-2xl", children: "Billing" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          "Current Plan: ",
          user == null ? void 0 : user.subscription.name
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          user == null ? void 0 : user.subscription.price,
          " - ",
          user == null ? void 0 : user.subscription.interval_count,
          " ",
          user == null ? void 0 : user.subscription.billing_interval
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Deferred, { data: "plans", fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: plans == null ? void 0 : plans.map((plan) => /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-xl", children: plan == null ? void 0 : plan.name }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Apps: ",
          plan == null ? void 0 : plan.max_applications,
          " - Keys: ",
          plan == null ? void 0 : plan.max_licenses,
          " - Managers: ",
          plan == null ? void 0 : plan.max_managers,
          " - Resellers: ",
          plan == null ? void 0 : plan.max_resellers
        ] }),
        /* @__PURE__ */ jsxs(Label, { children: [
          "$",
          plan == null ? void 0 : plan.price,
          " - ",
          plan == null ? void 0 : plan.interval_count,
          " ",
          plan == null ? void 0 : plan.billing_interval
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: () => handleSubscribe(plan == null ? void 0 : plan.paddle_price_id), className: "btn-primary", children: "Subscribe" }) })
    ] })) }) })
  ] }) });
}
export {
  Index as default
};
