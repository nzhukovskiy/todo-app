export class CreateTaskDto {
    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }

    title: string;
    description: string;
}