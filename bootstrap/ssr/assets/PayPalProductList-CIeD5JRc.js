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
function PayPalProductList({ products }) {
  var _a;
  usePage().props.auth.user;
  const createProductRequestJsonBase = `{
    "name": "KeyCore",
    "description": "KeyCore",
    "type": "SERVICE",
    "category": "SOFTWARE",
    "image_url": "https://example.com/streaming.jpg",
    "home_url": "https://example.com/home"
}`;
  const [createProductRequest, setCreateProductRequest] = useState(createProductRequestJsonBase);
  const [createPending, setCreatePending] = useState(false);
  const handleCreateProduct = () => {
    setCreatePending(true);
    router.post(
      route("paypal.createProduct"),
      JSON.parse(createProductRequest),
      {
        onFinish: () => setCreatePending(false)
      }
    );
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-xl", children: "PayPal Products" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Deferred, { data: "products", fallback: /* @__PURE__ */ jsx("div", { children: "Loading products..." }), children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: (_a = products == null ? void 0 : products.products) == null ? void 0 : _a.map((product, idx) => /* @__PURE__ */ jsxs(Collapsible, { className: "p-2 border rounded-md bg-zinc-900", children: [
      /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex flex-row justify-between w-full items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            "ID: ",
            product == null ? void 0 : product.id
          ] }),
          /* @__PURE__ */ jsxs(Label, { children: [
            "NAME: ",
            product == null ? void 0 : product.name
          ] })
        ] }),
        /* @__PURE__ */ jsx(ChevronDown, {})
      ] }),
      /* @__PURE__ */ jsx(CollapsibleContent, { className: "bg-zinc-950 p-2 border rounded-md mt-2", children: /* @__PURE__ */ jsx(
        CodeEditor,
        {
          "data-color-mode": "dark",
          value: JSON.stringify(product, null, 2),
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
      /* @__PURE__ */ jsx(Label, { className: "mt-4 text-xl", children: "Create new product" }),
      /* @__PURE__ */ jsx(
        CodeEditor,
        {
          "data-color-mode": "dark",
          value: createProductRequest,
          className: " w-full h-56 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800",
          language: "json",
          onChange: (evn) => setCreateProductRequest(evn.target.value),
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
          onClick: handleCreateProduct,
          children: [
            createPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Plus, {}),
            "Create Product"
          ]
        }
      )
    ] })
  ] });
}
export {
  PayPalProductList
};
