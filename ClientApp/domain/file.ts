export class File {
    name: string;
    filetype: FileType;
    isPaused: boolean;
    id: number;
    unmodifiedFile: any;
}

export enum FileType {
    script,
    css,
    html
}

export class Connection{
    id: number;
    files: File[];
    connectionstring: string;
    name: string;
}