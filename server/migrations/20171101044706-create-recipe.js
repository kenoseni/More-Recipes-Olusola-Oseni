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
    upvotes: {
      type: Sequelize.NUMBER
    },
    downvotes: {
      type: Sequelize.NUMBER
    },
    view: {
      type: Sequelize.NUMBER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
