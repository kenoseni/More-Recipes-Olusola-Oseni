export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Recipe name cannot be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Allows only alphanumeric characters'
        },
        len: {
          args: [2, 25],
          msg: 'Recipe name should be between 2 and 25 characters'
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'List of ingredients cannot be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Allows only alphanumeric characters'
        },
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'List of ingredients cannot be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Allows only alphanumeric characters'
        },
      }
    },
    upvotes: {
      type: DataTypes.NUMBER,
      allowNull: false,
      isNumeric: {
        args: true,
        msg: 'Allows only number'
      },
      isInt: {
        args: true,
        msg: 'Must be an integer'
      },
    },
    downvotes: {
      type: DataTypes.NUMBER,
      allowNull: false,
      isNumeric: {
        args: true,
        msg: 'Allows only number'
      },
      isInt: {
        args: true,
        msg: 'Must be an integer'
      },
    },
    view: {
      type: DataTypes.NUMBER,
      allowNull: false,
      isNumeric: {
        args: true,
        msg: 'Allows only number'
      },
      isInt: {
        args: true,
        msg: 'Must be an integer'
      }
    },
  });
  // associate the models
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'recipes'
    });
  };
  return Recipe;
};
