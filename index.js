
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 3010;
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const path = require('path');
const { Op } = require('sequelize');
// criar a rota para o POST middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// Configuracao do HandleBars
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
// rota inicial 
// renderiza o home.hbs para abra dentro da tag {{{body}}} no layout
app.get('/', (req, res) => {
  res.render('home');
});
//ativar o sistema
app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
})


// rota renderizada para o cad_users
app.get('/cad_users', (req, res) => {
  res.render('cad_users');
});

app.get('/contatos', (req, res) => {
  res.render('contatos');
});

app.get('/login', (req, res) => {
  res.render('login');
});
// rota renderizada 
app.get('/exibir_users', (req, res) => {
  Usuario.findAll().then((valores) => {
    if (valores.length > 0) {
      return res.render('exibir_users', { NavActiveUsers: true, table: true, usuarios: valores.map(valores => valores.toJSON()) });
    } else {
      res.render('exibir_users', { NavActiveUsers: true, table: false });
    }
  }).catch((err) => {
    console.log(`Houve um problema: ${err}`);
  })
});

// rota renderizada 
app.get('/editar_users', (req, res) => {
  res.render('editar_users');
});

//IMPORTAR MODEL USUARIOS


//criar a rota para receber o formulario de usuário
app.post('/insert_users', (req, res) => {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  // Salvar no Banco de Dados
  Usuario.create({
    nome: nome,
    email: email.toLowerCase(),
    senha: senha
  }).then(function() {
    console.log('Cadastro realizado com sucesso!');
    //  req.session.succes = true;
    return res.redirect('/exibir_users');
  }).catch(function(erro) {
    console.log(`Ops, deu erro: ${erro}`);
  })
});  // fim do post

app.post('/editar_users', (req, res) => {
  var id = req.body.id;
  Usuario.findByPk(id).then((dados) => {
    return res.render('editar_users', { error: false, id: dados.id, nome: dados.nome, email: dados.email, senha: dados.senha });
  }).catch((err) => {
    console.log(err);
    return res.render('editar_users', { error: true, problema: 'Não é possível editar este registro' });
  })
})

app.post('/update_users', (req, res) => {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  //ATUALIZAR REGISTRO NO BANCO DE DADOS
  Usuario.update(
    {
      nome: nome,
      email: email.toLowerCase(),
      senha: senha,
    },
    {
      where: {
        id: req.body.id
      }
    }).then((resultado) => {
      console.log(resultado);
      return res.redirect('/exibir_users');
    }).catch((err) => {
      console.log(err);
    })
})

app.post('/excluir_users', (req, res) => {
  Usuario.destroy({
    where: {
      id: req.body.id
    }
  }).then((retorno) => {
    return res.redirect('/exibir_users');
  }).catch((err) => {
    console.log(err);
  })
})


// rota renderizada para o cad_prod
app.get('/cad_prod', (req, res) => {
  res.render('cad_prod');
});

//criar a rota para receber o formulario de usuário
app.post('/insert_prod', (req, res) => {
  var descricao = req.body.descricao;
  var preco = req.body.preco;
  var vitrine = req.body.vitrine;
  var src_img = req.body.src_img;
  // Salvar no Banco de Dados
  Produto.create({
    descricao: descricao,
    preco: preco,
    vitrine: vitrine,
    src_img: src_img
  }).then(function() {
    console.log('Cadastro realizado com sucesso!');
    //  req.session.succes = true;
    return res.redirect('/exibir_prod');
  }).catch(function(erro) {
    console.log(`Ops, deu erro: ${erro}`);
  })
});  // fim do post




app.get('/editar_prod', (req, res) => {
  res.render('editar_prod');
});

app.post('/editar_prod', (req, res) => {
  var id = req.body.id;
  Produto.findByPk(id).then((dados) => {
    return res.render('editar_prod', { error: false, id: dados.id, descricao: dados.descricao, preco: dados.preco, vitrine: dados.vitrine, src_img: dados.src_img });
  }).catch((err) => {
    console.log(err);
    return res.render('editar_prod', { error: true, problema: 'Não é possível editar este registro' });
  })
})

app.post('/update_prod', (req, res) => {
  var descricao = req.body.descricao;
  var preco = req.body.preco;
  var src_img = req.body.src_img
  var vitrine = req.body.vitrine;
  //ATUALIZAR REGISTRO NO BANCO DE DADOS
  Produto.update(
    {
      descricao: descricao,
      preco: preco,
      vitrine: vitrine,
      src_img: src_img,
    },
    {
      where: {
        id: req.body.id
      }
    }).then((produtos) => {
      console.log(produtos);
      return res.redirect('/exibir_prod');
    }).catch((err) => {
      console.log(err);
    })
})

// rota renderizada 
app.get('/exibir_prod', (req, res) => {
  Produto.findAll().then((produtos) => {
    if (produtos.length > 0) {
      console.log(produtos);
      return res.render('exibir_prod', { NavActiveUsers: true, table: true, produtos: produtos.map(produtos => produtos.toJSON()) });

    } else {
      res.render('exibir_prod', { NavActiveUsers: true, table: false });
    }
  }).catch((err) => {
    console.log(`Houve um problema: ${err}`);
  })
});

// rota renderizada 
app.get('/mostra_produtos_geral', (req, res) => {
  Produto.findAll().then((produtos) => {
    if (produtos.length > 0) {
      return res.render('mostra_produtos_geral', { NavActiveUsers: true, table: true, produtos: produtos.map(produtos => produtos.toJSON()) });

    } else {
      res.render('mostra_produtos_geral', { NavActiveUsers: true, table: false });
    }
  }).catch((err) => {
    console.log(`Houve um problema: ${err}`);
  })
});


app.post('/excluir_prod', (req, res) => {
  Produto.destroy({
    where: {
      id: req.body.id
    }
  }).then((retorno) => {
    return res.redirect('/exibir_prod');
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/produtos', (req, res) => {
  Produto.findAll({
    where: {
      vitrine: true
    }
  }).then((produtos) => {
    if (produtos.length > 0) {
      console.log('Acessei a vitrine!');
      return res.render('produtos', { NavActiveUsers: true, table: true, produtos: produtos.map(produtos => produtos.toJSON()) });

    } else {
      res.render('produtos', { NavActiveUsers: true, table: false });
    }
  }).catch((err) => {
    console.log(`Houve um problema: ${err}`);
  });
});


app.get('/pesquisa_produto', (req, res) => {
  const descricao = req.query.descricao; 
  console.log(descricao); 
  Produto.findAll({
    where: {
      descricao: {
        [Op.like]: `%${descricao}%`
      }
    }
  }).then((produtos) => {
    if (produtos.length > 0) {
      console.log('Acessei a pesquisa!');
      const produtosJSON = produtos.map((produto) => produto.toJSON()); 
      return res.render('pesquisa_produto', { produtos: produtosJSON });
    } else {
      return res.render('pesquisa_produto', { mensagem: 'Nenhum produto encontrado.' });
    }
  }).catch((err) => {
    console.log(`Houve um problema: ${err}`);
    return res.render('pesquisa_produto', { mensagem: 'Ocorreu um erro durante a pesquisa.' });
  });
});