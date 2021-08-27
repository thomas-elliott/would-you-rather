export class Player {
    id: string;
    name: string;
    choosing: boolean;
    admin: boolean;

    constructor(name: string, id?: string, admin?: boolean) {
        this.id = id;
        this.name = name;
        this.admin = admin;
    }
}
