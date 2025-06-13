document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById('listaNecessidades');
    const pesquisa = document.getElementById('pesquisa');
    const filtroTipo = document.getElementById('filtroTipo');

    function carregarNecessidades(termo = '', tipo = '') {
        const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

        const resultados = necessidades.filter(necessidade => {
            const matchTexto =
                necessidade.tituloNecessidade.toLowerCase().includes(termo.toLowerCase()) ||
                necessidade.descricao.toLowerCase().includes(termo.toLowerCase());

            const matchTipo = !tipo || necessidade.tipoAjuda === tipo;

            return matchTexto && matchTipo;
        });

        lista.innerHTML = resultados.length > 0
            ? resultados.map(criarCardNecessidade).join('')
            : '<p class="sem-resultados">Nenhuma necessidade encontrada.</p>';
    }

    function criarCardNecessidade(necessidade) {
        const dataFormatada = new Date(necessidade.dataCadastro).toLocaleDateString('pt-BR');
        const id = necessidade.dataCadastro;

        return `
            <div class="necessidade-card" data-id="${id}">
                <div class="card-header">
                    <h3>${necessidade.tituloNecessidade}</h3>
                    <span class="tipo ${necessidade.tipoAjuda.replace(/\s+/g, '-').toLowerCase()}">
                        ${necessidade.tipoAjuda}
                    </span>
                </div>
                <p class="instituicao">${necessidade.nomeInstituicao}</p>
                <p class="descricao">${necessidade.descricao}</p>
                <div class="card-footer">
                    <span class="local">📍 ${necessidade.endereco.cidade}/${necessidade.endereco.estado}</span>
                    <span class="data">📅 ${dataFormatada}</span>
                </div>
                <a href="mailto:${necessidade.contato}" class="btn-contato">✉️ Contatar</a>
                <button class="btn-excluir" onclick="excluirNecessidade('${id}')">🗑️ Excluir</button>
            </div>
        `;
    }

    window.excluirNecessidade = function (id) {
        if (!confirm("Tem certeza que deseja excluir esta necessidade?")) return;

        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

        necessidades = necessidades.filter(n => n.dataCadastro !== id);

        localStorage.setItem('necessidades', JSON.stringify(necessidades));

        carregarNecessidades(pesquisa.value, filtroTipo.value);
    };

    pesquisa.addEventListener('input', () => carregarNecessidades(pesquisa.value, filtroTipo.value));
    filtroTipo.addEventListener('change', () => carregarNecessidades(pesquisa.value, filtroTipo.value));

    carregarNecessidades();
});





 