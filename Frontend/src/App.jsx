
import { useState } from 'react'
import './App.css'
import AdminDashboard from './adminDashboard'

function App() {
  const [tipoAcesso, setTipoAcesso] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setErro('')

    if (
      tipoAcesso === 'admin' &&
      usuario === 'admin' &&
      senha === 'Admin@123'
    ) {
      return
    }

    setErro('Usuário ou senha incorretos!')
  }

  if (
    tipoAcesso === 'admin' &&
    usuario === 'admin' &&
    senha === 'Admin@123'
  ) {
    return <AdminDashboard />
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-logo">
          <span>🐾</span>
          <h1>PetShop</h1>
          <p>Sistema de Gerenciamento</p>
        </div>

        <h2>Bem-vindo!</h2>
        <p className="login-subtitle">
          Faça login para acessar o sistema.
        </p>

        <form onSubmit={handleLogin}>
          <label>Tipo de acesso</label>
          <select
            value={tipoAcesso}
            onChange={(e) => setTipoAcesso(e.target.value)}
            required
          >
            <option value="">Selecione seu acesso</option>
            <option value="admin">Administrador</option>
            <option value="funcionario">Funcionário</option>
          </select>

          <label>Usuário</label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <button type="submit">
            Entrar no sistema
          </button>
        </form>

        <p className="login-footer">
          PetShop © 2026 - Todos os direitos reservados
        </p>

      </div>
    </div>
  )
}

export default App
