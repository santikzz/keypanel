// @ts-ignore
// @ts-nocheck

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ResellerDetails } from "../Fragments/ResellerDetails"
import { ResellerBalance } from "../Fragments/ResellerBalance"
import { ResellerApplications } from "../Fragments/ResellerApplications"
import { Head } from '@inertiajs/react';

export default function Show({ reseller, applications, resellerApps }: { reseller: object, applications: object[], resellerApps: object[] }) {
    return (
        <AuthenticatedLayout>
            <Head title='Reseller Details' />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Reseller Details</h2>
                </div>
                <ResellerDetails reseller={reseller} />
                <ResellerBalance reseller={reseller} />
                <ResellerApplications reseller={reseller} applications={applications} resellerApps={resellerApps} />
            </div>
        </AuthenticatedLayout>
    );
}
