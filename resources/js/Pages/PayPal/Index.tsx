

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deferred, Head, router, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { PayPalProductList } from './Fragments/PayPalProductList';
import { PayPalPlanList } from './Fragments/PayPalPlanList';

export default function Index({ products, plans }: { products: object[], plans: object[] }) {

    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">PayPal Settings</h2>
                </div>


                <PayPalProductList products={products} />
                <PayPalPlanList plans={plans} />


            </div >
        </AuthenticatedLayout >
    );
}
