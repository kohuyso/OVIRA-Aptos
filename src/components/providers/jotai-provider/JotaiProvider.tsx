'use client';
import { Provider } from 'jotai';
import React from 'react';
import { appStore } from './AppStore';

export default function JotaiProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={appStore}>{children}</Provider>;
}
