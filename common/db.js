var Sequelize = require('sequelize');
var config = require('./config.js');

// 创建数据库
global.sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


global.Component = sequelize.define('component', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100)
    }
}, {
    freezeTableName: true
});

global.Release = sequelize.define('release', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    componentId: {
        type: Sequelize.INTEGER,
        field: 'component_id'
    },
    componentVersion: {
        type: Sequelize.STRING(10),
        field: 'component_version'
    },
    name: {
        type: Sequelize.STRING(100)
    }

}, {
    freezeTableName: true
});