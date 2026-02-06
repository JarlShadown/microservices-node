import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book Service API",
            version: "1.0.0",
            description: "API documentation for the Book Management Service",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
