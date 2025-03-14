// @ts-ignore
// @ts-nocheck

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Deferred, router, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

export function PayPalPlanList({ pp_plans }: { pp_plans: object[] }) {

    const user = usePage().props.auth.user;

    const createPlanRequestBase = `{
    "product_id": "PROD-02484232WP582913W",
    "name": "KeyCore",
    "description": "KeyCore",
    "status": "ACTIVE",
    "billing_cycles": [
      {
        "frequency": {
          "interval_unit": "MONTH",
          "interval_count": 1
        },
        "tenure_type": "REGULAR",
        "sequence": 1,
        "pricing_scheme": {
          "fixed_price": {
            "value": "10",
            "currency_code": "USD"
          }
        }
      }
    ],
    "payment_preferences": {
      "auto_bill_outstanding": true,
      "setup_fee": {
        "value": "10",
        "currency_code": "USD"
      },
      "setup_fee_failure_action": "CANCEL",
      "payment_failure_threshold": 3
    }
  }`;

    const [createPlanRequest, setCreatePlanRequest] = useState(createPlanRequestBase);
    const [createPending, setCreatePending] = useState(false);

    const handleCreatePlan = () => {
        setCreatePending(true);
        router.post(route('paypal.createPlan'), JSON.parse(createPlanRequest),
            {
                onFinish: () => setCreatePending(false),
            });
    }

    return (
        <Card>
            <CardHeader>
                <Label className='text-xl'>PayPal Plans</Label>
            </CardHeader>
            <CardContent>

                <Deferred data="pp_plans" fallback={<div>Loading plans...</div>}>
                    <div className='flex flex-col gap-4'>
                        {!pp_plans?.plans && <Label className="text-red-500">No plans found.</Label>}
                        {pp_plans?.plans?.map((plan, idx) => (
                            <Collapsible key={idx} className='p-2 border rounded-md bg-zinc-900'>
                                <CollapsibleTrigger className='flex flex-row justify-between w-full items-center'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <Label>ID: <span className='text-indigo-300'>{plan?.id}</span></Label>
                                        <Label>NAME: <span className='text-indigo-300'>{plan?.name}</span></Label>
                                    </div>
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className='bg-zinc-950 p-2 border rounded-md mt-2'>
                                    <CodeEditor
                                        data-color-mode="dark"
                                        value={JSON.stringify(plan, null, 2)}
                                        language="json"
                                        padding={15}
                                        style={{
                                            backgroundColor: '#09090b',
                                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        }}
                                    />

                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </Deferred>
            </CardContent>

            <CardFooter className='border-t flex-col items-start gap-4'>
                <Label className='mt-4 text-xl'>Create new plan</Label>
                <CodeEditor
                    data-color-mode="dark"
                    value={createPlanRequest}
                    className=' w-full h-84 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800'
                    language="json"
                    onChange={(evn) => setCreatePlanRequest(evn.target.value)}
                    padding={15}
                    style={{
                        backgroundColor: '#18181b',
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
                <Button className='btn-primary'
                    disabled={createPending}
                    onClick={handleCreatePlan}>
                    {createPending ? <Loader2 className='animate-spin' /> : <Plus />}
                    Create Plan
                </Button>
            </CardFooter>

        </Card>
    );

}