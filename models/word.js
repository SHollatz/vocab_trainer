module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define("Word", {
    word: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg:
            "Please epter a word with at least 1 character but no more than 255."
        }
      }
    },
    translation1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    translation2: DataTypes.STRING,
    translation3: DataTypes.STRING,
    meaning1: DataTypes.STRING,
    meaning2: DataTypes.STRING,
    meaning3: DataTypes.STRING,
    figureOfSpeech: {
      type: DataTypes.STRING,
      allowNull: false
    },
    article: DataTypes.STRING,
    gender: DataTypes.STRING,
    plural: DataTypes.STRING,
    thirdPersPresent: DataTypes.STRING,
    thirdPersonPast: DataTypes.STRING,
    thirdPersonPerfect: DataTypes.STRING,
    comparative: DataTypes.STRING,
    superlative: DataTypes.STRING,
    example: DataTypes.TEXT,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME
  });
  return Word;
};
