import React, { useContext, useEffect, useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "./styles";
import Box from "@mui/material/Box";
import { Button, ButtonGroup } from "@mui/material";
import { isNull, rand, win, Item } from "./functions";
import { initialState } from "./data";
import WinModal from "./components/winModal";
import AppContext from "./AppContext.jsx";
import { FastfoodOutlined } from "@mui/icons-material";



export default function OnePGame({ gameState, setGameState }) {
    const [game, setGame] = useState({ ...gameState });
    const classes = useStyles();
    const setPosition = (key, value) => {
        const newBoard = { ...game.board, [key]: value, }
        const winner = win(newBoard, game.playerValue)
        if (!winner) {
            const emptyRand = rand(isNull(newBoard))
            setGame(prev => ({ ...prev, board: { ...newBoard, [emptyRand]: game.compValue } }))
        }
        else {
            setGame(prev => ({ ...prev, gameEnded: true, winner, board: newBoard }))
        }
    }
    useEffect(() => {
        const winner1 = win(game.board, game.playerValue)
        if (winner1) setGame(prev => ({ ...prev, gameEnded: true, winner: winner1, text: "Restart" }))

    }, [game.board])

    useEffect(() => {
        if (game.playerValue === "O" && game.gameStarted) {
            const emptyRand = rand(isNull(game.board))
            setGame(prev => ({ ...prev, board: { ...game.board, [emptyRand]: game.compValue } }))
        }
    }, [game.gameStarted])


    const grides = Object.entries(game.board).map(([key, value]) => {
        return (<Grid key={key} item xs={4} onClick={event => {
            if (game.board[key] == null) {
                if (game.gameStarted && !game.gameEnded) {
                    setPosition(key, game.playerValue)
                }
            }
        }}>
            <Box
                className={classes.paper1}
                sx={{ border: 1 }}>
                <Typography
                    className={classes.centerText}  >
                    {value}
                </Typography>
            </Box>
        </Grid>)
    })
    if (!game.playerValue) {
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
                            setGame(prev => ({ ...prev, choosed: true, playerValue: "X", compValue: "O", gameStarted: true }))
                        }}>
                        <Typography
                            sx={{ fontSize: 20 }}>
                            X
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
                            setGame(prev => ({ ...prev, choosed: true, playerValue: "O", compValue: "X", gameStarted: true }))
                        }}>
                        <Typography>
                            <bold>
                                O
                            </bold>
                        </Typography>
                    </Button>

                </Grid>
            </Grid>
        </Container>)
    }
    else {
        return (
            <Container
                classes={classes.container}>
                <Grid
                    container
                    spacing={{ ButtonGroup: 2 }}
                    className={classes.grid}>
                    <Grid
                        item xs={12}>
                        <Typography>
                            Hoşgeldiniz
                        </Typography>
                    </Grid>
                    {grides}
                    <Grid
                        item xs={12}
                        style={{ marginTop: 20 }}>
                        <ButtonGroup>
                            <Button
                                disabled={game.gameStarted}
                                onClick={() => {
                                    setGame({ ...game, gameStarted: true })
                                }}>
                                Start Game
                            </Button>
                            <Button
                                disabled={!game.gameStarted}
                                onClick={() => {
                                    setGame({ ...gameState, gameStarted: false, gameEnded: false, choosed: true, compValue: game.compValue, playerValue: game.playerValue })
                                }
                                }>{game.text}
                            </Button>
                            <Button
                                disabled={game.gameStarted}
                                onClick={() => {
                                    setGameState(prev => ({ ...prev, choosed: false, isSingle: null }))
                                }
                                }>Game Mode
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {game.winner ? <WinModal props={game.winner} /> : null}
            </Container >
        )
    }

}

