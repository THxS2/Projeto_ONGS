const form = document.getElementById('necessidadeForm');
form.addEventListener('submit', function(event) {
    onst cepInput = document.getElementById('cep');
const buscarCepBtn = document.getElementById('buscarCep');

buscarCepBtn.addEventListener('click', function() {
    const cep = cepInput.value.replace(/\D/g, '');
    
});
}