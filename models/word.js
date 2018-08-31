module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define("Word", {
    word: DataTypes.STRING,
    translation: DataTypes.STRING,
    figureOfSpeeck: DataTypes.STRING,
    article: DataTypes.STRING,
    plural: DataTypes.STRING,
    thirdPersPresent: DataTypes.STRING,
    thirdPersonPast: DataTypes.STRING,
    thirdPersonPerfect: DataTypes.STRING,
    example: DataTypes.TEXT
  });
  return Word;
};
