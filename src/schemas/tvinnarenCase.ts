import { IjsonSchema } from '../models/jsonSchema';

const tvinnarenCase: IjsonSchema = {
    bsonType: 'object',
    required: ['caseId', 'title'],
    properties: {
        caseId: { bsonType: 'int' },
        title: { bsonType: 'string' },
        status: { enum: ['nytt', 'stängt'] },
        subcases: {
            bsonType: 'array',
            items: [
                {
                    bsonType: 'object',
                    properties: {
                        status: { enum: ['nytt', 'arbetar'] }
                    }
                }
            ]

        }
    }

}