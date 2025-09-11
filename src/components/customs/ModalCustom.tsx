'use client';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'shadcn/dialog';
import { useModalData, useModalFunction } from 'src/states/modal/modal';

export default function ModalCustom() {
    const modal = useModalData();
    const { closeModal } = useModalFunction();

    return (
        <Dialog open={modal.open} onOpenChange={closeModal}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <DialogHeader>
                    <h5>{modal.title}</h5>
                </DialogHeader>
                {modal.content}
            </DialogContent>
        </Dialog>
    );
}
