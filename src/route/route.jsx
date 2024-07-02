import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from '../cadastro/index'
import Login from '../App'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} ></Route>
                <Route path="/cadastro" element={<Cadastro />} ></Route>
            </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes