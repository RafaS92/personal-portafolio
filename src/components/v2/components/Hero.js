import React from 'react';
import './hero.css';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroDiv: {
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"flex-start",
    padding: 0
  },
  Title:{
    color: theme.palette.text.primary,
    fontSize:"clamp(40px, 8vw, 80px);",
    margin:0
  },
  subTitle:{
    color: theme.palette.text.secondary,
    margin: 0,
    fontSize:"clamp(40px, 8vw, 80px)"

  },
  bright:{
    color: theme.palette.text.bright, 
    margin:0
  },
}));  

function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.heroDiv}>
      <h5 className={classes.bright}>Hello World!</h5>
      <h1 className={classes.Title} >I'M RAFAEL VALDEZ</h1>
      <h2 className={classes.subTitle} >Im the best uuaaaouu</h2>
      <Typography variant="p" color="textPrimary">
        Reprehenderit velit minim in excepteur irure ut laboris nostrud
        consectetur est ullamco fugiat minim. Id consequat minim exercitation Non
        nulla aliqua Lorem eu consectetur quis cupidatat tempor incididunt
        dolor. Nisi tempor ullamco dolor aliqua ipsum ex laborum proident anim.
        Laborum mollit sunt dolor amet. Non occaecat anim anim anim minim dolore
        nulla dolor consectetur qui officia. Non aliqua aliqua est id anim aute
        in. Sint deserunt sint sit quis ex incididunt aute proident elit.
        Pariatur esse ipsum laboris laboris proident. Deserunt elit incididunt
        laboris ex. Do veniam cillum aliqua sunt. Occaecat ea voluptate nisi in
        dolore quis ad magna irure exercitation nulla enim consectetur.
      </Typography>
    </div>
  );
}

export default Hero;
