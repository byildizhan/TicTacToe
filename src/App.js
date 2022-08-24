import { Route, Switch } from "react-router-dom";
import Homepage from './pages/Homepage'
import Header from './components/Header'
import TicTacToe from './pages/TicTacToe'
import { useEffect, useState } from "react";
import io from "socket.io-client"
import AppContext from "./AppContext.jsx"

function App() {
    const [socket, setSocket] = useState()
    useEffect(() => {
        if (!socket) {
            const webSocket = io.connect("http://localhost:3001")
            setSocket(webSocket)
        }
    }, [])
    const appContextValues = { socket, setSocket }
    return (
        <div className={"App"}>
            <AppContext.Provider value={appContextValues}>
                <Header />
                <Switch>
                    <Route exact path={"/"} component={Homepage} />
                    <Route path={"/home"} component={Homepage} />
                    <Route path={"/tictactoe"} component={TicTacToe} />
                </Switch>
            </AppContext.Provider>
        </div>)
}
export default App;
