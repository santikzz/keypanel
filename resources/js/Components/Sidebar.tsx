// @ts-ignore
// @ts-nocheck

import { Home, Menu, Package, KeyRound, Users, UserCog, CreditCard, HardDrive } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Link, usePage } from "@inertiajs/react"
import clsx from "clsx"

const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", role: ["owner", "manager", "reseller"] },
    { icon: Package, label: "Applications", href: "/applications", role: ["owner", "manager"] },
    { icon: KeyRound, label: "Licenses", href: "/licenses", role: ["owner", "manager", "reseller"] },
    { icon: Users, label: "Users", href: "/users", role: ["owner"] },
    { icon: CreditCard, label: "Billing", href: "/billing", role: ["owner"] },
    { icon: HardDrive, label: "HWID Blacklist", href: "/blacklist", role: ["owner", "manager", "reseller"] },
    { icon: UserCog, label: "Profile", href: "/profile", role: ["owner", "manager", "reseller"] },
    { icon: UserCog, label: "PayPal", href: "/paypal", role: ["owner"] },
]

export const Sidebar = () => {

    const { url } = usePage();
    const user = usePage().props.auth.user;
    // console.log(user);

    const SidebarContent = (
        <ScrollArea className="h-full py-6">
            <h2 className="mb-6 px-6 text-lg font-semibold tracking-tight text-gray-100">Store Dashboard</h2>
            {/* <div className="mb-6 px-6">
                <img
                    src="/placeholder.svg?height=60&width=240"
                    alt="Business Logo"
                    width={240}
                    height={60}
                    className="w-full"
                />
            </div> */}
            <nav className="space-y-2 px-3">
                {menuItems.map((item) => {
                    if (item.role.includes(user?.role)) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx('flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-gray-100',
                                    url === item.href && "bg-indigo-950/75 border border-indigo-900/75 text-indigo-400"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    }
                })}
            </nav>
        </ScrollArea>
    )

    return (
        <>
            <aside className="hidden w-64 bg-zinc-950 border-r border-zinc-900 lg:block">{SidebarContent}</aside>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 lg:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    {SidebarContent}
                </SheetContent>
            </Sheet>
        </>
    )
}

