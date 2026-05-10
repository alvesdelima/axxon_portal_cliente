const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const campoUsuario = document.getElementById('username');
    const campoSenha = document.getElementById('password');

    // Verificação de segurança: se algum campo for null, avisa no console
    if (!campoUsuario || !campoSenha) {
        console.error("ERRO: Campos não encontrados no HTML. Verifique os IDs 'username' e 'password'.");
        return;
    }

    const username = campoUsuario.value;
    const password = campoSenha.value;

    console.log("Tentando logar com:", username);

    // URL do seu Webhook de Teste (use o de Produção depois)
    const N8N_WEBHOOK_URL = CONFIG.N8N_WEBHOOK_URL;;

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({ username, password }), // Enviando username
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.authenticated) {
            // Sessão salva no navegador
            localStorage.setItem('axxon_token', data.token);
            localStorage.setItem('axxon_role', data.role); // 'admin' ou 'cliente'
            localStorage.setItem('axxon_nome', data.nome);
            localStorage.setItem('axxon_cliente_id', data.cliente_id);

            window.location.href = 'dashboard.html';
        } else {
            alert('Erro: ' + data.message);
        }
    } catch (error) {
        console.error('Falha na autenticação:', error);
        alert('O servidor de autenticação não respondeu.');
    }
});