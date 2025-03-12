// @ts-ignore
// @ts-nocheck

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
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/Components/ui/tabs"
import { TierPlans } from './Fragments/TierPlans';

export default function Index({ pp_products, pp_plans, plans }: { pp_products: object[], pp_plans: object[], plans: object[] }) {

    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">PayPal Settings</h2>
                </div>


                <Tabs defaultValue="paypal" className="w-full">

                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="paypal">PayPal Settings</TabsTrigger>
                        <TabsTrigger value="tiers">Tier Plans</TabsTrigger>
                        <TabsTrigger value="none">Empty</TabsTrigger>
                    </TabsList>

                    <TabsContent value="paypal">
                        <div className='flex flex-col gap-4'>
                            <PayPalProductList products={pp_products} />
                            <PayPalPlanList plans={pp_plans} />
                        </div>
                    </TabsContent>

                    <TabsContent value="tiers">
                        <TierPlans plans={plans} />
                    </TabsContent>

                </Tabs>




            </div >
        </AuthenticatedLayout >
    );
}
