/**
 * validate zod object
 * @param {import("zod").ZodTypeAny} schema - Zod schema to validate against.
 * @returns {import("express").RequestHandler}
 */

const validate = (schema) => (req, res, next) => {
    try {
        const validated = schema.safeParse(req.body);
        if (validated.success) {
            req.validatedBody = validated.data; // Attach validated data to request object
            next();
        } else {
            return res.status(400).json({
                error: "Schema Input Not Match",
                details: validated.error.errors,
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { validate };
