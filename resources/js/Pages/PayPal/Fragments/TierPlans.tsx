// @ts-ignore
// @ts-nocheck

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Deferred, router, usePage, WhenVisible } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import toast from 'react-hot-toast';
import { toastDark } from '@/lib/utils';

export function TierPlans({ plans }: { plans: object[] }) {

    const user = usePage().props.auth.user;

    const [modifiedPlans, setModifiedPlans] = useState({});
    const [newPlanRequest, setNewPlanRequest] = useState();

    const handleUpdatePlan = (planId) => {
        if (!modifiedPlans[planId]) return;
        try {
            const data = JSON.parse(modifiedPlans[planId]);
            router.put(route('plans.update', { plan: planId }), data, {
                onSuccess: () => { toast.success('Plan updated successfully', { style: toastDark }); },
                onError: () => { toast.error('Error updating plan', { style: toastDark }); }
            });
        } catch (e) {
            console.error('Error parsing JSON', e);
            toast.error('Error parsing JSON', { style: toastDark });
        }
    }

    const handleCreatePlan = () => {
        if (!newPlanRequest) return;
        try {
            const data = JSON.parse(newPlanRequest);
            router.post(route('plans.store'), data, {
                onSuccess: () => { toast.success('Plan created successfully', { style: toastDark }); },
                onError: () => { toast.error('Error creating plan', { style: toastDark }); }
            });
        } catch (e) {
            console.error('Error parsing JSON', e);
            toast.error('Error parsing JSON', { style: toastDark });
        }

    }

    const handleDeletePlan = (planId) => {
        router.delete(route('plans.delete', { plan: planId }), {
            onSuccess: () => { toast.success('Plan deleted successfully', { style: toastDark }); },
            onError: () => { toast.error('Error deleting plan', { style: toastDark }); }
        });
    }


    return (
        <Card>
            <CardHeader>
                <Label className='text-xl'>Plans</Label>
            </CardHeader>

            <CardContent>
                <WhenVisible data="plans" fallback={<div>Loading plans...</div>}>
                    <div className='flex flex-col gap-4'>
                        {!plans && <Label className="text-red-500">No plans found.</Label>}
                        {plans?.map((plan, idx) => (
                            <Collapsible key={idx} className='p-2 border rounded-md bg-zinc-900'>
                                <CollapsibleTrigger className='flex flex-row justify-between w-full items-center'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <Label>ID: <span className='text-indigo-300'>{plan?.id}</span></Label>
                                        <Label>NAME: <span className='text-indigo-300'>{plan?.name}</span></Label>
                                        <Label>PRICE: <span className='text-indigo-300'>{plan?.price}</span></Label>
                                        <Label>PAYPAL PLAN ID: <span className='text-indigo-300'>{plan?.paypal_plan_id}</span></Label>
                                    </div>
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className='bg-zinc-950 p-2 border rounded-md mt-2'>
                                    <CodeEditor
                                        data-color-mode="dark"
                                        value={JSON.stringify(plan, null, 2)}
                                        onChange={(e) => setModifiedPlans({ ...modifiedPlans, [plan.id]: e.target.value })}
                                        language="json"
                                        padding={15}
                                        style={{
                                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        }}
                                    />
                                    <div className='mt-2 gap-2 flex flex-row justify-between'>
                                        <Button className='btn-success' size='sm' onClick={() => handleUpdatePlan(plan?.id)}>Update</Button>
                                        <Button className='btn-danger' size='sm' onClick={() => handleDeletePlan(plan?.id)}>Delete</Button>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </WhenVisible>
            </CardContent>


            <CardFooter className='border-t flex-col items-start gap-4'>
                <div className='mt-4 gap-4 flex flex-col flex-1 w-full'>
                    <Label className='text-xl'>Create new plan</Label>
                    <CodeEditor
                        className='h-80'
                        data-color-mode="dark"
                        value={newPlanRequest}
                        onChange={(e) => setNewPlanRequest(e.target.value)}
                        language="json"
                        padding={15}
                        style={{
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
                <div className='mt-2 gap-2 flex flex-row justify-between'>
                    <Button className='btn-success' size='sm' onClick={handleCreatePlan}>Create</Button>
                </div>
            </CardFooter>

        </Card>
    );

}