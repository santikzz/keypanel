// @ts-ignore
// @ts-nocheck

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deferred, Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Index({ plans }: { plans: object[] }) {

    const user = usePage().props.auth.user;
    const { flash } = usePage().props;

    const handleSubscribe = (paddlePriceId: number) => {
        router.get(route('paddle.checkout'), { paddlePriceId: paddlePriceId }, { replace: true });
    }

    // useEffect(() => {
    //     if (flash?.result) {
    //         window.location.href = flash?.result;
    //     }
    // }, [flash?.result])

    console.log(user);

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
                </div>

                <Card>
                    <CardHeader>
                        <Label className='text-2xl'>Current Plan</Label>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col'>
                            <h2 className='font-bold text-xl'>{user?.subscription.name}</h2>
                            <h2>{user?.subscription.interval_count} {user?.subscription.billing_interval}</h2>
                            {/* <h2>${user?.subscription.price} / month</h2> */}
                        </div>
                    </CardContent>
                </Card>

                <Deferred data="plans" fallback={<div>Loading...</div>}>
                    <div className='flex flex-col gap-2'>
                        {plans?.map((plan) => (
                            <Card>
                                <CardHeader>
                                    <Label className='text-xl'>{plan?.name}</Label>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Apps: {plan?.max_applications} - Keys: {plan?.max_licenses} - Managers: {plan?.max_managers} - Resellers: {plan?.max_resellers}</Label>
                                        <Label>${plan?.price} - {plan?.interval_count} {plan?.billing_interval}</Label>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => handleSubscribe(plan?.paddle_price_id)} className='btn-primary'>
                                        Subscribe
                                    </Button>
                                </CardFooter>
                            </Card>

                        ))}
                    </div>
                </Deferred>

            </div>
        </AuthenticatedLayout>
    );
}
