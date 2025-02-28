import { useEffect, useState, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from '@inertiajs/react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import toast from "react-hot-toast";
import { Deferred, usePage } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Check, Hash, Loader2, RotateCw, CheckIcon, CopyIcon, EyeIcon, EyeOffIcon, Trash, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/Components/ui/card"
import { Input } from '@/Components/ui/input';
import { Button } from "@/Components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/Components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/Components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/Components/ui/tabs"
import { cn, toastDark } from '@/lib/utils';
import ShowDetails from './Fragments/ShowDetails';
import { ShowLicensesTable } from '@/Components/tables/ShowLicensesTable';

export default function Show({ application, licenses }: { application: object, licenses: object[] }) {

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Applications Management</h2>
                    <p className="text-muted-foreground">View and manage your applications</p>
                </div>

                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="licenses">Licenses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                        <ShowDetails application={application} />
                    </TabsContent>

                    <TabsContent value="licenses">
                        <ShowLicensesTable application={application} licenses={licenses} />
                    </TabsContent>

                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}