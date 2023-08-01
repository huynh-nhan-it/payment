export interface IModal {
    isModalOpen?: boolean;
    handleOk?: (value: any, type: any) => void;
    handleCancel?: () => void;
    type?: string
}

export interface IModalShare {
    isModalOpenShare?: boolean;
    handleOkShare?: (value: any) => void;
    handleCancelShare?: () => void;
}