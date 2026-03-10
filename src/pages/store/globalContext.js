import { createContext, useState } from 'react'

const GlobalContext = createContext()

export function GlobalContextProvider(props) {
    const [globals, setGlobals] = useState({ aString: 'init val', count: 0, hideHamMenu: true, username: null })

    async function logout() {
        try {
            await fetch('http://localhost:8000/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error('Logout error:', error)
        }
        setGlobals(prev => ({ ...prev, username: null }))
    }

    async function editGlobalData(command) {
        if (command.cmd == 'hideHamMenu') { 
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.hideHamMenu = command.newVal; return newGlobals
            })
        }
        if (command.cmd == 'setUsername') {
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.username = command.newVal; return newGlobals
            })
        }


    }

    const context = {
        updateGlobals: editGlobalData,
        logout: logout,
        theGlobalObject: globals
    }

    return <GlobalContext.Provider value={context}>
        {props.children}
    </GlobalContext.Provider>
}


export default GlobalContext
