import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(
  "postgres://usaid:yourpassword@localhost:5432/testdb"
);

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

User.sync().then(() => {
  console.log("User Model synced");
});
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

export { User };
