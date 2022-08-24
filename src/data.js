import { FastfoodOutlined } from "@mui/icons-material"
import settings from "../src/pages/TicTacToe/index"
export const initialState = {
    board: {
        "0,0": null,
        "0,1": null,
        "0,2": null,
        "1,0": null,
        "1,1": null,
        "1,2": null,
        "2,0": null,
        "2,1": null,
        "2,2": null,
    },
    roomKey: null,
    xButton: false,
    oButton: false,
    value: "X",
    isTurn: null,
    gameStarted: false,
    gameEnded: false,
    winner: null,
    isSingle: null,
    playerValue: null,
    compValue: null,
    text: "Resign",
    choosed: false,
    reset: false,
    currentKey: null,
    isFull: true,
    canStart: false
}