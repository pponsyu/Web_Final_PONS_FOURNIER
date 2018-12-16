module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
        Title: DataTypes.STRING,
        Size: DataTypes.REAL
    });

    return Enclos;
};