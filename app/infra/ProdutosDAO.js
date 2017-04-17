function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function (callback) {
    this._connection.query('select * from produtos', callback);
}

ProdutosDAO.prototype.salvar = function (produto, callback) {
    this._connection.query('INSERT INTO produtos(titulo, descricao, preco) VALUES (?, ?, ?)', [produto["tituloLivro"], produto["descricaoLivro"], parseFloat(produto["precoLivro"])], callback);
}

ProdutosDAO.prototype.remover = function (id, callback) {
    this._connection.query('delete from produtos where id = ?', id, callback);
}

module.exports = function () {
    return ProdutosDAO;
}