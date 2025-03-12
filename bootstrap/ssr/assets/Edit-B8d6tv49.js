import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BDkfhEOo.js";
import { usePage, Head } from "@inertiajs/react";
import DeleteUserForm from "./DeleteUserForm-D1QrXSvX.js";
import UpdatePasswordForm from "./UpdatePasswordForm-BSMjxyQB.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-BumscjlV.js";
import { C as Card } from "./card-H30tULAN.js";
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
import "./InputError-DiSBWiye.js";
import "./InputLabel-CE_n4Upz.js";
import "@headlessui/react";
import "./TextInput-uXC4T8wO.js";
import "./input-DkJ2G5pj.js";
import "./label-p_6QBjcN.js";
import "@radix-ui/react-label";
function Edit({
  mustVerifyEmail,
  status
}) {
  const user = usePage().props.auth.user;
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
      (user == null ? void 0 : user.role) === "owner" && /* @__PURE__ */ jsx(Card, { className: "p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
        UpdateProfileInformation,
        {
          mustVerifyEmail,
          status,
          className: "max-w-xl"
        }
      ) }),
      /* @__PURE__ */ jsx(Card, { className: "p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
      (user == null ? void 0 : user.role) === "owner" && /* @__PURE__ */ jsx(Card, { className: "p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
    ] }) })
  ] });
}
export {
  Edit as default
};
