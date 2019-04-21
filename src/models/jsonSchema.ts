interface IjsonSchemaBase {
    description?: string
}

export interface IjsonSchema extends IjsonSchemaBase {
    bsonType: 'object'
    required?: string[];
    properties: {
        [name: string]:
        IjsonSchema |
        IjsonSchemaEnum |
        IjsonSchemaString |
        IjsonSchemaDouble |
        IjsonSchemaInt |
        IjsonSchemaArray
    },
}

interface IjsonSchemaEnum extends IjsonSchemaBase {
    enum: string[];
}

interface IjsonSchemaString extends IjsonSchemaBase {
    bsonType: 'string',
    pattern?: string
}

interface IjsonSchemaInt extends IjsonSchemaBase {
    bsonType: 'int',
    minimum?: number,
    maximum?: number
}

interface IjsonSchemaDouble extends IjsonSchemaBase {
    bsonType: 'double'
}

interface IjsonSchemaArray extends IjsonSchemaBase {
    bsonType: 'array'
    items: IjsonSchema[]
}