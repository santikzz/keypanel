import { Header } from '@/Components/Header';
import { Sidebar } from '@/Components/Sidebar';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { Toaster } from "react-hot-toast";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {

    return (
        <div className="flex h-screen bg-black">
            <Toaster position="bottom-right" />
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

