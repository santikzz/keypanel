import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Deferred, router, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

export function PayPalProductList({ products }: { products: object[] }) {

    const user = usePage().props.auth.user;

    const createProductRequestJsonBase = `{
    "name": "KeyCore",
    "description": "KeyCore",
    "type": "SERVICE",
    "category": "SOFTWARE",
    "image_url": "https://example.com/streaming.jpg",
    "home_url": "https://example.com/home"
}`;

    const [createProductRequest, setCreateProductRequest] = useState(createProductRequestJsonBase);
    const [createPending, setCreatePending] = useState(false);

    const handleCreateProduct = () => {
        setCreatePending(true);
        router.post(route('paypal.createProduct'), JSON.parse(createProductRequest),
            {
                onFinish: () => setCreatePending(false),
            });
    }

    return (
        <Card>
            <CardHeader>
                <Label className='text-xl'>PayPal Products</Label>
            </CardHeader>
            <CardContent>

                <Deferred data="products" fallback={<div>Loading products...</div>}>
                    <div className='flex flex-col gap-4'>
                        {products?.products?.map((product, idx) => (
                            <Collapsible key={idx} className='p-2 border rounded-md bg-zinc-900'>
                                <CollapsibleTrigger className='flex flex-row justify-between w-full items-center'>
                                    <div className='flex flex-col gap-2'>
                                        <Label>ID: {product?.id}</Label>
                                        <Label>NAME: {product?.name}</Label>
                                    </div>
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className='bg-zinc-950 p-2 border rounded-md mt-2'>
                                    {/* <div>
                                                {JSON.stringify(product)}
                                            </div> */}

                                    <CodeEditor
                                        data-color-mode="dark"
                                        value={JSON.stringify(product, null, 2)}
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
                <Label className='mt-4 text-xl'>Create new product</Label>
                <CodeEditor
                    data-color-mode="dark"
                    value={createProductRequest}
                    className=' w-full h-56 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800'
                    language="json"
                    onChange={(evn) => setCreateProductRequest(evn.target.value)}
                    padding={15}
                    style={{
                        backgroundColor: '#18181b',
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
                <Button className='btn-primary'
                    disabled={createPending}
                    onClick={handleCreateProduct}>
                    {createPending ? <Loader2 className='animate-spin' /> : <Plus />}
                    Create Product
                </Button>
            </CardFooter>

        </Card>
    );

}