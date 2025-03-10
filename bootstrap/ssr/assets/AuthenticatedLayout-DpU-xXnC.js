import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { c as cn, B as Button } from "./button-CmMv2gJh.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Check, Circle, X, Home, Package, KeyRound, Users, CreditCard, HardDrive, UserCog, Menu } from "lucide-react";
import { usePage, router, Link } from "@inertiajs/react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Header = () => {
  const user = usePage().props.auth.user;
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-10 border-b border-zinc-900 bg-zinc-950 shadow-sm backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block" }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: /* @__PURE__ */ jsxs(Avatar, { className: "h-10 w-10", children: [
        /* @__PURE__ */ jsx(AvatarImage, { src: "/avatars/01.png", alt: "@username" }),
        /* @__PURE__ */ jsx(AvatarFallback, { children: user == null ? void 0 : user.name.charAt(0).toUpperCase() })
      ] }) }) }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [
        /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-none", children: user == null ? void 0 : user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs leading-none text-muted-foreground", children: user == null ? void 0 : user.email })
        ] }) }),
        /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => router.post("/logout"), children: "Log out" })
      ] })
    ] }) })
  ] }) });
};
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", role: ["owner", "manager", "reseller"] },
  { icon: Package, label: "Applications", href: "/applications", role: ["owner", "manager"] },
  { icon: KeyRound, label: "Licenses", href: "/licenses", role: ["owner", "manager", "reseller"] },
  { icon: Users, label: "Users", href: "/users", role: ["owner"] },
  { icon: CreditCard, label: "Billing", href: "/billing", role: ["owner"] },
  { icon: HardDrive, label: "HWID Blacklist", href: "/blacklist", role: ["owner", "manager", "reseller"] },
  { icon: UserCog, label: "Profile", href: "/profile", role: ["owner", "manager", "reseller"] }
];
const Sidebar = () => {
  const { url } = usePage();
  const user = usePage().props.auth.user;
  console.log(user);
  const SidebarContent = /* @__PURE__ */ jsxs(ScrollArea, { className: "h-full py-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-6 px-6 text-lg font-semibold tracking-tight text-gray-100", children: "Store Dashboard" }),
    /* @__PURE__ */ jsx("nav", { className: "space-y-2 px-3", children: menuItems.map((item) => {
      if (item.role.includes(user == null ? void 0 : user.role)) {
        return /* @__PURE__ */ jsxs(
          Link,
          {
            href: item.href,
            className: clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-gray-100",
              url === item.href && "bg-indigo-950/75 border border-indigo-900/75 text-indigo-400"
            ),
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
              item.label
            ]
          },
          item.href
        );
      }
    }) })
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("aside", { className: "hidden w-64 bg-zinc-950 border-r border-zinc-900 lg:block", children: SidebarContent }),
    /* @__PURE__ */ jsxs(Sheet, { children: [
      /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", className: "fixed left-4 top-4 z-40 lg:hidden", children: /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "w-64 p-0", children: SidebarContent })
    ] })
  ] });
};
function Authenticated({
  header,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-black", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-right" }),
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-x-hidden overflow-y-auto bg-black", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-8", children }) })
    ] })
  ] });
}
export {
  Authenticated as A
};
