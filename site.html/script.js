JavaScript

const elementos =
document.qyerySelectorAll('.servico');

function mostrarAoRolar() {
    const alturaTela = window.innerHeight;

    elementos.forEach(el => {
        const posicao = 
        el.getBoundingClientRect().top;

            if (posicao < alturaTela - 100) {
                el.style.opacity = 1;
                el.style.transform = 
                'translateY(0)';

            }
        
    });
}

window.addEventListener('scroll',
    mostrarAoRolar);

    //ESSA LINHA É A CHAVE
    mostrarAoRolar();

    alert("JS funcionando!");