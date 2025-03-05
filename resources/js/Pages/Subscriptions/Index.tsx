// @ts-ignore
// @ts-nocheck

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <Head title="Subscriptions" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Subscriptions</h2>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
