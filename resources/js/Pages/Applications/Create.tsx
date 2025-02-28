import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from '@inertiajs/react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import toast from "react-hot-toast";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { Loader2, Plus } from "lucide-react"
import { toastDark } from "@/lib/utils";

const formSchema = z.object({
    name: z.string(),
    status: z.string().min(0).default('available'),
    download_url: z.string().optional().nullable()
});

export default function Create() {

    const [isPending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        router.post(route('applications.store'), values, {
            onError: () => {
                toast.error('Error creating application', { style: toastDark })
            },
            onSuccess: () => {
                toast.success('Application created', { style: toastDark })
            },
            onFinish: () => setPending(false)
        })
    }

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Applications Management</h2>
                    <p className="text-muted-foreground">View and manage your releases</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>App name *</FormLabel>
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
                                    <FormLabel>Status *</FormLabel>
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

                        {/* {error && <Label className="text-red-500">{error}</Label>} */}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="btn-primary"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <><Loader2 className="animate-spin" />Creating app...</>
                                ) : (
                                    <><Plus /> Create app</>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>

            </div>
        </AuthenticatedLayout>
    );


}
