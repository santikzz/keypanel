import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/Components/ui/tabs"
import { Head } from '@inertiajs/react';
import { ManagersTable } from '@/Components/tables/ManagersTable';
import { ResellersTable } from '@/Components/tables/ResellersTable';

export default function Index({ managers, resellers }: { managers: object[], resellers: object[] }) {
    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">View and manage your users</p>
                </div>

                <Tabs defaultValue="manager" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manager">Managers</TabsTrigger>
                        <TabsTrigger value="reseller">Resellers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manager">
                        <ManagersTable managers={managers} />
                    </TabsContent>
                    <TabsContent value="reseller">
                        <ResellersTable resellers={resellers} />
                    </TabsContent>
                </Tabs>

            </div>
        </AuthenticatedLayout>
    );
}
