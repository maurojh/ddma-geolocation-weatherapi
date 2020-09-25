window.onload = inicio;

function inicio() {
    document.addEventListener("deviceready", ajusta);
}

function ajusta() {
    var botao = document.querySelector("#localiza");
    botao.addEventListener("click", coordenadas);
}

function casoSucesso(posicao) {
    busca(posicao.coords.latitude, posicao.coords.longitude );
};

function casoErro(error) {
    let campoErro = document.querySelector("#erro");
    campoErro.innerHTML = 'código: ' + error.code + 
        "<br>" +
        'mensagem: ' + error.message;
}

function coordenadas() {
    navigator.geolocation.getCurrentPosition(casoSucesso, casoErro);
}

function busca(latitude, longitude) {
    let endereco = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${chave}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            preenche(this.responseText);
        }
    };
    xhttp.open("GET", endereco, true);
    xhttp.send();
}

function preenche(resposta) {
    let campoLatitude = document.querySelector("#lat");
    let campoLongitude = document.querySelector("#lon");
    let campoCidade = document.querySelector("#cidade");
    let campoTemperatura = document.querySelector("#temp");
    
    let objetoResposta = JSON.parse(resposta);
    
    campoLatitude.innerHTML = objetoResposta.coord.lat;
    campoLongitude.innerHTML = objetoResposta.coord.lon;
    campoCidade.innerHTML = objetoResposta.name + " (" + objetoResposta.sys.country + ")";
    campoTemperatura.innerHTML = objetoResposta.main.temp;
}








