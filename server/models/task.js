'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input task title'
        }
      }
    },
    createDate: DataTypes.DATEONLY,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.category = 'backlog'
      }
    }
  });
  Task.associate = function(models) {
    Task.belongsTo(models.User)
    // associations can be defined here
  };
  return Task;
};