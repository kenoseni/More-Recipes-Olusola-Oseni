module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Favorites', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
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
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('Favorites')
};
