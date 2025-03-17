// @ts-ignore
// @ts-nocheck

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Deferred, Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Subscribe({ checkout }: { checkout: object[] }) {

    const user = usePage().props.auth.user;
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Checkout</h2>
                </div>

                <Deferred data="checkout" fallback={<div>Loading...</div>}>
                    {/* <x-paddle-button checkout={checkout} class="px-8 py-4">
                        Subscribe
                    </x-paddle-button> */}
                </Deferred>

            </div>
        </AuthenticatedLayout>
    );
}
