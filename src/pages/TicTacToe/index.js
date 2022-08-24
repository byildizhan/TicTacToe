import { React, useEffect, useState, useContext } from "react";
import OnePGame, { TwoPGame } from '../../GamePages';
import { initialState } from '../../data';
import { useStyles } from "../../styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, formLabelClasses, TextField } from "@mui/material";
import WaitModal from "../../components/waitModal";
import AppContext from "../../AppContext.jsx";

function GamePage() {
    const { socket } = useContext(AppContext)
    const classes = useStyles();
    const [choosedValue, setChoosedValue] = useState(null)
    const [settings, setSettings] = useState({ ...initialState })

    useEffect(() => {
        if (!socket) return
        socket.on("dolu", data => {
            setSettings(prev => ({ ...prev, isFull: data }))
            if (data) {
                alert("This Server Is Full, Try Another One")
            }
        })
        socket.on("gameMode", () => {
            setSettings({ ...initialState })
        })
        socket.on("start", (data) => {
            console.log(data);
            setSettings(prev => ({ ...prev, canStart: data }))
        })
    }, [socket])
    if (settings.isSingle === null) {
        return (<Container
            classes={classes.container}>
            <Grid
                container
                spacing={{ ButtonGroup: 2 }}
                className={classes.grid}>
                <Grid
                    item xs={6}>
                    <Button
                        className={classes.paper1}
                        sx={{
                            border: 2,
                            width: 500,
                            height: 300,
                            marginTop: 20,
                            color: "black",
                            borderRadius: 20
                        }}
                        onClick={() => {
                            setSettings(prev => ({ ...prev, isSingle: true }))
                        }}>
                        <Typography
                            sx={{ fontSize: 20 }}>
                            1P
                        </Typography>
                    </Button>
                </Grid>
                <Grid
                    item xs={6}>
                    <Button
                        className={classes.paper1}
                        sx={{
                            border: 2,
                            width: 500,
                            height: 300,
                            marginTop: 20,
                            color: "black",
                            borderRadius: 20
                        }}
                        onClick={() => {
                            setSettings(prev => ({ ...prev, isSingle: false }))
                        }}>
                        <Typography>
                            <bold>
                                2P
                            </bold>
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Container>)
    }
    else if (settings.isFull && !settings.isSingle) {
        return <Container className={classes.container2}>
            <TextField onChange={(event) => {
                setSettings(prev => ({ ...prev, roomKey: event.target.value }))

            }} id="roomKey" label="Room Name" variant="outlined" size="medium" />
            <Button onClick={() => {
                console.log(settings.roomKey);
                if (settings.roomKey !== null && settings.roomKey !== "") socket.emit("twoPlayerRoom", settings.roomKey)
            }}>Join</Button>

        </Container>

    }
    else {
        if (settings.isSingle) {
            console.log("disconnect oluyorum!")
            socket.disconnect()
            return <OnePGame gameState={settings} setGameState={setSettings} />
        }
        else if (settings.canStart) {
            return <TwoPGame gameState={settings} setGameState={setSettings} />
        }
        else {
            return <WaitModal />
        }
    }
}






export default GamePage