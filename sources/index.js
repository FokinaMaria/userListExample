import Axios from 'axios';

const getUsers = () => Axios.get('/users'); //получает данные с сервера
const createUser = user => Axios.put('/user', user); //отправляемые объект должен быть сохранен
const deleteUser = firstName =>
  Axios.delete('/user', { params: { firstName } }); //удаляет
const createUserEdit = item => Axios.post('/user', item); //отправляет данные

export { getUsers, createUser, deleteUser, createUserEdit };
