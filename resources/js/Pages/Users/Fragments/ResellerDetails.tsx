import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Check, Loader2, RefreshCcw, Trash } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Switch } from "@/Components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/Components/ui/card"
import { toastDark, useRandomPassword } from "@/lib/utils"
import { Deferred, Head, router } from '@inertiajs/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

const formSchema = z.object({
    password: z.string().min(8).max(64).optional().or(z.literal("")),
    disabled: z.boolean().optional(),
});

export function ResellerDetails({ reseller }: { reseller: object }) {

    const [isPending, setPending] = useState(false);
    const [isDeletePending, setDeletePending] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('test');
        setPending(true);
        router.put(route('users.updateReseller', reseller?.id), values,
            {
                onError: () => {
                    toast.error('Error updating reseller', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('Reseller updated', { style: toastDark })
                },
                onFinish: () => setPending(false)
            }
        )
    }

    const handleDelete = () => {
        setDeletePending(true);
        setDeleteOpen(false);
        router.delete(route('users.delete', reseller?.id),
            {
                onError: () => {
                    toast.error('Error deleting user', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('User deleted', { style: toastDark })
                },
                onFinish: () => {
                    setDeletePending(false)
                }
            }
        );
    }

    const setRandomPassword = () => {
        const password = useRandomPassword();
        form.setValue("password", password);
    }

    useEffect(() => {
        if (reseller) {
            form.reset({
                disabled: reseller.disabled,
            });
        }
    }, [reseller]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Update details</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <Deferred data="reseller" fallback={
                <div className='flex items-center justify-center py-12'>
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-700" size={32} />
                </div>
            }>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input value={reseller?.name} readOnly disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className="pe-9"
                                                    placeholder="Change password"
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
                                        <FormDescription>
                                            Leave empty to keep the current password
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="disabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Disable account</FormLabel>
                                            <FormDescription>
                                                When disabled, the user will not be able to log in
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">

                                <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant='ghost'
                                            className="text-red-500/75"
                                            disabled={isDeletePending}
                                        >
                                            {isDeletePending ? (
                                                <><Loader2 className="animate-spin" />Delete</>
                                            ) : (
                                                <><Trash />Delete</>
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this account and cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <Button className="btn-danger" onClick={handleDelete}>Delete</Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <><Loader2 className="animate-spin" /> Saving changes...</>
                                    ) : (
                                        <><Check /> Save changes</>
                                    )}
                                </Button>

                            </div>
                        </form>
                    </Form>

                </CardContent>
            </Deferred>
        </Card>
    );

}