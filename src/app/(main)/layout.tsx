import React from 'react';
import Layout from 'src/components/layout/Layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
