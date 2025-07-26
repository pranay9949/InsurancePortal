import { createContext, useState } from "react";



export const  CaseContext = createContext();

export const ContextProvider=({children})=>{

    const [caseNumber,setCaseNumber] = useState(null);

    return(
        <CaseContext.Provider value={{caseNumber,setCaseNumber}}>

            {children}
        </CaseContext.Provider>
    )

}