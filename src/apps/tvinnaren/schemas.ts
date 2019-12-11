import { IJsonSchema } from '../../models/IJsonSchema';

const tvinnarenCase: IJsonSchema = {
	bsonType: 'object',
	additionalProperties: false,
	properties: {
		_id: { bsonType: 'objectId' },
		caseId: { bsonType: 'int' },
		status: { enum: ['nytt', 'stängt'] },
		subcases: {
			bsonType: 'array',
			items:
			{
				bsonType: 'object',
				additionalProperties: false,
				required: ['status'],
				properties: {
					status: { enum: ['nytt', 'arbetar'] }
				}
			}
		},
		title: { bsonType: 'string' }
	},
	required: ['caseId', 'title']
};

export { tvinnarenCase };
