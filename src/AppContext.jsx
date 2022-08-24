import React from "react"

const AppContext = React.createContext({ socket: null, name: "default" })

export default AppContext