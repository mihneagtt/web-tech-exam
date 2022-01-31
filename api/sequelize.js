require('dotenv').config({});
const { Sequelize } = require('sequelize');
let sequelize;
if(process.env.NODE_ENV === 'development'){
  sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './sqlite/database.db'
  });
}else{
  sequelize = new Sequelize(process.env.DATABASE_URL,{
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl:{
          require:true,
          rejectUnauthorized:false
        }
      }
  })
}

sequelize.sync({}).then(() => {
  console.log("All models were synchronized successfully!");
})

module.exports = sequelize;