import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editProjectResponse = createContext({})
export const loginResponseContext = createContext({}) //20.01.25

function ContextShare({ children }) {
    const [addResponse, setAddResponse] = useState([])
    const [editResponse, setEditResponse] = useState([])
    const [loginResponse, setLoginResponse] = useState(true) //20.01.25
    return (
        <>
            <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
                <editProjectResponse.Provider value={{ editResponse, setEditResponse }}>
                    <loginResponseContext.Provider value={{loginResponse, setLoginResponse}}>
                        {children}
                    </loginResponseContext.Provider>

                </editProjectResponse.Provider>
            </addResponseContext.Provider>

        </>
    )
}

export default ContextShare