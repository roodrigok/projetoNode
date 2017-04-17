module.exports = function (app) {
    app.get('/', function (req, res) {
        var connection = app.infra.connectionFactory();
        var livrosDAO = new app.infra.ProdutosDAO(connection);
        livrosDAO.lista(function (err, results) {
            res.render('home/index', { livros: results });
        });

        connection.end();
    });
}