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
    createdByUser: {
      type: Sequelize.UUID,
      refrences: {
        model: "students",
        key: "id",
      },
    },
  });

  Course.associate = (models) => {
    Course.belongsTo(models.students, {
      foreignKey: "createdByUser",
      as: "createdUserInfo",
    });
  };
  return Course;
};
