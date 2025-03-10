// @ts-ignore
// @ts-nocheck

import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deferred, Head, usePage } from '@inertiajs/react';

export default function Index({ plan }: { plan: object }) {

    const user = usePage().props.auth.user;

    console.log(user);

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
                </div>

                <Card className=''>

                    <CardHeader>
                        <Label className='text-2xl'>Billing</Label>
                    </CardHeader>

                    <CardContent>
                        <div className='flex flex-col'>

                            {/* <Deferred data="subscription" fallback={<div>Loading...</div>}>
                            </Deferred> */}


                            {user?.subscription ? (
                                <div>
                                    <h2>Current Plan: {user?.subscription.name}</h2>
                                    {/* <button onClick={manageSubscription}>Manage on Patreon</button> */}
                                </div>
                            ) : (
                                <a href={route('patreon.connect')}>
                                    <img src="/patreon-button.png" alt="Subscribe with Patreon" />
                                </a>
                            )}

                            <button
                                onClick={() => window.location.href = route('patreon.connect')}
                                className="mt-4 bg-orange-600 text-white px-4 py-2 rounded"
                            >
                                Upgrade with Patreon
                            </button>

                            {/* <div className="max-w-2xl mx-auto">
                                    <h2 className="text-2xl font-bold mb-4">Subscription Status</h2>

                                    {user.subscribed ? (
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p>Current Plan: {user.plan.name}</p>
                                            <p>Expires: {new Date(user.patreon_expires_at).toLocaleDateString()}</p>
                                            <button
                                                onClick={() => window.location.href = 'https://patreon.com/settings/membership'}
                                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Manage Subscription
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-blue-100 p-4 rounded-lg">
                                            <p>Current Plan: Free Tier</p>
                    
                                        </div>
                                    )}
                                </div> */}

                        </div>
                    </CardContent>


                    {/* <CardContent>
                        <div className='flex flex-col'>

                            <Deferred data="plans" fallback={<div>Loading...</div>}>
                                {plans?.map((plan) => (
                                    <div className='border rounded-md p-4'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-xl'>{plan?.name}</Label>
                                            <Label>Apps: {plan?.max_applications} - Keys: {plan?.max_licenses} - Managers: {plan?.max_managers} - Resellers: {plan?.max_resellers}</Label>
                                            <Label>${plan?.price}/{plan?.billing_interval}</Label>
                                        </div>
                                    </div>
                                ))}
                            </Deferred>

                        </div>
                    </CardContent> */}

                </Card>

            </div>
        </AuthenticatedLayout>
    );
}
