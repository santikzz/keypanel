// @ts-ignore
// @ts-nocheck

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { Deferred, router, usePage, WhenVisible } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Calendar, Clock1, Layers, Loader2, Plus, StickyNote, Tag } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/Components/ui/select"
import { Switch } from "@/Components/ui/switch"
import { cn, durationUnits, formatDuration, toastDark } from "@/lib/utils"
import clsx from "clsx"
import { Label } from "@/Components/ui/label"

const formSchema = z.object({
    app_id: z.number(),
    duration_unit: z.string(),
    duration_value: z.number().min(1),
    note: z.string(),
    bulk_amount: z.number().min(1).max(256),
    time_option: z.number(),
});

export function IndexCreateLicenseDialog({ applications, timeOptions }: { applications: object[], timeOptions: object[] }) {

    const user = usePage().props.auth.user;
    const isReseller = user?.role === 'reseller';
    const canCreate = user?.all_permissions.includes('KEYS_CREATE');

    const [open, isOpen] = useState(false);
    const [isPending, setPending] = useState(false);
    const [isBulk, setBulk] = useState(false);

    const [totalCost, setTotalCost] = useState(0);
    const [notEnoughBalance, setNotEnoughBalance] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            duration_unit: 'days',
            duration_value: 1,
            bulk_amount: 1
        }
    });

    // set mock value so zod don't complain about missing value
    useEffect(() => {
        if (!isReseller) {
            form.setValue('time_option', 1);
        }
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

    /*
        Calculate total cost and check if user has enough balance
    */
    if (isReseller) {
        const timeOptionWatch = form.watch('time_option');
        const bulkAmountWatch = form.watch('bulk_amount');
        useEffect(() => {
            const _bulkAmount = isBulk ? bulkAmountWatch : 1;
            const cost = (timeOptions?.find(option => option?.id === timeOptionWatch)?.cost) * _bulkAmount || 0;
            // cost = Number(cost).toFixed(2);
            setTotalCost(Number(cost).toFixed(2));
            setNotEnoughBalance(cost > user?.balance ? true : false);
        }, [timeOptionWatch, bulkAmountWatch, isBulk])
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
                                            <Select onValueChange={(value) => {
                                                const appId = Number(value);
                                                field.onChange(appId);
                                                setSelectedAppId(appId);
                                            }}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an application" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {applications.map((app) => (
                                                        <SelectItem key={app?.id} value={String(app?.id)}>{app?.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {isReseller ? (
                                    <WhenVisible data="timeOptions" fallback={
                                        <div className="flex mt-2">
                                            <Input disabled className="flex-1" />
                                            <Loader2 className="animate-spin" />
                                        </div>
                                    }>
                                        <FormField
                                            control={form.control}
                                            name="time_option"
                                            render={({ field }) => {
                                                const filteredTimeOptions = timeOptions?.filter(
                                                    (option) => option.reseller_app.app_id === selectedAppId
                                                );
                                                return (
                                                    <FormItem>
                                                        <FormLabel>
                                                            <Tag className="inline mr-0.5" size={14} />
                                                            Time Option *
                                                        </FormLabel>
                                                        <Select onValueChange={(value) => field.onChange(Number(value))}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a time option" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {filteredTimeOptions?.map((option) => (
                                                                    <SelectItem key={option?.id} value={String(option?.id)}>
                                                                        {option?.name} {`(${formatDuration(option?.duration)})`} - ${option?.cost}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </WhenVisible>
                                ) : (

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
                                )}

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
                                                    min={1}
                                                    max={256}
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className={clsx('flex justify-end items-center',
                                    isReseller ? 'justify-between' : 'justify-end'
                                )}>

                                    {isReseller &&
                                        <div className="flex flex-col">
                                            <Label className="text-xs font-thin text-zinc-300">Your Balance: ${user?.balance}</Label>
                                            <Label className={clsx('text-lg',
                                                notEnoughBalance ? 'text-red-400' : 'text-emerald-400'
                                            )}>
                                                Total Cost:${totalCost}
                                            </Label>
                                        </div>
                                    }

                                    <Button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={isPending || notEnoughBalance}
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
            </Deferred >
        </>
    )
}
