
const customMiddleware = (req, res, next) => {
    console.log(`Request received at ${new Date().toISOString()}`);
    next();
}
const authMiddleware = (req, res, next) => {
    if (req.headers.authorization) {
        console.log('User authenticated');
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};
const loggerMiddleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
};

module.exports = { customMiddleware, authMiddleware, loggerMiddleware };