import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState('');  // Estado para o campo de pesquisa

    // Função para buscar os usuários filtrados
    async function getUsers(name = '') {
        try {
            const usersFromApi = await api.get('/usuarios', {
                params: {
                    name: name,  // Envia o parâmetro de pesquisa para a API
                },
            });
            setUsers(usersFromApi.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    // Efeito para buscar os jogadores ao carregar a página e ao alterar a pesquisa
    useEffect(() => {
        getUsers(searchName);
    }, [searchName]);  // Atualiza a lista de jogadores quando o valor de 'searchName' mudar

    return (
        <div className="container">
            <form>
                <h1>Jogadores</h1>
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}  // Atualiza o estado de pesquisa
                />
            </form>

            {/* Renderiza a lista de jogadores */}
            {users.map(user => (
                <div key={user.id}>
                    <div>
                        <p>Nome: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Idade: {user.age}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
