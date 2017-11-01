module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    ingredients: {
      type: Sequelize.STRING
    },
    directions: {
      type: Sequelize.TEXT
    },
    time: {
      type: Sequelize.INTEGER
    },
    upvotes: {
      type: Sequelize.INTEGER
    },
    downvotes: {
      type: Sequelize.INTEGER
    },
    views: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
