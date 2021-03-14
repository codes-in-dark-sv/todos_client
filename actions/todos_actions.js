import fetch from 'isomorphic-fetch';
 
export const singleTodo = (id) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/${id}`, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch((err) => {
            return err
        });
};
 
 
export const getTodos = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/all`, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Accept: 'application/json',
              },
        }).then(response =>{
            return response.json();
        }).catch(err => {
            return err;
            });
}
 
 
export const addTodo = (newTodo) => {
        return fetch(`${process.env.NEXT_PUBLIC_API}/create`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body:JSON.stringify(newTodo)
        }).then(response => {
                return response.json();
            }).catch((err) => {
                console.log(err);
                return err 
            });
};
 
export const removeTodo = (id) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/remove`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
 
export const updateTodoDetails = (details)=>{
    return fetch(`${process.env.NEXT_PUBLIC_API}/update`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
 

