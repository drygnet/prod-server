import { IJsonSchema } from "../../models/jsonSchema";

const tvinnarenCase: IJsonSchema = {
    bsonType: "object",
    properties: {
        caseId: { bsonType: "int" },
        status: { enum: ["nytt", "stängt"] },
        subcases: {
            bsonType: "array",
            items: [
                {
                    bsonType: "object",
                    properties: {
                        status: { enum: ["nytt", "arbetar"] }
                    }
                }
            ]

        },
        title: { bsonType: "string" }

    },
    required: ["caseId", "title"]
};

export default tvinnarenCase;
