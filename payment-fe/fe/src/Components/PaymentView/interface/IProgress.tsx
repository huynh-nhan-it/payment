export interface IProgress {
    fullName: string;
    email: string;
    jobTitle: string;
    Avatar: string;
    items: Iitems[];
}

export interface Iitems {
    title: string;
    description: string;
    icon: React.ReactNode;
}