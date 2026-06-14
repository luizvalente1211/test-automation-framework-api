import Ajv from 'ajv'

const ajv = new Ajv()

export const validateSchema = (schema, data) => {

    const validate = ajv.compile(schema)

    const valid = validate(data)

    return {
        valid,
        errors: validate.errors
    }
}