export function TwoPGame({ gameState }) {
    const [data, setData] = useState();
    const [game, setGame] = useState({ ...gameState });
    const [turn, setTurn] = useState();
    const { socket } = useContext(AppContext)
    const classes = useStyles();
    useEffect(() => {
        console.log(game.playerValue);
        socket.on("newXButton", (data) => {
            setGame(prev => ({ ...prev, xButton: true }))
        })
        socket.on("newOButton", (data) => {
            setGame(prev => ({ ...prev, oButton: true }))
        })
        socket.on("newServer", (data) => {
            setData(data)
        })
        socket.on("msg", (msg) => {
            console.log(msg);
        })
        socket.on("rest", () => {
            setGame({ ...gameState })
        })
        socket.on("roomname", () => {
            socket.emit("pushroom", game.roomKey)
        })
    }, [socket])
    useEffect(() => {
        const winner1 = win(game.board)
        if (winner1) {
            setGame(prev => ({ ...prev, winner: winner1, gameEnded: true, }))
        }
    }, [game.board])
    useEffect(() => {
        if (game.winner) setGame(prev => ({ ...prev, text: "Restart" }))
    }, [game.winner])
    useEffect(() => {
        if (data) {
            setGame(prev => ({ ...prev, value: game.value === "X" ? "O" : "X", isTurn: !game.isTurn, board: { ...game.board, [data]: game.value, } }))
        }
    }, [data])
    useEffect(() => {
        if (game.isTurn) {
            setGame(prev => ({ ...prev, turnText: "Your Turn" }))
        }
        else {
            setGame(prev => ({ ...prev, turnText: "Waiting For Opponent's Move . . ." }))
        }
    }, [game.isTurn])
    useEffect(() => {
        if (game.value === game.playerValue) {
            setGame(prev => ({ ...prev, isTurn: true }))
            setTurn(true)
        }
        else {
            setGame(prev => ({ ...prev, isTurn: false }))
            setTurn(false)
        }
    }, [game.playerValue])

    const grides = Object.entries(game.board).map(([key, value]) => {
        return (<Grid key={key} item xs={4} onClick={event => {
            if (game.isTurn && game.board[key] === null && game.gameStarted && !game.gameEnded && !game.winner) {
                socket.emit("server", key)
            }
        }}>
            <Box
                className={classes.paper1}
                sx={{ border: 1 }}>
                <Typography
                    className={classes.centerText}  >
                    {value}
                </Typography>
            </Box>
        </Grid>)
    })
    if (!game.choosed) {
        return (<Container
            classes={classes.container}>
            <Grid
                container
                spacing={{ ButtonGroup: 2 }}
                className={classes.grid}>
                <Grid
                    item xs={6}>
                    <Button
                        disabled={game.xButton}
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
                            setGame(prev => ({ ...prev, choosed: true, playerValue: "X", gameStarted: true }))
                            socket.emit("xbutton", (game.roomKey))
                        }}>
                        <Typography
                            sx={{ fontSize: 20 }}>
                            X
                        </Typography>
                    </Button>
                </Grid>
                <Grid
                    item xs={6}>
                    <Button
                        disabled={game.oButton}
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
                            setGame(prev => ({ ...prev, choosed: true, playerValue: "O", choosed: true, gameStarted: true }))
                            socket.emit("obutton", (game.roomKey))
                        }}>
                        <Typography>
                            <bold>
                                O
                            </bold>
                        </Typography>
                    </Button>

                </Grid>
            </Grid>
        </Container>)
    }
    else {
        return (
            <Container
                classes={classes.container}>
                <Grid
                    container
                    spacing={{ ButtonGroup: 2 }}
                    className={classes.grid}>
                    <Grid
                        item xs={12}>
                        <Typography>
                            Hoşgeldiniz
                        </Typography>
                    </Grid>
                    {grides}
                    <Grid
                        item xs={12}
                        style={{ marginTop: 20 }}>
                        <ButtonGroup>
                            <Button
                                disabled={game.gameStarted}
                                onClick={() => {
                                    setGame({ ...game, gameStarted: true })
                                }}>
                                Start Game
                            </Button>
                            <Button
                                disabled={!game.gameStarted}
                                onClick={() => {
                                    socket.emit("restart", game.roomKey)
                                }
                                }>{game.text}
                            </Button>
                            <Button
                                onClick={() => {
                                    socket.emit("forceDisconnect", game.roomKey)
                                }
                                }>Game Mode
                            </Button>
                        </ButtonGroup>
                        <Grid item sx={12}>
                            {game.turnText}
                        </Grid>
                    </Grid>
                </Grid>
                {game.winner ? <WinModal props={game.winner} /> : null}
            </Container >
        )
    }

}