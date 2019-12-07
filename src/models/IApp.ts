import { IJsonSchema } from './IJsonSchema';

export interface IApp {
    collections: ICollection[];
    [x: string]: any;
}

interface ICollection {
    name: string;
    schema?: IJsonSchema;
}
