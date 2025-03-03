// @ts-ignore
// @ts-nocheck

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { Deferred, router, usePage } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Calendar, Clock1, Layers, Loader2, Plus, StickyNote, Tag } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/Components/ui/select"
import { Switch } from "@/Components/ui/switch"
import { cn, durationUnits, toastDark } from "@/lib/utils"

const formSchema = z.object({
    app_id: z.string(),
    duration_unit: z.string(),
    duration_value: z.number().min(1),
    note: z.string(),
    bulk_amount: z.number().min(1).max(256).default(1),
});

export function IndexCreateLicenseDialog({ applications }: { applications: object[] }) {

    const user = usePage().props.auth.user;
    const canCreate = user?.all_permissions.includes('KEYS_CREATE');

    const [open, isOpen] = useState(false);
    const [isPending, setPending] = useState(false);
    const [isBulk, setBulk] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        const _values = {
            ...values,
            is_bulk: isBulk
        };
        router.post(route('licenses.store'), _values,
            {
                onError: () => {
                    toast.error('Error creating license', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('License created', { style: toastDark })
                },
                onFinish: () => setPending(false)
            }
        )
    }

    return (
        <>
            <Deferred data="applications" fallback={<Button className="btn-primary" disabled> <Plus />New license</Button>}>
                <Dialog open={open} onOpenChange={isOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="btn-primary"
                            disabled={!canCreate}
                        ><Plus />New license
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-950 border border-zinc-900">
                        <DialogHeader>
                            <DialogTitle>Create new license</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                                <FormField
                                    control={form.control}
                                    name="app_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <Tag className="inline mr-0.5" size={14} />
                                                Application *
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an application" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {applications.map((app) => (
                                                        <SelectItem key={app?.id} value={app?.id}>{app?.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="duration_unit"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col flex-1 mt-2.5">
                                                <FormLabel>
                                                    <Calendar className="inline mb-0.5 mr-1" size={14} />
                                                    Duration Unit *
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a time unit" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {durationUnits.map((unit) => (
                                                            <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="duration_value"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    <Clock1 className="inline mb-0.5 mr-1" size={14} />
                                                    Duration Value *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter a duration value"
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <StickyNote className="inline mb-0.5 mr-1" size={14} />
                                                Note
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Frank's license"
                                                    type="text"
                                                    {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Add a note to better identify this license
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Bulk create</FormLabel>
                                        <FormDescription>
                                            Create multiple licenses at once
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={isBulk}
                                            onCheckedChange={setBulk}
                                        />
                                    </FormControl>
                                </FormItem>

                                <FormField
                                    control={form.control}
                                    name="bulk_amount"
                                    render={({ field }) => (
                                        <FormItem className={cn('flex-1',
                                            isBulk ? 'block' : 'hidden'
                                        )}>
                                            <FormLabel>
                                                <Layers className="inline mb-0.5 mr-1" size={14} />
                                                Bulk Amount *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="How many licenses you want to create?"
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <><Loader2 className="animate-spin" />Creating license...</>
                                        ) : (
                                            <><Plus /> Create license</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                    </DialogContent>
                </Dialog>
            </Deferred>
        </>
    )
}
