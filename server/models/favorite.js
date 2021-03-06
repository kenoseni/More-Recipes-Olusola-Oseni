export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    name: {
      type: DataTypes.STRING
    }
  });
  // associate the models
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Favorite;
};
