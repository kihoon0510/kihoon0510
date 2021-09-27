const Sequelize = require('sequelize');

module.exports = class Content extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            idcontents:{
                type:Sequelize.STRING(30),
                allowNull:false,
                primaryKey:true,
            },
            content:{
                type: Sequelize.TEXT,
                allowNull:true,
            },
            
            title:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            category:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,
            underscored: false, 
            modelName:'Content',
            tableName: 'contents',
            paranoid:true,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){
        db.Content.belongsTo(db.User,{foreignKey:'idcontents', targetKey:'secrete_id'});
    }
}