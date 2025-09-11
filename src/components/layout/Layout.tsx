import React from 'react';
import Header from './header/Header';
import Sidebar from './Sidebar';
import ModalCustom from '../customs/ModalCustom';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <main className="pt-16 pl-64">
                <div className="p-6">{children}</div>
            </main>
            <ModalCustom />
        </div>
    );
}
