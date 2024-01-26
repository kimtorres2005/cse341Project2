const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

router.use('/api-docs', (req, res, next) => {
    console.log('Headers: ', req.headers);
    req.headers['z-key'] = 'laskdh55555lsdf2e12fca5fd9f5da7f870b3dllksdf654asd66sdfljiu156bt';
    next();
});

// Serve the Swagger UI at /api-docs
router.get('/api-docs', swaggerUi.setup(swaggerFile));

module.exports = router;