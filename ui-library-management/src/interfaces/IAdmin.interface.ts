export interface IAdmin{
    id?: number;
    name: string;
    password?: string;
}

export interface IAdminLogin{
    name: string;
    password: string;
}

export interface IManageAdmin{
    adminInfo: IAdmin;
    onChangePassword: boolean;
}