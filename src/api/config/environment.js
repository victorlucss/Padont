import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT;

export default {
  port: PORT
};