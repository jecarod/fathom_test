import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../helpers/localStorage/localStorage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        // Guardar el token en LocalStorage
        const token = getLocalStorage();
        setToken(token);

        if (token){
            let id = jwtDecode(token).user.id;

            axios
                .get(`http://localhost:4000/users/oneUser/${id}`)
                .then( (res) => {                     
                    setUser(res.data.resultUser[0]);                    
                })
                .catch((error) => console.log(error));
        }   
       
    }, [isLogged])
    

    return (
        <AppContext.Provider value = {{
            user,
            setUser,
            isLogged,
            setIsLogged,
            token,
            setToken
            
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
