if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    export const HOST = 'http://localhost:5000/api';
else
    export const HOST = 'https://pincode-backend.ru/api';
