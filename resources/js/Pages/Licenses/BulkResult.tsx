import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/Components/ui/tooltip";
import { Textarea } from '@headlessui/react';
import { CheckIcon, CopyIcon, Download } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import { Head } from '@inertiajs/react';

export default function Show({ licenses, application }: { licenses: object[], application: object }) {

    const [copied, setCopied] = useState<boolean>(false);

    const licenseList = licenses?.map((license) => license?.license_key).join('\n');
    const formattedDate = new Date(licenses[0]?.created_at).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    const result = `
######################################################
BULK LICENSE - ${formattedDate}
CREATED ${licenses.length} licenses of ${formatDuration(licenses[0]?.duration)}
APPLICATION: '${application?.name}' (ID: ${application?.app_hash_id})
NOTE: ${licenses[0]?.note}
######################################################

${licenseList}
    `;

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const downloadFile = () => {
        const blob = new Blob([result], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `licenses_${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
    }

    return (
        <AuthenticatedLayout>
            <Head title='Bulk Result' />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Bulk Result</h2>
                </div>

                <div className='flex flex-row gap-4'>
                    <Button
                        className='btn-primary'
                        onClick={downloadFile}
                    >
                        <Download />
                        Save to file
                    </Button>

                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleCopy}
                                    aria-label={copied ? "Copied" : "Copy to clipboard"}
                                    disabled={copied}
                                    className='btn-primary relative'
                                >
                                    <div
                                        className={cn(
                                            "transition-all",
                                            copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                                        )}
                                    >
                                        <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute transition-all",
                                            copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                                        )}
                                    >
                                        <CopyIcon size={16} aria-hidden="true" />
                                    </div>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>

                <Textarea
                    value={result}
                    readOnly
                    className='w-full bg-zinc-900 border border-zinc-800 rounded resize-none min-h-screen'
                    rows={1}
                    onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                    }}
                />

            </div>
        </AuthenticatedLayout>
    );
}