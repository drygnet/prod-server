interface IJsonSchemaBase {
    description?: string;
}

export interface IJsonSchema extends IJsonSchemaBase {
    bsonType: 'object';
    required?: string[];
    properties: {
        [name: string]:
        |
        IJsonSchemaEnum |
        IJsonSchemaString |
        IJsonSchemaDouble |
        IJsonSchemaInt |
        IJsonSchemaArray
    };
}

interface IJsonSchemaEnum extends IJsonSchemaBase {
    enum: string[];
}

interface IJsonSchemaString extends IJsonSchemaBase {
    bsonType: 'string';
    pattern?: string;
}

interface IJsonSchemaInt extends IJsonSchemaBase {
    bsonType: 'int';
    minimum?: number;
    maximum?: number;
}

interface IJsonSchemaDouble extends IJsonSchemaBase {
    bsonType: 'double';
}

interface IJsonSchemaArray extends IJsonSchemaBase {
    bsonType: 'array';
    items: IJsonSchema[];
}
