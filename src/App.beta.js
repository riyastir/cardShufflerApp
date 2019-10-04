import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid'; 
import './cards.css';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import ReactDOM from 'react-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3, 2),
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
  inputRoot: {
    color: 'inherit',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    alignSelf: 'stretch',
	width:'95%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  card: {
    maxWidth: 345,
	width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
	getUsers(event.target.value);
  };
  
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }; 
 
  async function getUsers(num) {
	if(parseInt(num)>0){
		if(parseInt(num)>52){
			num = 52;
		}
		
	var cardTypes = { S:'spades',C:'clubs',H:'hearts',D:'diams' };
	var cardNumbers = { 1: 'a',11:"j", 12:"q", 13:"k" };
	var cardData = '';
    const response = await fetch('https://nermozhi.org/test/test.php?no='+num);
    const data = await response.json();
    //console.log(data);
	var key = 0;
	var playerNo = 0;
	var fk = data.keys();
	for (key of fk) {
		playerNo = key +1;
		if(key <= num){
			cardData = cardData.concat('<h2 id="full">Player '+playerNo+'</h2><ul class="hand">');
			var innerKey = 0;
			var ik = data[key].keys();
				for(innerKey of ik){
					var card = data[key][innerKey];
					var val = card.split('-');
					//console.log(cardTypes[val[0]]);
					if(val[1]==1 || val[1] > 10 ){
						cardData = cardData.concat('<li><div class="card rank-'+cardNumbers[val[1]]+' '+cardTypes[val[0]]+'"><span class="rank">'+cardNumbers[val[1]].toUpperCase() +'</span><span class="suit">&'+cardTypes[val[0]]+';</span></div></li>');
						//console.log(cardNumbers[val[1]]);
					}
					else{
						cardData = cardData.concat('<li><div class="card rank-'+val[1]+' '+cardTypes[val[0]]+'"><span class="rank">'+val[1]+'</span><span class="suit">&'+cardTypes[val[0]]+';</span></div></li>');
						//console.log(val[1]);
					}
				}
				cardData = cardData.concat('</ul>');
				
		}
	//console.log(data[key]);
	}
	var div = [cardData];
	const cardElement = <div dangerouslySetInnerHTML={{__html: div}}></div>;
	ReactDOM.render(cardElement, document.getElementById('cards'));
  }
  else{
	const cardElement = <h3>Input Value Doesnot Exist or Value is Invalid</h3>;
	ReactDOM.render(cardElement, document.getElementById('cards'));
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
            Playing Cards
          </Typography>
        </Toolbar>
      </AppBar>
		
	  <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '10vh' }}
 >
 <Typography variant="h4" component="h4" >
	Playing Cards
	</Typography>
	</Grid>
	<Grid
 
 >

  <Grid item xs={12} lg={3}  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '50vh', float:"left" }}>
	  <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            PC
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Enter the Number of Players"
        subheader="Min 1 Player & Max 52 Players"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards.jpg"
        title="Cards"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="span">
           <TextField
        id="number_of_players"
        label="Number of Players"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
        </Typography>
		
      </CardContent>
      <CardActions disableSpacing>
       
      </CardActions>
      
    </Card>
	
	  </Grid>
<Grid item xs={12} lg={8}  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '0',marginLeft: '0',marginRight: '0.8em', float: "left" }}>
	  <Paper className={classes.paper}>
        <Typography variant="h5" component="h3">
          Card Distribution
        </Typography>
        <Typography component="span">
			<div id="cards" className="playingCards fourColours rotateHand">
			<ul className="hand">
			<li>
			<div className={classNames({ 'card': true, 'rank-2':true, 'spades':true })}>
				<span className="rank">2</span>
				<span className="suit">♠</span>
			</div>
			</li>
		</ul>
		</div>
        </Typography>
      </Paper>
	
	  </Grid>      
 </Grid>
    </div>
  );
}