import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BDkfhEOo.js";
import { usePage, Head } from "@inertiajs/react";
import { PayPalProductList } from "./PayPalProductList-CIeD5JRc.js";
import { PayPalPlanList } from "./PayPalPlanList-Bf7hyi_V.js";
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
function Index({ products, plans }) {
  usePage().props.auth.user;
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscriptions" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "PayPal Settings" }) }),
    /* @__PURE__ */ jsx(PayPalProductList, { products }),
    /* @__PURE__ */ jsx(PayPalPlanList, { plans })
  ] }) });
}
export {
  Index as default
};
