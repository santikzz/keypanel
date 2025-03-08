import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CREkYVRC.js";
import { ResellerDetails } from "./ResellerDetails-aTARJtKF.js";
import { ResellerBalance } from "./ResellerBalance-DEBXqsS5.js";
import { ResellerApplications } from "./ResellerApplications-DDGzhWkQ.js";
import { Head } from "@inertiajs/react";
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
import "react-hook-form";
import "@hookform/resolvers/zod";
import "zod";
import "./input-DkJ2G5pj.js";
import "./form-Bv0Qu0pG.js";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
import "./switch-Cp3w_Ulq.js";
import "@radix-ui/react-switch";
import "./card-H30tULAN.js";
import "./alert-dialog-CrhIZ7GE.js";
import "@radix-ui/react-alert-dialog";
import "./tabs-DSJtbVSd.js";
import "@radix-ui/react-tabs";
import "./table-DYKmrJXP.js";
import "./dialog-BHzYhrMl.js";
import "@radix-ui/react-collapsible";
import "./select-DpEcowDc.js";
import "@radix-ui/react-select";
function Show({ reseller, applications, resellerApps }) {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reseller Details" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Reseller Details" }) }),
      /* @__PURE__ */ jsx(ResellerDetails, { reseller }),
      /* @__PURE__ */ jsx(ResellerBalance, { reseller }),
      /* @__PURE__ */ jsx(ResellerApplications, { reseller, applications, resellerApps })
    ] })
  ] });
}
export {
  Show as default
};
