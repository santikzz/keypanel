// @ts-ignore
// @ts-nocheck

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { router, usePage } from "@inertiajs/react"
import { calculateDuration, cn, durationUnits, toastDark } from "@/lib/utils"

import { Calendar, Check, Clock, Clock1, Layers, Loader2, Plus, StickyNote } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Switch } from "@/Components/ui/switch"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/Components/ui/dialog"
import clsx from "clsx"

const formSchema = z.object({
    duration_unit: z.string(),
    duration_value: z.number().min(1),
});

export default function AddTimeDialog({ license }: { license: object }) {

    const user = usePage().props.auth.user;
    const canAddTime = user?.all_permissions.includes('KEYS_ADD_TIME');

    const [open, setOpen] = useState(false);
    const [isPending, setPending] = useState(false);
    const [valueDisabled, setValueDisabled] = useState(false);
    const localDurationUnits = durationUnits.filter(unit => unit.value !== 'lifetime');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // lifetime not enabled on AddTime
    // const durationUnitWatch = form.watch('duration_unit');
    // useEffect(() => {
    //     if (durationUnitWatch === 'lifetime') {
    //         form.setValue('duration_value', 1);
    //         setValueDisabled(true);
    //     } else {
    //         // form.setValue('duration_value', 0);
    //         setValueDisabled(false);
    //     }
    // }, [durationUnitWatch])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setOpen(false);
        setPending(true);

        router.post(route('licenses.addtime', license?.id), values,
            {
                onError: () => {
                    toast.error('Error updating license', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('License time updated', { style: toastDark })
                },
                onFinish: () => setPending(false)
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="btn-primary flex items-center gap-1"
                    disabled={isPending || !canAddTime}
                >
                    {isPending ? <Loader2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    Add Time
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Time to License</DialogTitle>
                    <DialogDescription>Extend the duration of this license key.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

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
                                            {localDurationUnits.map((unit) => (
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
                                <FormItem className={clsx('flex-1', valueDisabled ? 'hidden' : 'block')}>
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
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="btn-primary"
                            >
                                <Check /> Add time
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}