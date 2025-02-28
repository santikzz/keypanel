import { ApplicationsTable } from '@/Components/tables/ApplicationsTable';
import { IndexLicensesTable } from '@/Components/tables/IndexLicensesTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ licenses, applications }: { licenses: object[], applications: object[] }) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Licenses Management</h2>
                    <p className="text-muted-foreground">View and manage your licenses</p>
                </div>
                <IndexLicensesTable licenses={licenses} applications={applications} />
            </div>
        </AuthenticatedLayout>
    );
}
