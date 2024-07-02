import React, { useState } from 'react';
import './cadastro.css';
import { Link } from 'react-router-dom';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrar, setLembrar] = useState(false);

    return (
            <div className="container">
                <div className="cadastro">
                    <div className="bem-vindo">
                        <h1>Bem-vindo de volta!</h1>
                        <h2>Acesse sua conta agora mesmo</h2>
                        <img src="/path/to/your/image.png" alt="Volleyball" className="volleyball-image" />
                        <button className="btn-entrar">Entrar</button>
                    </div>
                    <div className="criar-conta">
                        <h1>Criar Sua Conta</h1>
                        <h2>Preencha seus dados</h2>
                        <form>
                            <label htmlFor="opcao">SELECIONE UMA OPÇÃO</label>
                            <input type="text" name="opcao" id="opcao" />
                            <label htmlFor="nome">NOME</label>
                            <input type="text" name="nome" id="nome" />
                            <label htmlFor="email">EMAIL</label>
                            <input type="text" name="email" id="email" />
                            <label htmlFor="telefone">Numero de telefone</label>
                            <input type="text" name="telefone" id="telefone" />
                            <label htmlFor="senha">SENHA</label>
                            <input type="password" name="senha" id="senha" />
                            <button type="submit" className="btn-cadastrar">Cadastrar</button>
                            <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        );
}

export default Cadastro;
