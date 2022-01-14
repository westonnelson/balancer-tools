import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { addAssetToArrayPI } from "../../../utils/addAssetToArrayPI";
import { resetAssetArrayPI } from '../../../utils/resetAssetArrayPI';
import { calculateILFromAssetArray } from '../../../utils/calculateILFromAssetArray';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import Header from '../../UI/Header';
import { calculateTotalPoolWeights } from '../../../utils/calculateTotalPoolWeight';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
        color: "primary"
      },
      '& .MuiSlider-root': {
        margin: theme.spacing(1),
        width: '30ch',
        color: "primary"
      },
    },
    slider: {
      width: 200,
    },
    paperDark: {
      '@media only screen and (min-width: 600px)': {
        padding: theme.spacing(1),
      },
  
      textAlign: 'center',
      align: 'center',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#35384a',
      borderRadius: "5px",
      margin: '10px'
    },
    paper: {
      '@media only screen and (min-width: 600px)': {
        padding: theme.spacing(1),
      },
      textAlign: 'center',
      align: 'center',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: "5px",
      margin: '10px',
      minWidth: 'auto',
    },
    resultPaper: {
      '@media only screen and (min-width: 600px)': {
        padding: theme.spacing(1),
      },
      //maxWidth: '1000px',
      //minWidth: '1000px',
      textAlign: 'center',
      align: 'center',
      justifyContent: 'center',
      color: '#272936',
    },
    form: {
      textAlign: 'center',
      align: 'center',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      //maxWidth: '700px',
      
    },
    button: {
      color: "#fff",
      height: "35px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      backgroundSize: "200% 100%",
      transition: "all .2s ease-out",
      background: "linear-gradient(90deg,#00f,#f0f,#00f)",
      '&:hover': {
        backgroundPosition: "100% 0",
        boxShadow: "0 4px 15px 0 rgb(255 100 50 / 0%)",
        transition: "all .2s ease-out",
      },
      boxShadow: "0 4px 15px 0 rgb(224 100 61 / 8%)",
      margin: "0",
      border: "0",
      size: "small",
    },
  }));
//TODO: Implementation of price impact form field

