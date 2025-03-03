// @ts-ignore
// @ts-nocheck

import { ApplicationsTable } from '@/Components/tables/ApplicationsTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ applications }: { applications: object[] }) {
    return (
        <AuthenticatedLayout>
            <Head title='Applications Management' />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Applications Management</h2>
                    <p className="text-muted-foreground">View and manage your releases</p>
                </div>
                <ApplicationsTable applications={applications} />
            </div>
        </AuthenticatedLayout>
    );
}
