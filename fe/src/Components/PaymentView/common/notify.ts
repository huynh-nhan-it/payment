type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const openNotificationWithIcon = (type: NotificationType, api: any, data: any) => {
    api[type](data);
};