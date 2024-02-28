import axios from 'axios';

async function getAll(){

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/todos/`);
    return res;
}

async function create(payload){

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/todos/`, {
        ...payload
    });
    return res;
}

async function update(id, payload){

    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/todos/${id}`,{
        ...payload
    });
    return res;
}

async function remove(id){
    
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_PATH}/todos/${id}`);
    return res;
}

export default { getAll, create, update, remove }