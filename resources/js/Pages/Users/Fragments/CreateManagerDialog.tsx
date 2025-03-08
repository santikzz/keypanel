// @ts-ignore
// @ts-nocheck

import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Loader2, Plus, RefreshCcw } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { parsePermission, PERMISSIONS, toastDark, useRandomPassword } from "@/lib/utils"

const formSchema = z.object({
    name: z.string().min(6).max(24).regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
    password: z.string().min(8).max(64),
    permissions: z.array(z.string()).optional(),
});

export function CreateManagerDialog() {

    const user = usePage().props.auth.user;
    const canCreate = user?.all_permissions.includes('MANAGER_CREATE');
    const reachedLimit = user?.managers_count >= user?.subscription.max_managers;

    const [open, setOpen] = useState(false)
    const [isPending, setPending] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            permissions: [],
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        router.post(route('users.storeManager'), values,
            {
                onError: () => {
                    toast.error('Error creating user', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('User created', { style: toastDark })
                    setOpen(false);
                },
                onFinish: () => { setPending(false) }
            }
        )
    }

    const setRandomPassword = () => {
        const password = useRandomPassword();
        form.setValue("password", password);
    }

    console.log(user);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="btn-primary hover:bg-indigo-700"
                    disabled={!canCreate || reachedLimit}
                >
                    <Plus />
                    New manager
                    {' ('}{user?.managers_count}/{user?.subscription.max_managers}{')'}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border border-zinc-900">
                <DialogHeader>
                    <DialogTitle>Create new manager</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a username"
                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="pe-9"
                                                placeholder="Enter a password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                onClick={setRandomPassword}
                                            >
                                                <RefreshCcw size={16} strokeWidth={2} aria-hidden="true" />
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="permissions"
                            render={({ field }) => {
                                return (
                                    <>
                                        <Label>Permissions</Label>
                                        <FormItem className="flex flex-col space-y-2 rounded-md border p-4">
                                            <FormControl>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {PERMISSIONS.map((permission, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <Checkbox
                                                                key={idx}
                                                                checked={field.value?.includes(permission) || false}
                                                                onCheckedChange={(checked) => {
                                                                    const updatedPermissions = checked
                                                                        ? [...(field.value || []), permission]
                                                                        : (field.value || []).filter((p) => p !== permission);
                                                                    field.onChange(updatedPermissions);
                                                                }}
                                                            />
                                                            <Label className="uppercase text-xs">{parsePermission(permission)}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                );
                            }}
                        />

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="btn-primary"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <><Loader2 className="animate-spin" />Creating user...</>
                                ) : (
                                    <><Plus /> Create user</>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}