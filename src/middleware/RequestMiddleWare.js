const validateRequest = async (req, res, next) => {
    const {name} = req.body;
    if(name) {
        console.log("Constraint passed");
        next();
    } else {
        res.status(400).json({
            message: "Bad request, name is required."
        })
    }
}

module.exports = validateRequest;