module.exports = function (app) {

    var listaProdutos = function (req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (err, results) {
            if (err) {
                return next(err);
            }
            res.format({
                html: function () {
                    res.render('produtos/lista', { lista: results });
                },
                json: function () {
                    res.json(results);
                }
            });

        });

        connection.end();
    };

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });

    app.post('/produtos', function (req, res) {
        var produto = req.body;
        console.log(produto);

        req.assert('tituloLivro', 'Titulo é obrigatório').notEmpty();
        req.assert('precoLivro', 'Preço é obrigatório').notEmpty();
        var errosTitulo = req.validationErrors();
        if (errosTitulo) {
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', { errosValidacao: errosTitulo, produto: produto });
                },
                json: function () {
                    res.status(400).json(errosTitulo);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salvar(produto, function (err, results) {
            res.redirect('/produtos');
        });
        connection.end();
    });

    app.post('/produtos/delete', function (req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.remover(req.body.id, function (err, results) {
            res.redirect('/produtos');
        });
        connection.end();
    });
};