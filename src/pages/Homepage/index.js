import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 140,
    },
    centerText: {
        textAlign: "center"
    },
}));

const Homepage = () => {

    const classes = useStyles()

    return <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography className={classes.centerText}>Hoşgeldiniz</Typography>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Typography>Sol</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Typography>Sağ</Typography>
                </Paper>
            </Grid>
        </Grid>
    </Container>
}

export default Homepage
