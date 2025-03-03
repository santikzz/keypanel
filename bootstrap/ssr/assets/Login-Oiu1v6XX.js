import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-DiSBWiye.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { B as Button } from "./button-CmMv2gJh.js";
import { C as Card, d as CardContent } from "./card-yhsCX6cN.js";
import { I as Input } from "./input-DkJ2G5pj.js";
import { L as Label } from "./label-p_6QBjcN.js";
import { EyeOffIcon, EyeIcon, Loader2, LogIn } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function Login({
  status,
  canResetPassword
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: ""
    // remember: false as boolean,
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Sign In" }),
    /* @__PURE__ */ jsxs("div", { className: "h-screen items-center justify-center flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx(Card, { className: "overflow-hidden w-[50em]", children: /* @__PURE__ */ jsxs(CardContent, { className: "grid p-0 md:grid-cols-2", children: [
        /* @__PURE__ */ jsx("form", { className: "p-6 md:p-8", onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Welcome back" }),
            /* @__PURE__ */ jsx("p", { className: "text-balance text-muted-foreground", children: "Login to your Acme Inc account" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email or username" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "text",
                placeholder: "m@example.com",
                required: true,
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                tabIndex: 1
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "ml-auto text-sm underline-offset-2 hover:underline",
                  children: "Forgot your password?"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  className: "pe-9",
                  type: isVisible ? "text" : "password",
                  id: "password",
                  name: "password",
                  value: data.password,
                  onChange: (e) => setData("password", e.target.value),
                  tabIndex: 2
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                  type: "button",
                  onClick: toggleVisibility,
                  "aria-label": isVisible ? "Hide password" : "Show password",
                  "aria-pressed": isVisible,
                  "aria-controls": "password",
                  children: isVisible ? /* @__PURE__ */ jsx(EyeOffIcon, { size: 16, "aria-hidden": "true" }) : /* @__PURE__ */ jsx(EyeIcon, { size: 16, "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(InputError, { message: errors.password })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              className: "w-full btn-primary flex items-center",
              disabled: processing,
              children: [
                processing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin mb-0.5" }) : /* @__PURE__ */ jsx(LogIn, { className: "mb-0.5" }),
                "Sign In"
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border", children: /* @__PURE__ */ jsx("span", { className: "relative z-10 bg-background px-2 text-muted-foreground", children: "Or continue with" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full", children: [
              /* @__PURE__ */ jsxs("svg", { role: "img", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ jsx("title", { children: "Discord" }),
                /* @__PURE__ */ jsx("path", { fill: "#d4d4d8", d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Login with Discord" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full", children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
                  fill: "#d4d4d8"
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Login with Google" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full", children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
                  fill: "#d4d4d8"
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Login with Meta" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsx("a", { href: "#", className: "underline underline-offset-4", children: "Sign up" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "relative hidden bg-muted md:block", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/placeholder.svg",
            alt: "Image",
            className: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary", children: [
        "By clicking continue, you agree to our ",
        /* @__PURE__ */ jsx("a", { href: "#", children: "Terms of Service" }),
        " ",
        "and ",
        /* @__PURE__ */ jsx("a", { href: "#", children: "Privacy Policy" }),
        "."
      ] })
    ] })
  ] });
}
export {
  Login as default
};
