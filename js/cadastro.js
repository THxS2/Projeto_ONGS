document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('necessidadeForm');
    const buscarCepBtn = document.getElementById('buscarCep');

     const buscarCEP = async () => {
        const cepInput = document.getElementById('cep');
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('CEP inválido. Digite 8 dígitos.');
            cepInput.focus();
            return;
        }
        
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) throw new Error('CEP não encontrado');
            
            document.getElementById('rua').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
        } catch (error) {
            alert('Erro ao buscar CEP: ' + error.message);
        }
    };

    const validarFormulario = () => {
        const camposObrigatorios = [ 'nomeInstituicao', 'tipoAjuda', 'tituloNecessidade', 
            'descricao', 'cep', 'contato'];

        let valido = true;
        camposObrigatorios.forEach(id => {
            const campo = document.getElementById(id);
            if (!campo.value.trim()) {
                campo.classList.add('is-invalid');
                valido = false;
            } else {
                campo.classList.remove('is-invalid');
            }
        });
        return valido;
    }

    buscarCepBtn.addEventListener('click', buscarCEP);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validarFormulario()) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const novaNecessidade = {
            id: Date.now(),
            nomeInstituicao: document.getElementById('nomeInstituicao').value,
            tipoAjuda: document.getElementById('tipoAjuda').value,
            tituloNecessidade: document.getElementById('tituloNecessidade').value,
            descricao: document.getElementById('descricao').value,
            endereco: {
                cep: document.getElementById('cep').value,
                rua: document.getElementById('rua').value,
                bairro: document.getElementById('bairro').value,
                cidade: document.getElementById('cidade').value,
                estado: document.getElementById('estado').value
            },
            contato: document.getElementById('contato').value,
            dataCadastro: new Date().toISOString()
        };

        const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        necessidades.push(novaNecessidade);
        localStorage.setItem('necessidades', JSON.stringify(necessidades));
        
        alert('Cadastro realizado com sucesso!');
        form.reset();
        window.location.href = 'necessidades.html';
    });
});