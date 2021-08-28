export class Player {
    id: string;
    name: string;
    isChoosing: boolean;
    isAdmin: boolean;

    constructor(name: string, id?: string, admin?: boolean) {
        this.id = id;
        this.name = name;
        this.isAdmin = admin;
    }
}
