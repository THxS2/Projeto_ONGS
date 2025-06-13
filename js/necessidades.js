document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('listaNecessidades');
    const pesquisa = document.getElementById('pesquisa');
    const filtroTipo = document.getElementById('filtroTipo');

    // Carrega e exibe necessidades
    function carregarNecessidades(termo = '', tipo = '') {
        const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        
        // Filtra resultados
        const resultados = necessidades.filter(necessidade => {
            const matchTexto = 
                necessidade.tituloNecessidade.toLowerCase().includes(termo.toLowerCase()) || 
                necessidade.descricao.toLowerCase().includes(termo.toLowerCase());
            
            const matchTipo = !tipo || necessidade.tipoAjuda === tipo;
            
            return matchTexto && matchTipo;
        });

        // Exibe resultados
        lista.innerHTML = resultados.length > 0 
            ? resultados.map(criarCardNecessidade).join('')
            : '<p class="sem-resultados">Nenhuma necessidade encontrada.</p>';
    }
});


 