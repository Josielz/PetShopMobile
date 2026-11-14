import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-container">

      {/* MENU LATERAL */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>🐾 PetShop</h2>
          <p>Sistema de Gerenciamento</p>
        </div>

        <nav className="admin-menu">
          <button className="active">🏠 Visão geral</button>
          <button>👥 Funcionários</button>
          <button>🐶 Clientes</button>
          <button>📦 Produtos</button>
          <button>📊 Relatórios</button>
        </nav>

        <button className="logout-button">
          ↪ Sair do sistema
        </button>

      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="admin-main">

        <header className="admin-header">
          <div>
            <h1>Painel Administrativo</h1>
            <p>Bem-vindo ao sistema de gerenciamento!</p>
          </div>

          <div className="admin-user">
            👤 Administrador
          </div>
        </header>

        <section className="admin-welcome">
          <h2>Olá, Administrador! 👋</h2>
          <p>
            Acompanhe as principais informações
            do seu PetShop.
          </p>
        </section>

        {/* INDICADORES */}
        <section className="admin-cards">

          <div className="admin-card">
            <span>👥</span>
            <h3>Funcionários</h3>
            <strong>0</strong>
            <p>Funcionários cadastrados</p>
          </div>

          <div className="admin-card">
            <span>🐶</span>
            <h3>Clientes</h3>
            <strong>0</strong>
            <p>Clientes cadastrados</p>
          </div>

          <div className="admin-card">
            <span>📦</span>
            <h3>Produtos</h3>
            <strong>0</strong>
            <p>Produtos cadastrados</p>
          </div>

          <div className="admin-card">
            <span>📊</span>
            <h3>Relatórios</h3>
            <strong>0</strong>
            <p>Relatórios disponíveis</p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;