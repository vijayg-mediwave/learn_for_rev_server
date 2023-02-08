module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("courses", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allownull: false,
      primaryKey: true,
    },
    courseName: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
  });

  // Course.associate = (models) => {
  //   Course.hasOne(models.students, {
  //     foreignKey: "courseName",
  //     as: "studentInfo",
  //   });
  // };

  return Course;
};
