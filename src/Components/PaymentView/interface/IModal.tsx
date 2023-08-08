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

export interface IModalProgress {
    isModalOpenProgress?: boolean;
    handleCancelProgress?: () => void;
    DetailRequestId?: string
}