module.exports =  ({
  database: {
    default:true,
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "lmr_medical",
    port: 3306,
    connectionLimit: 10,
  },
  server:{
    port:5005,
    base:"/api"
  }
});
