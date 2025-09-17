'use client';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'shadcn/dialog';
import { useModalData, useModalFunction } from 'src/states/modal/modal';

export default function ModalCustom() {
    const modal = useModalData();
    const { closeModal } = useModalFunction();

    return (
        <Dialog open={modal.open} onOpenChange={closeModal}>
            <DialogContent className="w-105 max-w-md bg-secondary">
                <DialogHeader className="mb-4">
                    <DialogTitle>{modal.title}</DialogTitle>
                </DialogHeader>
                {modal.content}
            </DialogContent>
        </Dialog>
    );
}
