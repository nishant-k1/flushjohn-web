import {createContext, useState} from 'react'

export const SidebarContext = createContext()

export const SidebarContextProvider = ({children}) => {
  const [active, setActive] = useState(false)
  return (
    <SidebarContext.Provider value={[active, setActive]}>
      {children}
    </SidebarContext.Provider>
  )
}

