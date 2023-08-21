export default () => ({
   port: parseInt(process.env.PORT) || 3000,
   jwt: process.env.JWT_KEY,
   
   mail_host: process.env.MAIL_HOST,
   mail_port: parseInt(process.env.MAIL_PORT, 10),
   mail_user: process.env.MAIL_USER,
   mail_pass: process.env.MAIL_PASS,
   mail_from: process.env.MAIL_FROM,
   
   database: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      timezone: process.env.TIMEZONE,
   }
})           