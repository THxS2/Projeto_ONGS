function criarCardNecessidade(necessidade) {
    const dataFormatada = new Date(necessidade.dataCadastro).toLocaleDateString('pt-BR');
    const id = necessidade.id || necessidade.dataCadastro; // Usamos a data como identificador

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




 