const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            secrete_id:{
                type:Sequelize.INTEGER,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true,
            },
            id:{
                type:Sequelize.STRING(30),
                allowNull:false,
                unique:true,
            },
            password:{
                type: Sequelize.STRING(45),
                allowNull:false,
            },
            nickname:{
                type: Sequelize.STRING(15),
                allowNull:false,
            },
            email:{
                type: Sequelize.STRING(45),
                allowNull:true,
                unique:true,
            },
            phone:{
                type: Sequelize.STRING(45),
                allowNull:true,
                unique:true,
            },
            blogName:{
                type: Sequelize.STRING(45),
                allowNull:false,
                unique:true,
            }

        },{
            sequelize,
            timestamps:true,
            underscored: false,
            modelName:'User',
            tableName: 'usersinfo',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }

    static associate(db){
        db.User.hasMany(db.Content,{ foreignKey:'idcontents', sourceKey:'secrete_id'});
    }
};