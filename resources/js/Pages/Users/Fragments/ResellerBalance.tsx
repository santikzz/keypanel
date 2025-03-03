
// @ts-ignore
// @ts-nocheck

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Check, Loader2, Plus } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/Components/ui/dialog"
import { router, usePage } from "@inertiajs/react"
import { toastDark } from "@/lib/utils"
import toast from "react-hot-toast"
import clsx from "clsx"

const setFromSchema = z.object({
    balance: z.number().min(0.00).max(1000000.00).default(0.00)
});

const addFormSchema = z.object({
    balance: z.number().gt(0.00).max(1000000.00)
});

export function ResellerBalance({ reseller }: { reseller: object }) {

    const user = usePage().props.auth.user;
    const canAddBalance = user?.all_permissions.includes('RESELLER_ADD_BALANCE');

    const [addBalanceOpen, setAddBalanceOpen] = useState(false)
    const [isSetPending, setSetPending] = useState(false);
    const [isAddPending, setAddPending] = useState(false);

    const setForm = useForm({
        resolver: zodResolver(setFromSchema)
    });

    const addForm = useForm({
        resolver: zodResolver(addFormSchema)
    });

    const setBalanceSubmit = async (values: z.infer<typeof formSchema>) => {
        setSetPending(true);
        router.post(route('users.setBalance', reseller?.id), values, {
            onError: () => {
                toast.error('Error setting balance', { style: toastDark })
            },
            onSuccess: () => {
                toast.success('Balance set', { style: toastDark })
                setSetPending(false);
            },
            onFinish: () => { setSetPending(false) }
        });
    }

    const addBalanceSubmit = async (values: z.infer<typeof formSchema>) => {
        setAddPending(true);
        setAddBalanceOpen(false);
        router.post(route('users.addBalance', reseller?.id), values, {
            onError: () => {
                toast.error('Error setting balance', { style: toastDark })
            },
            onSuccess: () => {
                toast.success('Balance set', { style: toastDark })
                setSetPending(false);
            },
            onFinish: () => { setAddPending(false) }
        });
    }

    return (
        <>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Balance Management</CardTitle>
                    <CardDescription>Manage reseller balance and view transaction history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Current Balance</Label>
                            <p className="text-3xl font-bold">${reseller?.balance}</p>
                        </div>
                        <Button
                            className="btn-primary"
                            onClick={() => setAddBalanceOpen(true)}
                            disabled={isAddPending || !canAddBalance}
                        >
                            {isAddPending ? <Loader2 className="animate-spin" /> : <Plus />}
                            Add Balance
                        </Button>
                    </div>
                    <Tabs defaultValue="history">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="history">Transaction History</TabsTrigger>
                            <TabsTrigger value="set-balance">Set Balance</TabsTrigger>
                        </TabsList>
                        <TabsContent value="history">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Balance</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reseller?.transactions?.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-mono text-sm">{transaction.created_at.replace('T', ' ').split('.')[0]}</TableCell>
                                            <TableCell className="capitalize">{transaction.type}</TableCell>
                                            <TableCell className={clsx('',
                                                transaction.type === "credit" && "text-green-600",
                                                transaction.type === "debit" && "text-red-600",
                                                transaction.type === "set" && "text-indigo-600"
                                            )}>
                                                {transaction.type !== "set" ? (transaction.type === "credit" ? "+" : "-") : ""}${transaction.amount}
                                            </TableCell>
                                            <TableCell>${transaction.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                        <TabsContent value="set-balance">

                            <Form {...setForm}>
                                <form onSubmit={setForm.handleSubmit(setBalanceSubmit)} className="flex flex-col gap-4">

                                    <FormField
                                        control={setForm.control}
                                        name="balance"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Balance</FormLabel>
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
                                                <FormDescription>This will set the reseller's balance to the specified amount. To add balance use the 'Add Balance' option instead.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex">
                                        <Button
                                            type="submit"
                                            className="btn-primary"
                                            disabled={isSetPending || !canAddBalance}
                                        >
                                            {isSetPending ? <Loader2 className="animate-spin" /> : <Check />}
                                            Set New Balance
                                        </Button>
                                    </div>

                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={addBalanceOpen} onOpenChange={setAddBalanceOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Balance</DialogTitle>
                        <DialogDescription>Add funds to the reseller's account balance</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            {/* <Label htmlFor="add-amount">Amount to Add</Label> */}
                            <Form {...addForm}>
                                <form onSubmit={addForm.handleSubmit(addBalanceSubmit)} className="flex flex-col gap-4">

                                    <FormField
                                        control={addForm.control}
                                        name="balance"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ammount to Add</FormLabel>
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
                                        <Button
                                            type="submit"
                                            className="btn-primary"
                                            disabled={isAddPending}
                                        >
                                            {isAddPending ? <Loader2 className="animate-spin" /> : <Plus />}
                                            Add Balance
                                        </Button>
                                    </div>

                                </form>
                            </Form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    );

}