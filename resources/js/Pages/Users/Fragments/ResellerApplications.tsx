// @ts-ignore
// @ts-nocheck

import { useState } from "react"
import { Package, Plus, Edit, ChevronDown, Loader2, Check, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Deferred, router, usePage, WhenVisible } from "@inertiajs/react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/Components/ui/select"
import toast from "react-hot-toast"
import { durationUnits, formatDuration, toastDark } from "@/lib/utils"

const formSchema = z.object({
    name: z.string().max(24),
    duration_unit: z.string(),
    duration_value: z.number().gt(0),
    cost: z.number().gt(0).default(0),
});

const editFormSchema = z.object({
    name: z.string().max(24),
    duration_unit: z.string(),
    duration_value: z.number().gt(0),
    cost: z.number().gt(0).default(0),
    reseller_app_id: z.number().gt(0),
});


export function ResellerApplications({ reseller, applications, resellerApps }: { reseller: object, applications: object[], resellerApps: object[] }) {

    const form = useForm({
        resolver: zodResolver(formSchema)
    });

    const editForm = useForm({
        resolver: zodResolver(editFormSchema)
    });

    const user = usePage().props.auth.user;
    const canManageOptions = user?.all_permissions.includes('RESELLER_UPDATE');

    const [assignApplicationOpen, setAssignApplicationOpen] = useState(false)
    const [addTimeOptionOpen, setAddTimeOptionOpen] = useState(false)
    const [selectedApp, setSelectedApp] = useState(null)
    const [selectedAssignApp, setSelectedAssignApp] = useState(null)
    const [isAssignPending, setAssignPending] = useState(false)
    const [isAddTimePending, setAddTimePending] = useState(false)

    // const [selectedOption, setSelectedOption] = useState(null)
    // const [editTimeOption, setEditTimeOption] = useState(null)
    // const [editTimeOptionOpen, setEditTimeOptionOpen] = useState(false)
    const [deletePending, setDeletePending] = useState(false)

    /*
        This submit will create a new time type for a specific application
    */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setAddTimePending(true);
        setAddTimeOptionOpen(false);
        router.post(route('resellers.addTimeType'), { ...values, reseller_app_id: selectedApp?.id },
            {
                preserveScroll: true,
                onError: () => {
                    toast.error('Error adding time option', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('Time option added', { style: toastDark })
                },
                onFinish: () => { setAddTimePending(false) },
            })
    }

    /*
        This submit will update an existing time type for a specific application
    */
    const handleDeleteOption = (option) => {
        setDeletePending(true);
        router.delete(route('resellers.deleteTimeType', option.id),
            {
                preserveScroll: true,
                onError: () => {
                    toast.error('Error deleting time option', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('Time option deleted', { style: toastDark })
                },
                onFinish: () => { setDeletePending(false) },
            })
    }

    /*
        This will assign the selected application from the dialog to a reseller
    */
    const handleAssignApplication = () => {
        setAssignPending(true);
        setAssignApplicationOpen(false);
        const values = {
            app_id: selectedAssignApp,
            user_id: reseller?.id
        }
        router.post(route('resellers.addApp'), values,
            {
                preserveScroll: true,
                onError: () => {
                    toast.error('Error assigning application', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('Application assigned', { style: toastDark })
                },
                onFinish: () => {
                    setAssignPending(false)
                    setSelectedAssignApp(null)
                },
            },
        )
    }

    const openAddTimeOption = (app) => {
        setSelectedApp(app)
        setAddTimeOptionOpen(true)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Application Access</CardTitle>
                    <CardDescription>Manage reseller access to applications and license creation options</CardDescription>
                </CardHeader>
                <Deferred data="resellerApps" fallback={
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    </div>
                }
                >
                    <CardContent className="space-y-4">
                        {resellerApps?.map((app) => (
                            <Collapsible key={app.id} className="border rounded-md">
                                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium">
                                    <div className="flex items-center">
                                        <Package className="h-4 w-4 mr-2" />
                                        {app.app.name}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-4 pb-4 pt-0 space-y-2">
                                    <>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Duration (days)</TableHead>
                                                    <TableHead>Cost</TableHead>
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {app.time_types?.map((option) => (
                                                    <TableRow key={option.id}>
                                                        <TableCell>{option.name}</TableCell>
                                                        <TableCell>{formatDuration(option.duration)}</TableCell>
                                                        <TableCell>${option.cost}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDeleteOption(option)}
                                                                disabled={deletePending || !canManageOptions}
                                                            >
                                                                {deletePending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash className="h-4 w-4 text-rose-600" />}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openAddTimeOption(app)}
                                            disabled={isAddTimePending || !canManageOptions}
                                        >
                                            {isAddTimePending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                            Add Time Option
                                        </Button>
                                    </>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </CardContent>
                </Deferred>
                <CardFooter>
                    <Button
                        className="btn-primary"
                        onClick={() => setAssignApplicationOpen(true)}
                        disabled={isAssignPending || !canManageOptions}
                    >
                        {isAssignPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus />}
                        Assign Application
                    </Button>
                </CardFooter>
            </Card>

            {/* 
                This dialog is used to ADD a new time option to a reseller application
            */}
            <Dialog open={addTimeOptionOpen} onOpenChange={setAddTimeOptionOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Time Option</DialogTitle>
                        <DialogDescription>Add a new time option</DialogDescription>
                    </DialogHeader>

                    <Form {...editForm}>
                        <form onSubmit={editForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                            <FormField
                                control={editForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., 1 Month"
                                                type="text"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editForm.control}
                                name="duration_unit"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col flex-1 mt-2.5">
                                        <FormLabel>
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
                                control={editForm.control}
                                name="duration_value"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
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

                            <FormField
                                control={editForm.control}
                                name="cost"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cost *</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className="peer ps-6 pe-12"
                                                    placeholder="0.00"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    {...field}
                                                    value={(field.value ?? 0).toFixed(2)}
                                                    onChange={(e) => {
                                                        const value = parseFloat(e.target.value);
                                                        field.onChange(isNaN(value) ? 0 : value); // Set to 0 if NaN
                                                    }}
                                                />
                                                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                                                    $
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" className="btn-primary">
                                    <Plus />
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/*
                This dialog is used to assign an application to a reseller 
            */}
            <Dialog open={assignApplicationOpen} onOpenChange={setAssignApplicationOpen}>
                <DialogContent>
                    <WhenVisible data="applications" fallback={
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                        </div>
                    }>
                        <>
                            <DialogHeader>
                                <DialogTitle>Assign Application</DialogTitle>
                                <DialogDescription>Assign an application to {reseller?.name}</DialogDescription>
                            </DialogHeader>
                            <Select onValueChange={setSelectedAssignApp}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an application" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {applications?.filter((app) => !resellerApps.some((ra) => ra.app_id === app.id))
                                            .map((app) => (
                                                <SelectItem key={app.id} value={app.id}>{app.name}</SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setAssignApplicationOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="btn-primary"
                                    onClick={handleAssignApplication}
                                    disabled={selectedAssignApp === null}
                                >
                                    <Check />
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </>
                    </WhenVisible>
                </DialogContent>
            </Dialog >

        </>
    );

}