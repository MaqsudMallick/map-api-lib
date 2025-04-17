import { ObjectSchema, ValidationErrorItem } from "joi";

export const validateSchema = <T>(schema: ObjectSchema, object: T) : ValidationErrorItem[] | null => {
    if (schema.validate(object, {convert: false}).error) {
        const errorMessage = schema.validate(object, {convert: false}).error!.details;
        return errorMessage
    }
    return null
}