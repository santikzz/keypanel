import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button, t as toastDark } from "./button-CmMv2gJh.js";
import { C as Card, a as CardHeader, b as CardContent, e as CardFooter } from "./card-H30tULAN.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { usePage, WhenVisible, router } from "@inertiajs/react";
import { C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DUtqt5i7.js";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import toast from "react-hot-toast";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-collapsible";
function TierPlans({ plans }) {
  usePage().props.auth.user;
  const [modifiedPlans, setModifiedPlans] = useState({});
  const [newPlanRequest, setNewPlanRequest] = useState();
  const handleUpdatePlan = (planId) => {
    if (!modifiedPlans[planId]) return;
    try {
      const data = JSON.parse(modifiedPlans[planId]);
      router.put(route("plans.update", { plan: planId }), data, {
        onSuccess: () => {
          toast.success("Plan updated successfully", { style: toastDark });
        },
        onError: () => {
          toast.error("Error updating plan", { style: toastDark });
        }
      });
    } catch (e) {
      console.error("Error parsing JSON", e);
      toast.error("Error parsing JSON", { style: toastDark });
    }
  };
  const handleCreatePlan = () => {
    if (!newPlanRequest) return;
    try {
      const data = JSON.parse(newPlanRequest);
      router.post(route("plans.store"), data, {
        onSuccess: () => {
          toast.success("Plan created successfully", { style: toastDark });
        },
        onError: () => {
          toast.error("Error creating plan", { style: toastDark });
        }
      });
    } catch (e) {
      console.error("Error parsing JSON", e);
      toast.error("Error parsing JSON", { style: toastDark });
    }
  };
  const handleDeletePlan = (planId) => {
    router.delete(route("plans.delete", { plan: planId }), {
      onSuccess: () => {
        toast.success("Plan deleted successfully", { style: toastDark });
      },
      onError: () => {
        toast.error("Error deleting plan", { style: toastDark });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Label, { className: "text-xl", children: "Plans" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(WhenVisible, { data: "plans", fallback: /* @__PURE__ */ jsx("div", { children: "Loading plans..." }), children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      !plans && /* @__PURE__ */ jsx(Label, { className: "text-red-500", children: "No plans found." }),
      plans == null ? void 0 : plans.map((plan, idx) => /* @__PURE__ */ jsxs(Collapsible, { className: "p-2 border rounded-md bg-zinc-900", children: [
        /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex flex-row justify-between w-full items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-start", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "ID: ",
              /* @__PURE__ */ jsx("span", { className: "text-indigo-300", children: plan == null ? void 0 : plan.id })
            ] }),
            /* @__PURE__ */ jsxs(Label, { children: [
              "NAME: ",
              /* @__PURE__ */ jsx("span", { className: "text-indigo-300", children: plan == null ? void 0 : plan.name })
            ] }),
            /* @__PURE__ */ jsxs(Label, { children: [
              "PRICE: ",
              /* @__PURE__ */ jsx("span", { className: "text-indigo-300", children: plan == null ? void 0 : plan.price })
            ] }),
            /* @__PURE__ */ jsxs(Label, { children: [
              "PAYPAL PLAN ID: ",
              /* @__PURE__ */ jsx("span", { className: "text-indigo-300", children: plan == null ? void 0 : plan.paypal_plan_id })
            ] })
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, {})
        ] }),
        /* @__PURE__ */ jsxs(CollapsibleContent, { className: "bg-zinc-950 p-2 border rounded-md mt-2", children: [
          /* @__PURE__ */ jsx(
            CodeEditor,
            {
              "data-color-mode": "dark",
              value: JSON.stringify(plan, null, 2),
              onChange: (e) => setModifiedPlans({ ...modifiedPlans, [plan.id]: e.target.value }),
              language: "json",
              padding: 15,
              style: {
                fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 gap-2 flex flex-row justify-between", children: [
            /* @__PURE__ */ jsx(Button, { className: "btn-success", size: "sm", onClick: () => handleUpdatePlan(plan == null ? void 0 : plan.id), children: "Update" }),
            /* @__PURE__ */ jsx(Button, { className: "btn-danger", size: "sm", onClick: () => handleDeletePlan(plan == null ? void 0 : plan.id), children: "Delete" })
          ] })
        ] })
      ] }, idx))
    ] }) }) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "border-t flex-col items-start gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4 gap-4 flex flex-col flex-1 w-full", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xl", children: "Create new plan" }),
        /* @__PURE__ */ jsx(
          CodeEditor,
          {
            className: "h-80",
            "data-color-mode": "dark",
            value: newPlanRequest,
            onChange: (e) => setNewPlanRequest(e.target.value),
            language: "json",
            padding: 15,
            style: {
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 gap-2 flex flex-row justify-between", children: /* @__PURE__ */ jsx(Button, { className: "btn-success", size: "sm", onClick: handleCreatePlan, children: "Create" }) })
    ] })
  ] });
}
export {
  TierPlans
};
