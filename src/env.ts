import "dotenv/config"

export const ENV = {
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL || "your database url",
    SECRET_KEY: process.env.SECRET_KEY || "your secret key",
    PORT: process.env.PORT || 5000
}