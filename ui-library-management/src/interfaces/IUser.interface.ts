export interface IUser{
    id?: number;
    name: string;
    email: string;
    password?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

// export interface IManageUser{
//     name: string;
//     password?: string;
//     confirmPassword?: string;
// }