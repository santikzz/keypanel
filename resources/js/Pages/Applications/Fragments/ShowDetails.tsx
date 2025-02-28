import { useEffect, useState, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from '@inertiajs/react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import toast from "react-hot-toast";
import { Deferred, usePage } from '@inertiajs/react'

import { Check, Hash, Loader2, RotateCw, CheckIcon, CopyIcon, EyeIcon, EyeOffIcon, Trash, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/Components/ui/card"
import { Input } from '@/Components/ui/input';
import { Button } from "@/Components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/Components/ui/alert-dialog"
import { cn, toastDark } from '@/lib/utils';

const formSchema = z.object({
    name: z.string(),
    status: z.string().min(0),
    download_url: z.string().optional().nullable()
});

export default function ShowDetails({ application }: { application: object }) {

    const [isPending, setPending] = useState(false);
    const [isDeletePending, setDeletePending] = useState(false);
    const [copied, setCopied] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (application) {
            form.reset({
                name: application?.name,
                status: application?.status,
                download_url: application?.download_url
            });
        }
    }, [application]);

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        router.put(route('applications.update', application.id), values, {
            onError: () => {
                toast.error('Error updating application', { style: toastDark })
            },
            onSuccess: () => {
                toast.success('Application updated', { style: toastDark })
            },
            onFinish: () => setPending(false)
        })
    }

    const handleDelete = () => {
        setDeletePending(true);
        router.delete(route('applications.delete', application.id), {
            onError: () => {
                toast.error('Error deleting application', { style: toastDark })
            },
            onSuccess: () => {
                toast.success('Application deleted', { style: toastDark })
            },
            onFinish: () => setDeletePending(false)
        });
    }

    const Loading = () => (
        <div className="flex justify-center items-center space-x-2 pb-6">
            <Loader2 className="animate-spin text-indigo-600" size={36} />
        </div>
    )

    const DeleteDialog = () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant='ghost'
                    className='text-red-900'
                    type='button'
                    disabled={isDeletePending}
                >
                    {isDeletePending ? (<Loader2 className="animate-spin" />) : (<Trash />)}
                    Delete application
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete application?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this application? This action will delete all asociated licenses and cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <X />
                        Cancel
                    </AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash />
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    return (
        <div className='space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Application details</CardTitle>
                    <CardDescription>Manage your application details</CardDescription>
                </CardHeader>
                <CardContent>

                    <Deferred data="application" fallback={<Loading />}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>App name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your application name"
                                                    type="text"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="available">Available</SelectItem>
                                                    <SelectItem value="unavailable">Unavailable</SelectItem>
                                                    <SelectItem value="hidden">Hidden</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="download_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Download URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://example.net/downloads/release.zip"

                                                    type="text"
                                                    {...field} />
                                            </FormControl>
                                            <FormDescription>(Optional) Download URL for launchers</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between mt-2">
                                    <DeleteDialog />
                                    <Button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <><Loader2 className="animate-spin" />Saving changes...</>
                                        ) : (
                                            <><Check /> Save changes</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </Deferred>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Application credentials</CardTitle>
                    <CardDescription>Manage your application credentials</CardDescription>
                </CardHeader>
                <CardContent>

                    <Deferred data="application" fallback={<Loading />}>
                        <div className='flex flex-col gap-4'>

                            <div className='flex flex-col gap-3'>
                                <Label>App ID</Label>
                                <div className="relative">
                                    <Input
                                        ref={inputRef}
                                        className="peer ps-9"
                                        readOnly
                                        value={application?.app_hash_id}
                                    />
                                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                        <Hash size={16} aria-hidden="true" />
                                    </div>
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={handleCopy}
                                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                                    aria-label={copied ? "Copied" : "Copy to clipboard"}
                                                    disabled={copied}
                                                >
                                                    <div
                                                        className={cn(
                                                            "transition-all",
                                                            copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                                                        )}
                                                    >
                                                        <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            "absolute transition-all",
                                                            copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                                                        )}
                                                    >
                                                        <CopyIcon size={16} aria-hidden="true" />
                                                    </div>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <Label>App Secret</Label>
                                <div className='flex flex-row gap-3'>

                                    <div className="relative w-full">
                                        <Input
                                            readOnly
                                            value={application?.app_hash_id}
                                            className="pe-9"
                                            type={isVisible ? "text" : "password"}
                                        />
                                        <button
                                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            onClick={toggleVisibility}
                                            aria-label={isVisible ? "Hide password" : "Show password"}
                                            aria-pressed={isVisible}
                                            aria-controls="password"
                                        >
                                            {isVisible ? (
                                                <EyeOffIcon size={16} aria-hidden="true" />
                                            ) : (
                                                <EyeIcon size={16} aria-hidden="true" />
                                            )}
                                        </button>
                                    </div>

                                    <Button className='btn-primary'>
                                        <RotateCw size={16} aria-hidden="true" />
                                        Renew
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </Deferred>
                </CardContent>
            </Card>
        </div>
    );
}