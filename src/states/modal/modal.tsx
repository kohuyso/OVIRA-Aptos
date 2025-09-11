import { ReactNode } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { DialogContentProps } from '@radix-ui/react-dialog';

export type TModalData = {
    open: boolean;
    title: string | ReactNode;
    subTitle?: string | ReactNode;
    isShowCloseModal?: boolean;
    modalProps?: Omit<DialogContentProps, 'open'>;
    conditionOpen?: boolean | (() => boolean);
    content?: ReactNode;
};

const initData: TModalData = {
    open: false,
    title: '',
    subTitle: '',
    isShowCloseModal: true,
    modalProps: undefined,
    conditionOpen: true,
    content: <></>,
};

const modalData = atom(initData);

export const useModalData = () => useAtomValue(modalData);
export const useModalFunction = () => {
    const _setModalData = useSetAtom(modalData);

    function setModalData(data: Partial<TModalData>) {
        _setModalData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }
    function openModal(data: Omit<TModalData, 'open'>) {
        setModalData({ ...data, open: true });
    }

    function closeModal() {
        setModalData({
            title: '',
            subTitle: '',
            conditionOpen: true,
            open: false,
        });
    }

    function clearModalData() {
        _setModalData(initData);
    }

    return {
        setModalData,
        openModal,
        closeModal,
        clearModalData,
    };
};
