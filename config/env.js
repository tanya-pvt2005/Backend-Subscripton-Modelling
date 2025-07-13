// Environment variables: key value pairs for storing configuration data outside application source code
// For security, Flexibility, Portability etc
// E.g. : PORT, DB_URL, API_KEY, SECRET_KEY


//process.env : object that stores environment variables available to application
//imports config function from dotenv package
import {config} from 'dotenv' 

//calling config function and asks to load a specific .env file with location given
// config({path:".env"})

//for multiple environments : Template string, NODE_ENV: Node Environment
config({path: `.env.${process.env.NODE_ENV || 'developement'}.local`})

// console.log(process.env)

//destructs PORT value from process.env
export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;