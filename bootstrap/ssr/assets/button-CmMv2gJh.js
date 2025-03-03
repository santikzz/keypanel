import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const toastDark = { background: "#09090b", color: "#ffffff", border: "#18181b" };
const formatDuration = (seconds, isLifetime = false) => {
  if (isLifetime) return "lifetime";
  if (seconds < 60) return `${seconds} seconds`;
  const units = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "week", value: 60 * 60 * 24 * 7 },
    { label: "day", value: 60 * 60 * 24 },
    { label: "hour", value: 60 * 60 },
    { label: "minute", value: 60 }
  ];
  for (const { label, value } of units) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) return `${amount} ${label}${amount > 1 ? "s" : ""}`;
  }
  return seconds + " seconds";
};
const durationUnits = [
  {
    label: "Hours",
    value: "hours"
  },
  {
    label: "Days",
    value: "days"
  },
  {
    label: "Weeks",
    value: "weeks"
  },
  {
    label: "Months",
    value: "months"
  },
  {
    label: "Years",
    value: "years"
  },
  {
    label: "Lifetime",
    value: "lifetime"
  }
];
const useRandomPassword = (length = 16) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()=+";
  const randomPassword = Array.from(
    crypto.getRandomValues(new Uint32Array(length)),
    (x) => chars[x % chars.length]
  ).join("");
  return randomPassword;
};
const parsePermission = (string) => {
  return string.replace(/_/g, " ");
};
const PERMISSIONS = [
  "APPS_CREATE",
  "APPS_READ",
  "APPS_UPDATE",
  "APPS_DELETE",
  "KEYS_CREATE",
  "KEYS_READ",
  "KEYS_UPDATE",
  "KEYS_DELETE",
  "KEYS_RESET_HWID",
  "KEYS_ADD_TIME",
  "RESELLER_CREATE",
  "RESELLER_READ",
  "RESELLER_UPDATE",
  "RESELLER_DELETE",
  "RESELLER_ADD_BALANCE",
  "MANAGER_CREATE",
  "MANAGER_READ",
  "MANAGER_UPDATE",
  "MANAGER_DELETE"
];
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
export {
  Button as B,
  PERMISSIONS as P,
  buttonVariants as b,
  cn as c,
  durationUnits as d,
  formatDuration as f,
  parsePermission as p,
  toastDark as t,
  useRandomPassword as u
};
