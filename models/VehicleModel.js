import { Sequelize } from "sequelize";
import db from "../config/Database.js"; 
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Vehicles = db.define('vehicle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    variant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.ENUM('available', 'not available'),
        allowNull: false,
        defaultValue: 'available'
    }, 
    image1: {
        type: DataTypes.STRING,
        allowNull: false // Change this to false if image1 is required
    },
    image2: {
        type: DataTypes.STRING,
        allowNull: true // Change this to false if image2 is required
    },
    image3: {
        type: DataTypes.STRING,
        allowNull: true // Change this to false if image3 is required
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Vehicles);
Vehicles.belongsTo(Users, { foreignKey: 'userId' });

export default Vehicles;