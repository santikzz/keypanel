import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ reseller }: { reseller: object }) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">reseller Details</h2>
                </div>
                {JSON.stringify(reseller)}
            </div>
        </AuthenticatedLayout>
    );
}
