export class Player {
    id: string;
    name: string;
    choosing: boolean;

    constructor(name: string, id?: string) {
        this.id = id;
        this.name = name;
    }
}
