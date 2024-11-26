import { useEffect, useState } from 'react';
import api from '../services/api';
import NavBar from "./NavBar";

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
        <>
        <NavBar />
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Jogadores</h1>
            <form className="mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}  // Atualiza o estado de pesquisa
                    className="border p-2 rounded w-full"
                />
            </form>

            {/* Renderiza a lista de jogadores */}
            {users.length === 0 ? (
                <p className="text-gray-500">Nenhum jogador encontrado.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div key={user.id} className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg">
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-600">Email: {user.email}</p>
                            <p className="text-gray-600">Idade: {user.age}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
}

export default Home;
