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
});