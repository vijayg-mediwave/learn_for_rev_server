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
    },
    password: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    course: {
      type: Sequelize.UUID,
    },
  });

  Student.associate = (models) => {
    Student.belongsTo(models.courses, {
      foreignKey: "course",
      as: "courseInfo",
    });
  };
  return Student;
};
