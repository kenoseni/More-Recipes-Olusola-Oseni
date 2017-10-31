import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name field cannot be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Allows only alphanumeric characters'
        }
      },
      set(value) {
        this.setDataValue('name', value.toString().toLowerCase().trim());
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email field cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Please supply the right email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password field cannot be empty'
        },
        len: {
          args: [8],
          msg: 'Password must contain a minimum of 8 characters'
        }
      },
    }
  }, {
    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    }
  });
  // associate the models
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes'
    });
  };
  return User;
};
