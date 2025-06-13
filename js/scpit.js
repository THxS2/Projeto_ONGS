document.addEventListener('DOMContentLoaded', function() {
    // Carrega necessidades do localStorage
    const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    const destaques = document.getElementById('destaques-necessidades');

    // Formata data (função local)
    function formatarData(dataString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dataString).toLocaleDateString('pt-BR', options);
    }
});