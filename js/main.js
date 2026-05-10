document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('axxon_role');
    const nome = localStorage.getItem('axxon_nome');
    const container = document.getElementById('dash-content');

    // 1. Proteção: Se não tiver logado, volta pro login
    if (!role) {
        window.location.href = 'index.html';
        return;
    }

    // 2. Lógica de Visão
    if (role === 'admin') {
        renderAdminDashboard(nome, container);
    } else {
        const clienteId = localStorage.getItem('axxon_cliente_id');
        renderClienteDashboard(nome, clienteId, container);
    }
});

// VISÃO DO ADMIN (Você vê os cards)
function renderAdminDashboard(nome, container) {
    container.innerHTML = `
        <header class="dash-header">
            <h2>Bem-vinda, ${nome} 👋</h2>
            <p>Selecione um cliente para analisar a performance</p>
        </header>
        <div class="grid-clientes" id="grid-clientes">
            <div class="card-cliente" onclick="verDash('abc-123')">
                <h3>Empresa Exemplo</h3>
                <span>ID: abc-123</span>
                <button>Ver Performance</button>
            </div>
        </div>
    `;
}

// VISÃO DO CLIENTE (Ele vê o dash dele)
function renderClienteDashboard(nome, id, container) {
    container.innerHTML = `
        <header class="dash-header">
            <h2>Olá, ${nome}</h2>
            <p>Acompanhe seus resultados em tempo real</p>
        </header>
        <div class="iframe-container">
            <iframe src="https://seu-dash-especifico.com/${id}" frameborder="0"></iframe>
        </div>
    `;
}

// Função para o Admin "entrar" no dash do cliente
function verDash(id) {
    localStorage.setItem('cliente_selecionado', id);
    alert('Abrindo dashboard do cliente: ' + id);
    // Aqui você redirecionaria para a página do relatório
}