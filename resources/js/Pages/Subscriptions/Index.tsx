// @ts-ignore
// @ts-nocheck

import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deferred, Head } from '@inertiajs/react';

export default function Index({ plans }: { plans: object[] }) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Subscriptions</h2>
                </div>

                <Card className=''>

                    <CardHeader>
                        <Label className='text-2xl'>Available Plans</Label>
                    </CardHeader>

                    <CardContent>
                        <div className='flex flex-col'>

                            <Deferred data="plans" fallback={<div>Loading...</div>}>
                                {plans?.map((plan) => (
                                    <div className='border rounded-md p-4'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-xl'>{plan?.name}</Label>
                                            <Label>Apps: {plan?.max_applications} - Keys: {plan?.max_keys} - Managers: {plan?.max_managers} - Resellers: {plan?.max_resellers}</Label>
                                            <Label>${plan?.price}/{plan?.billing_interval}</Label>
                                        </div>
                                    </div>
                                ))}
                            </Deferred>

                        </div>
                    </CardContent>

                </Card>

            </div>
        </AuthenticatedLayout>
    );
}
