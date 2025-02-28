// import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { usePage } from "@inertiajs/react";

export const Header = () => {

    // const { user, clearSession } = useAuth();
    // const [, setLocation] = useLocation();
    // const isReseller = user?.role === 'reseller' ? true : false;
    // const { data } = useBalanceMe();

    // const handleLogout = () => {
    //     clearSession();
    //     setLocation('/login');
    // }
    const user = usePage().props.auth.user;

    return (
        <header className="sticky top-0 z-10 border-b border-zinc-900 bg-zinc-950 shadow-sm backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-4">
                <div className="hidden lg:block">
                    {/* <h1 className="text-lg text-gray-300">Store Dashboard</h1> */}
                </div>
                <div className="flex items-center gap-4">
                    {/* <ModeToggle /> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/avatars/01.png" alt="@username" />
                                    <AvatarFallback>
                                        {user?.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
