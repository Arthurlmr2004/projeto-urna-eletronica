let seuVotoPara = document.querySelector('.divisao-1-texto span');
let cargo = document.querySelector('.divisao-1-cargo span');
let descricao = document.querySelector('.divisao-1-informacoes');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-1-direita');
let numeros = document.querySelector('.divisao-1-numeros');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

document.querySelectorAll('.teclado--botao').forEach(botao => {
    botao.addEventListener('click', () => clicou(botao.textContent));
});
document.querySelector('.botao--branco').addEventListener('click', branco);
document.querySelector('.botao--corrige').addEventListener('click', corrige);
document.querySelector('.botao--confirma').addEventListener('click', confirma);


function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].pequeno) {
                fotosHtml += `<div class="divisao-1-imagem pequeno"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="divisao-1-imagem"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    if (n !== 'BRANCO' && n !== 'CORRIGE' && n !== 'CONFIRMA') {
        let elementoNumero = document.querySelector('.numero.pisca')
        if (elementoNumero !== null) {
            elementoNumero.innerHTML = n;
            numero = `${numero}${n}`;

            elementoNumero.classList.remove('pisca');
            if (elementoNumero.nextSibling !== null) {
                elementoNumero.nextSibling.classList.add('pisca');
            } else {
                atualizarInterface();
            }
        }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    } else {
        alert("Para votar em BRANCO, o campo de voto deve estar vazio!");
    }

}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();