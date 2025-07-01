import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BVM_0bbh.js";
import { usePage, Head, Deferred } from "@inertiajs/react";
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
function Subscribe({ checkout }) {
  usePage().props.auth.user;
  const { flash } = usePage().props;
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscriptions" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Checkout" }) }),
    /* @__PURE__ */ jsx(Deferred, { data: "checkout", fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }) })
  ] }) });
}
export {
  Subscribe as default
};
