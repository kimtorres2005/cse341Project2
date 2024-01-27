const swaggerAutogen = require('swagger-autogen')();

const doc = {
        info: {
            title: 'CSE341 Project2 API',
            version: '1.0.0',
            description: 'A simple recipes API for CSE341 to GET, POST, PUT, and DELETE recipes.',
        },
        host: 'cse341project2-iu4l.onrender.com',
        schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
