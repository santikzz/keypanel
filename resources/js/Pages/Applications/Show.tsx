import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/Components/ui/tabs"
import ShowDetails from './Fragments/ShowDetails';
import { ShowLicensesTable } from '@/Components/tables/ShowLicensesTable';

export default function Show({ application, licenses }: { application: object, licenses: object[] }) {

    return (
        <AuthenticatedLayout>
            <Head title='Application Detail' />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Application Detail</h2>
                </div>

                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="licenses">Licenses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                        <ShowDetails application={application} />
                    </TabsContent>

                    <TabsContent value="licenses">
                        <ShowLicensesTable application={application} licenses={licenses} />
                    </TabsContent>

                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}