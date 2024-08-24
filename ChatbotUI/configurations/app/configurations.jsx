import dotenv from "dotenv"
dotenv.config()

const appConfig = {
    "api_url" : process.env.API_URL
}

export default appConfig;