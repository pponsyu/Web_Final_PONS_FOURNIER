module.exports = (sequelize, DataTypes) => {
    var Monkey = sequelize.define('Monkey', {
        Name: DataTypes.STRING,
        Race: DataTypes.STRING,
        Age: DataTypes.REAL,
        Weight: DataTypes.FLOAT,
        Color: DataTypes.STRING
    });

    return Monkey;
};