export default function PriceImpactFormField () {

      //Init styles
  const classes = useStyles();

  //Init asset array
  const defaultArray = []
  const defaultAssetNames = ['BAL', 'WETH'];
  const defaultAssetBalance = [5000000, 7000]
  const defaultPoolWeights = [80, 20];


  //Default init with 3 Assets
  for (let i = 0; i < defaultAssetNames.length; i++) {
    const entry = {
      assetName: defaultAssetNames[i],
      assetBalance: defaultAssetBalance[i],
      poolWeights: defaultPoolWeights[i],
    }
    defaultArray.push(entry);
  }

  //Asset array state hook
  const [assetArray, setAssetArray] = React.useState(defaultArray);

  //Swap Fee hook TODO: Xeonus input / OK for now -> redux in the future?
  const [SwapFee, setSwapFee] = React.useState(0.25);

  //Sets sell token or token in 
  const [sellToken, setSellToken] = React.useState("WETH");

  //Sets buy token or token out 
  const [buyToken, setBuyToken] = React.useState("BAL");

  //Sets sell token or token in 
  const [sellTokenQuantity, setSellTokenQuantity] = React.useState(1);

  //Sets buy token or token out quantity
  const [buyTokenQuantity, setBuyTokenQuantity] = React.useState(100);

  //Form Element state change handler

  const handleChange = (event, element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData[index][event.target.id] = event.target.value;
  }

  const errorTotalPoolWeights = (calculateTotalPoolWeights(assetArray) === 1 ? "" : "Total of pool weights must equal 100%");

  const handleFeeChange = (event) => {
    setSwapFee(event.target.value);
  }

  const handleSellTokenChange = (event) => {
    setSellToken(event.target.value);
  }

  const handleBuyTokenChange = (event) => {
    setBuyToken(event.target.value);
  }

  const handleSellTokenQuantityChange = (event) => {
    setSellTokenQuantity(event.target.value);
  }

  const handleBuyTokenQuantityChange = (event) => {
    setBuyTokenQuantity(event.target.value);
  }

  //Remove entry
  const handleRemoveClick = (e, el) => {
    const index = assetArray.indexOf(el);
    const clonedData = [...assetArray];
    clonedData.splice(index, 1);
    setAssetArray(clonedData);
  }

  //Add entry
  const handleAddClick = (array) => {
    setAssetArray(addAssetToArrayPI(array));
  }

  //Reset data array
  const handleResetClick = (array) => {
    setAssetArray(resetAssetArrayPI(array));
  }

  const poolSwapForm = () => (
    <Box display="flex" justifyContent="center" p={0.5}>
      <Paper className={classes.form} variant="outlined" square>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            m: 1,
          }}>
          <TextField
            id="sellToken"
            label="Sell Token"
            type="text"
            value={(sellToken)}
            onChange={(e) => handleSellTokenChange(e)}
          />
          <TextField
            id="sellTokenQuantity"
            label="Sell Token Quantity"
            type="text"
            value={(sellTokenQuantity)}
            onChange={(e) => handleSellTokenQuantityChange(e)}
            error={isNaN(sellTokenQuantity)}
            helperText={isNaN(sellTokenQuantity) ? "Sell token quantity must be a number" : ""}
          />
          <TextField
            id="buyToken"
            label="Buy Token"
            type="text"
            value={(buyToken)}
            onChange={(e) => handleBuyTokenChange(e)}
          />
          <TextField
            id="buyTokenQuantity"
            label="Buy Token Quantity"
            type="text"
            value={(buyTokenQuantity)}
            onChange={(e) => handleBuyTokenQuantityChange(e)}
            error={isNaN(sellTokenQuantity)}
            helperText={isNaN(sellTokenQuantity) ? "Buy token quantity must be a number" : ""}
          />
          <TextField
            id="SwapFee"
            label="Swap Fee (%)"
            type="text"
            value={SwapFee}
            onChange={(e) => handleFeeChange(e)}
            error={isNaN(SwapFee)}
            helperText={isNaN(SwapFee) ? "Swap Fee must be a number" : ""}
          />
        </Box>
      </Paper>
    </Box>
  );

  const formElement = (element, id) => (
    <Box display="flex" justifyContent="center" p={0.5} key={ 'formField'+ id}>
      <Paper elevation={3} className={classes.form} variant="outlined" square>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            m: 1,
          }}>
          <TextField
            id="assetName"
            label="Asset"
            multiline
            size="small"
            type="text"
            value={element.assetName}
            onChange={(e) => handleChange(e, element)}
          />
            <TextField
            id="assetBalance"
            label="Balance"
            multiline
            size="small"
            type="number"
            value={element.assetBalance}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.assetBalance)}
            helperText={isNaN(element.assetBalance) ? "Token Balance must be a number" : ""}
          />
          <TextField
            id="poolWeights"
            label="Pool Weight"
            multiline
            size="small"
            type="number"
            value={element.poolWeights}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.poolWeights)}
            helperText={isNaN(element.poolWeights) ? "Pool Weight must be a number" : ""}
          />
           <Button
            className={classes.button}
            onClick={(e) => handleRemoveClick(e, element)}
           >
            <Box display="flex" alignItems="center" >
              <DeleteIcon /></Box>
            <Box ml={0.5}>
              {`Remove`}
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
    )

      //Form components to add elements or reset the array
    const dataFunctionForm = () => (
    <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
      <Box mr={1}>
        <Button
          className={classes.button}
          onClick={(e) => handleAddClick(assetArray)}
        >
          <Box display="flex" alignItems="center" >
            <AddIcon /></Box>
          <Box ml={0.5}>
            {`Add Asset`}
          </Box>
        </Button>
      </Box>
      <Box mr={1}>
        <Button
          className={classes.button}
          onClick={(e) => handleResetClick(assetArray)}
        >
          <Box display="flex" alignItems="center" >
            <ReplayIcon /></Box>
          <Box ml={0.5}>
            {`Reset`}
          </Box>
        </Button>
      </Box>
    </Box>
    )

  return(
    <div>
      <Box className={classes.root} >
      {poolSwapForm()}
      </Box>
    <form className={classes.root} noValidate autoComplete="off">
     {assetArray.map((asset) =>
     formElement(asset, asset.assetName)
     )}
    </form>
    {dataFunctionForm()}
  </div>
  )
}