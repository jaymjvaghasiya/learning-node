const zodMiddleware = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync(req.body);
        req.body = validatedData;
        next();
    } catch(err) {
        res.status(400).json({
            message: "Validation error",
            err: err
        })
    }
}

module.exports = zodMiddleware;