import { store } from "@/reduc/store";
import React from "react";
import { Provider as ReduxProvider } from "react-redux"; // Rename to avoid conflict



interface Props {
  children: React.ReactNode;
}

const AppProvider:React.FC<Props>=({children})=>{
    return <ReduxProvider store={store} >{children}</ReduxProvider>
}

export default AppProvider