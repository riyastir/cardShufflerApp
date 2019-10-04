import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid'; 
import './cards.css';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fixedHeight: {
    height: 300,
  },
  fixedWidth: {
    minWidth: 300,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
	  padding: '12px',
	  float:'left'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    alignSelf: 'stretch',
	width:'95%',
  },
 
  bgRed: {
    backgroundColor: red[500],
  },
  textRed: {
    color: red[500],
  },
}));

export default function CardShuffler() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    number: '',
  });
  const [cardDetails, setCard] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleChange = number => event => {
    setValues({values, [number]: event.target.value });
    getCards(event.target.value).then(response => setCard(response)).catch(e=> console.log(e));
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.fixedWidth);
  
	const cardTypes = { S:'spades',C:'clubs',H:'hearts',D:'diams' };
	const cardNumbers = { 1: 'a',11:"j", 12:"q", 13:"k" };
  async function getCards(num) {
	if(parseInt(num)>0){
		if(parseInt(num)>52){
			num = 52;
    }
    setErrorMessage('');
    const response = await fetch('https://api.alpha.riyas.pro/api/cards/'+num);
    const data = await response.json();
    
	return data;
	}
	else{
  const data = [];
  setErrorMessage('Input value does not exist or value is invalid');
	return data;
	}
  }
 return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Playing Cards Shuffler
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.container} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
         
            <Grid item>
            <Paper className={fixedHeightPaper}>
          <Avatar aria-label="players" className={classes.bgRed}>
			      N 
          </Avatar>
                <Typography variant="body2" color="textSecondary" component="span">
        <TextField
        id="number_of_players"
        label="Number of Players"
        className={classes.textField}
        value={values.number}
        onChange={handleChange('number')}
        margin="normal"
        />
        </Typography>
        <Typography variant="body2" color="textSecondary" component="span">
          <h3 className={classes.textRed}>{errorMessage}</h3>
        </Typography>
              </Paper>
            </Grid>
            
            {cardDetails.map((cards,i) => (
              <Grid item key={i}>
              
              <Paper className={fixedHeightPaper} style={{width: (window.innerWidth/(cardDetails.length+1))}}>
                <Avatar aria-label="players" className={classes.bgRed}>
					{i+1}
				</Avatar>
				<h6 style={{float:'left'}}>{i < values.number ? `Player  ${i+1} - `: "Excess Cards - "}{cards+','.replace(/,\s*$/, "")}</h6>
				<div id="cards" className="playingCards fourColours rotateHand faceImages" >
				<div key={i}><ul className="hand">
						{cards.map((card,j)=>(
						<li key={j}>
						<div key={j} className={card.split('-')[1]==1||card.split('-')[1]>10 ? "card rank-"+cardNumbers[card.split('-')[1]]+" "+cardTypes[card.split('-')[0]]: "card rank-"+card.split('-')[1]+" "+cardTypes[card.split('-')[0]]}>
						<span className="rank">{card.split('-')[1]==1||card.split('-')[1]>10 ? cardNumbers[card.split('-')[1]].toUpperCase(): card.split('-')[1].toUpperCase()}</span>
						<span className="suit" dangerouslySetInnerHTML={{__html: '&'+cardTypes[card.split('-')[0]]+';'}}></span>
			</div>
			</li>
						))}
				</ul></div>
				</div>
              </Paper>
            </Grid>
			))}
      </Grid>
      </Grid>
      </Grid>
    </div>
  );
}