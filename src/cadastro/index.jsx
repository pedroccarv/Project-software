import React, { useState } from 'react';
import './cadastro.css';
import { Link } from 'react-router-dom';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para lidar com o cadastro
    };

    return (
        <div className="container">
            <div className="cadastro">
                <h1>Crie uma conta</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Verifique seu e-mail" 
                        value={verifyEmail} 
                        onChange={(e) => setVerifyEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="btn-cadastrar">Criar perfil gratuito</button>
                </form>
                <p className="terms">
                    Ao se registrar, você está de acordo com nossos <a href="#">termos e condições</a> e confirma estar ciente de nossa <a href="#">política de privacidade</a>.
                </p>
                <p className="login">
                    Já tem uma conta? <Link to="/login">Faça seu login!</Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro;
