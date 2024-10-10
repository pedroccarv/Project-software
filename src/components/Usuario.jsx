import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import api from '../services/api';

function Home() {
    const [users, setUsers] = useState([])

async function getUsers(){

    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
    }
    useEffect(() =>{
        getUsers()
    },[])

    return (
        <div className="container">
            <form>
                <h1>Jogadores</h1>
            </form>
            {users.map(user => (
                <div key={user.id}>
                    <div>
                        <p>Nome: {user.name}</p>
                        <p>Email:{user.email}</p>
                        <p>Idade: {user.age}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}
export default Home;