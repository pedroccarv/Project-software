import { useEffect, useLayoutEffect } from 'react';
import api from '../services/api'

async function getUsers(){
let users = []
users = await api.get('/usuarios')
}


export default getUsers; 