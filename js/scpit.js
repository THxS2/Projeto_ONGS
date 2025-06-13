document.addEventListener('DOMContentLoaded', function() {
    // Carrega necessidades do localStorage
    const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    const destaques = document.getElementById('destaques-necessidades');

    // Formata data (função local)
    function formatarData(dataString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dataString).toLocaleDateString('pt-BR', options);
    }

    // Exibe as últimas 3 necessidades
    if (necessidades.length > 0) {
        const ultimas = necessidades.slice(-3).reverse();
        destaques.innerHTML = ultimas.map(necessidade => `
            <div class="necessidade-destaque">
                <h3>${necessidade.tituloNecessidade}</h3>
                <p><strong>Instituição:</strong> ${necessidade.nomeInstituicao}</p>
                <p><strong>Tipo:</strong> ${necessidade.tipoAjuda}</p>
                <p><strong>Local:</strong> ${necessidade.endereco.cidade}/${necessidade.endereco.estado}</p>
                <p><strong>Data:</strong> ${formatarData(necessidade.dataCadastro)}</p>
                <a href="necessidades.html" class="btn-small">Ver todas</a>
            </div>
        `).join('');
    } else {
        destaques.innerHTML = '<p>Nenhuma necessidade cadastrada ainda. Seja o primeiro a ajudar!</p>';
    }
});