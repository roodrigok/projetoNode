var socket = io();
socket.on('novaPromocao', function(data){
    alert('nova promocao' + data.livro.id);
});   