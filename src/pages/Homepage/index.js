import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "../../styles";
import img from "../../img/home.png"
import gameplay from "../../img/gameplay.png"



const Homepage = () => {

    const classes = useStyles()

    return <div><Container className={classes.paper1}>
        <img display="flex" height={500} width={500} src={img} />

    </Container>
        <Container className={classes.paper1}><Typography className={classes.typ} >Tic-Toc-Toe<br />Tic-tac-toe is played on a three-by-three grid by two players, who alternately place the marks X and O in one of the nine spaces in the grid.

            In the following example, the first player (X) wins the game in seven steps:<br /><img width={800} src={gameplay} /></Typography></Container></div>
}

export default Homepage
