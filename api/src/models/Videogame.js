const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [3, 45],
          msg: `game's name needed 3-45 letters`
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: {
          args: true,
          msg: 'FLOAT numbers only'
        },
        min: {
          args: 0.1,
          msg: 'valor minimo 0.0'
        },
        max: {
          args: 10.0,
          msg: 'El valor maximo 10.0'
        }
      }
    }, 
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      validate: {
        validatePlatforms(value){
          if(!value.length){
            throw new Error('should select at least one platform')
          }
        }
      }
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {timestamps: false});
};


// - ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// - Nombre *
// - Descripción *
// - Fecha de lanzamiento
// - Rating
// - Plataformas *