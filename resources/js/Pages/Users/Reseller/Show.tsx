import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Check, Loader2, RefreshCcw, Trash } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { Switch } from "@/Components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/Components/ui/card"
import { parsePermission, PERMISSIONS, toastDark, useRandomPassword } from "@/lib/utils"
import { Deferred, Head, router } from '@inertiajs/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { ResellerDetails } from "../Fragments/ResellerDetails"
import { ResellerBalance } from "../Fragments/ResellerBalance"
import { ResellerApplications } from "../Fragments/ResellerApplications"

const formSchema = z.object({
    password: z.string().min(8).max(64).optional().or(z.literal("")),
    disabled: z.boolean().optional(),
});

export default function Show({ reseller }: { reseller: object }) {


    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Reseller Details</h2>
                </div>



                <ResellerDetails reseller={reseller} />

                <ResellerBalance reseller={reseller} />

                <ResellerApplications reseller={reseller} applications={[]} />


            </div>
        </AuthenticatedLayout>
    );
}
