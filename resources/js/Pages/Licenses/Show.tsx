// @ts-ignore
// @ts-nocheck

import { useEffect, useState } from 'react';
import { Deferred, Head, Link, router, usePage, } from '@inertiajs/react'
import toast from 'react-hot-toast';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/Components/ui/card"
import { Copy, RotateCcw, Trash2, CheckCircle, Ban, Loader2, LayoutGrid, UserRound, CircleDashed, ClockAlert, CircleHelp, Clock1, HardDrive, Check, Infinity, StickyNote } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Input } from "@/Components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Label } from "@/Components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/Components/ui/dialog"
import { formatDuration, toastDark } from '@/lib/utils';
import AddTimeDialog from '@/Components/Dialogs/AddTimeDialog';

export default function Show({ license }: { license: object }) {

    const user = usePage().props.auth.user;

    const canUpdate = user?.all_permissions.includes('KEYS_CREATE');
    const canDelete = user?.all_permissions.includes('KEYS_DELETE');
    const canResetHwid = user?.all_permissions.includes('KEYS_RESET_HWID');
    
    const [copied, setCopied] = useState(false)
    const [licenseStatus, setLicenseStatus] = useState("active")
    const [showAddTimeDialog, setShowAddTimeDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showResetDialog, setShowResetDialog] = useState(false);
    const [saveEnabled, setSaveEnabled] = useState(false);
    const [savePending, setSavePending] = useState(false);
    const [resetPending, setResetPending] = useState(false);
    const [deletePending, setDeletePending] = useState(false);

    const activityLog = [
        // { id: 1, date: "2023-10-15 14:30:22", action: "License created", user: "John Doe", ip: "192.168.1.1" },
        // { id: 2, date: "2023-11-02 09:15:43", action: "License activated", user: "Customer", ip: "203.0.113.45" },
        // { id: 3, date: "2023-12-10 16:22:10", action: "HWID updated", user: "Customer", ip: "203.0.113.45" },
        // { id: 4, date: "2024-01-05 11:05:37", action: "Login attempt", user: "Customer", ip: "203.0.113.45" },
    ]

    const copyToClipboard = () => {
        navigator.clipboard.writeText(license?.license_key)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSaveStatus = () => {
        setSavePending(true);
        router.put(route('licenses.update', license?.id), { status: licenseStatus },
            {
                onError: () => {
                    toast.error('Error updating license status', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('License status updated', { style: toastDark })
                },
                onFinish: () => setSavePending(false)
            });
    }

    const handleResetHwid = () => {
        setShowResetDialog(false);
        setResetPending(true);
        router.post(route('licenses.resethwid', license?.id), { hwid: 'RESET' },
            {
                onError: () => {
                    toast.error('Error resetting HWID', { style: toastDark })
                },
                onSuccess: () => {
                    toast.success('HWID reseted', { style: toastDark })
                },
                onFinish: () => setResetPending(false)
            });
    }

    const handleDelete = () => {
        setShowDeleteDialog(false);
        setDeletePending(true);
        router.delete(route('licenses.delete', license?.id), {
            onError: () => {
                toast.error('Error deleting license', { style: toastDark })
            },
            onSuccess: () => {
                toast.success('License deleted', { style: toastDark })
            },
            onFinish: () => setDeletePending(false)
        });
    }

    useEffect(() => {
        setSaveEnabled(licenseStatus !== license?.status);
    }, [licenseStatus]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "unused":
                return (
                    <Badge className="text-sm badge-primary">
                        <CircleDashed size={14} className='mr-1' />
                        Unused
                    </Badge>
                )
            case "active":
                return (
                    <Badge className='text-sm badge-success'>
                        <CheckCircle size={14} className='mr-1' />
                        Active
                    </Badge>
                )
            case "expired":
                return (
                    <Badge className='text-sm badge-danger'>
                        <ClockAlert size={14} className='mr-1' />
                        Expired
                    </Badge>
                )
            case "revoked":
                return (
                    <Badge className='text-sm badge-danger'>
                        <Ban size={14} className='mr-1' />
                        Revoked
                    </Badge>
                )
            default:
                return <Badge variant="outline">
                    <CircleHelp size={14} className='mr-1' />
                    Unknown
                </Badge>
        }
    }

    const formattedDate = new Date(license?.created_at).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <AuthenticatedLayout>
            <Head title="License Details" />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">License Details</h2>
                </div>
                <Card className="mb-8">

                    <Deferred data="license" fallback={
                        <div className='flex items-center justify-center py-12'>
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-700" size={32} />
                        </div>
                    }>
                        <>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">
                                            <LayoutGrid className='inline mb-1 mr-1' size={22} />
                                            <Link
                                                className='hover:underline hover:text-indigo-700'
                                                href={license?.application && route('applications.show', license?.application.id)}
                                            >{license?.application.name}</Link>
                                        </CardTitle>
                                        <CardDescription>
                                            <UserRound className='inline mb-1 mr-0.5' size={14} />
                                            Created by{' '}
                                            <Link
                                                className='hover:underline hover:text-indigo-700'
                                                href={license?.issuer && route('applications.show', license?.issuer.id)}
                                            >
                                                {license?.issuer.name}</Link> on {formattedDate}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(license?.status)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-2">License Key</h3>
                                    <div className="flex gap-2">
                                        <Input value={license?.license_key} readOnly className="font-mono bg-muted" />
                                        <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0">
                                            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            <span className="sr-only">Copy license key</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <Badge className='badge-primary aspect-square p-1.5'>
                                                <Clock1 size={16} />
                                            </Badge>
                                            <h3 className="text-lg font-medium">Duration</h3>
                                        </div>
                                        <p className='ml-9 capitalize'>{formatDuration(license?.duration, license?.lifetime)}</p>
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <Badge className='badge-primary aspect-square p-1.5'>
                                                <ClockAlert size={16} />
                                            </Badge>
                                            <h3 className="text-lg font-medium">Time Left</h3>
                                        </div>
                                        <p className='ml-9'>
                                            {
                                                (license?.status === 'unused' || license?.status === 'expired' || license?.status === 'revoked') ? (
                                                    'N/A'
                                                ) :
                                                    license?.lifetime ? (
                                                        <Infinity />
                                                    ) : (
                                                        `~ ${formatDuration(license?.time_left)}`
                                                    )}
                                        </p>
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <Badge className='badge-primary aspect-square p-1.5'>
                                                <HardDrive size={16} />
                                            </Badge>
                                            <h3 className="text-lg font-medium">HWID</h3>
                                        </div>
                                        <p className='ml-9'>
                                            {
                                                license?.hwid === null ? 'N/A'
                                                    : license?.hwid === 'RESET' ? <Label className="text-rose-600">Pending Reset</Label>
                                                        : license?.hwid
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <Badge className='badge-primary aspect-square p-1.5'>
                                                <StickyNote size={16} />
                                            </Badge>
                                            <h3 className="text-lg font-medium">Note</h3>
                                        </div>
                                        <p className='ml-9'>
                                            {license?.note}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">

                                <div className='flex flex-row gap-2'>
                                    <Select value={licenseStatus} onValueChange={setLicenseStatus}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Change status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {/* <SelectItem value="unused">Unused</SelectItem> */}
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="expired">Expired</SelectItem>
                                            <SelectItem value="revoked">Revoked</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        className='aspect-square btn-primary size-9'
                                        onClick={handleSaveStatus}
                                        disabled={!saveEnabled || savePending || !canUpdate}
                                    >
                                        {savePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check />}
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-3 w-full sm:w-auto sm:ml-auto">

                                    <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                className="btn-primary flex items-center gap-1"
                                                disabled={resetPending || license?.hwid === 'RESET' || license?.hwid === null || !canResetHwid}
                                            >
                                                {resetPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                                                Reset HWID
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Reset Hardware ID</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to reset the HWID for this license key?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                                                    Cancel
                                                </Button>
                                                <Button className='btn-primary' onClick={handleResetHwid}>
                                                    Reset
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <AddTimeDialog license={license} />

                                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                className="btn-danger flex items-center gap-1"
                                                disabled={deletePending || !canDelete}
                                            >
                                                {deletePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Delete License Key</DialogTitle>
                                                <DialogDescription>
                                                    This will permanently delete the license, This action cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="destructive" onClick={handleDelete}>
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardFooter>

                        </>
                    </Deferred>
                </Card>

                <h2 className="text-xl font-bold mb-4">Activity Log</h2>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>IP Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activityLog.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-mono text-sm">{log.date}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                        <div className="flex items-center justify-between w-full">
                            <p className="text-sm text-muted-foreground">Showing 4 of 4 entries</p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

            </div>
        </AuthenticatedLayout>
    );
}