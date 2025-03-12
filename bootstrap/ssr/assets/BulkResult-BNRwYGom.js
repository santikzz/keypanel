import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-DKZMjIQM.js";
import { f as formatDuration, B as Button, c as cn } from "./button-CmMv2gJh.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-DG-ngQKF.js";
import { Textarea } from "@headlessui/react";
import { Download, CheckIcon, CopyIcon } from "lucide-react";
import { Head } from "@inertiajs/react";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "class-variance-authority";
import "clsx";
import "react-hot-toast";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
function Show({ licenses, application }) {
  var _a, _b, _c;
  const [copied, setCopied] = useState(false);
  const licenseList = licenses == null ? void 0 : licenses.map((license) => license == null ? void 0 : license.license_key).join("\n");
  const formattedDate = new Date((_a = licenses[0]) == null ? void 0 : _a.created_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const result = `
######################################################
BULK LICENSE - ${formattedDate}
CREATED ${licenses.length} licenses of ${formatDuration((_b = licenses[0]) == null ? void 0 : _b.duration)}
APPLICATION: '${application == null ? void 0 : application.name}' (ID: ${application == null ? void 0 : application.app_hash_id})
NOTE: ${(_c = licenses[0]) == null ? void 0 : _c.note}
######################################################

${licenseList}
    `;
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const downloadFile = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `licenses_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.txt`;
    link.click();
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Bulk Result" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Bulk Result" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "btn-primary",
            onClick: downloadFile,
            children: [
              /* @__PURE__ */ jsx(Download, {}),
              "Save to file"
            ]
          }
        ),
        /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleCopy,
              "aria-label": copied ? "Copied" : "Copy to clipboard",
              disabled: copied,
              className: "btn-primary relative",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    ),
                    children: /* @__PURE__ */ jsx(CheckIcon, { className: "stroke-emerald-500", size: 16, "aria-hidden": "true" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "absolute transition-all",
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    ),
                    children: /* @__PURE__ */ jsx(CopyIcon, { size: 16, "aria-hidden": "true" })
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(TooltipContent, { className: "px-2 py-1 text-xs", children: "Copy to clipboard" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          value: result,
          readOnly: true,
          className: "w-full bg-zinc-900 border border-zinc-800 rounded resize-none min-h-screen",
          rows: 1,
          onInput: (e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }
        }
      )
    ] })
  ] });
}
export {
  Show as default
};
