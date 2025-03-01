import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ manager }: { manager: object }) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Manager Details</h2>
                </div>
                {JSON.stringify(manager)}
            </div>
        </AuthenticatedLayout>
    );
}
