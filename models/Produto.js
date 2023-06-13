const db = require('./db');
const Produto = db.sequelize.define('produtos', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  descricao: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: db.Sequelize.REAL,
    allowNull: false
  },
  vitrine: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false
  },
  src_img: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
})
// Sincronizr com o BD, 
//se não existir esta tabela durante a execução ele //vai criar no BD
Produto.sync();
module.exports = Produto;

