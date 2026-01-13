
export interface IUser {
    id: number;
    email: string;
    username:string;
    phone: string;
    first_name: string;
    last_name: string;
    image_small: string | null;
    image_medium: string | null;
    image_large: string | null;
}