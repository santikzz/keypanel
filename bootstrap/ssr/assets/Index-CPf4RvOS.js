import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card, a as CardHeader, b as CardContent } from "./card-H30tULAN.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { A as Authenticated } from "./AuthenticatedLayout-DpU-xXnC.js";
import { usePage, Head } from "@inertiajs/react";
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
function Index({ plan }) {
  const user = usePage().props.auth.user;
  console.log(user);
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscriptions" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Billing" }) }),
    /* @__PURE__ */ jsxs(Card, { className: "", children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-2xl", children: "Billing" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        (user == null ? void 0 : user.subscription) ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h2", { children: [
          "Current Plan: ",
          user == null ? void 0 : user.subscription.name
        ] }) }) : /* @__PURE__ */ jsx("a", { href: route("patreon.connect"), children: /* @__PURE__ */ jsx("img", { src: "/patreon-button.png", alt: "Subscribe with Patreon" }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.href = route("patreon.connect"),
            className: "mt-4 bg-orange-600 text-white px-4 py-2 rounded",
            children: "Upgrade with Patreon"
          }
        )
      ] }) })
    ] })
  ] }) });
}
export {
  Index as default
};
