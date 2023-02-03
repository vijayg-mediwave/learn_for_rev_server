module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allownull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      //allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      //allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      //allowNull: false,
    },
    course: {
      type: Sequelize.STRING,
      //allowNull: false,
    },
  });
  return Student;
};
