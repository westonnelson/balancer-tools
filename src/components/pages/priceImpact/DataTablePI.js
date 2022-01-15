import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createTableDataFromAssetArray } from '../../../utils/createTableDataFromAssetArray';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';

//TODO: Global style, remove
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
      '& .MuiTableCell-root': {
        color: "#FFFFFF"
      },
    },
    table: {
        alignItems: "center",
        color: '#272936',
        overflow: 'auto',
      },
      darkTable: {
        alignItems: "center",
        color: '#FFFFFF',
        overflow: 'auto',
      },
      paper: {
        marginTop: theme.spacing(3),
        overflowX: "auto",
        marginBottom: theme.spacing(2),
        margin: "auto",
      },
  }));



export default function DataTablePI(props) {

    //Init styles
  const classes = useStyles();

//Create data rows for table (using props to forward values to another component)
const rows = createTableDataFromAssetArrayPI(props.assetArray, props.SwapFee,  props.sellToken, props.buyToken, props.sellTokenQuantity, props.buyTokenQuantity);


  return (
    <TableContainer>
      <Table className={props.darkState ? classes.darkTable : classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Spot Price</b></TableCell>
            <TableCell align="right"><b>Effective Price</b></TableCell>
            <TableCell align="right"><b>Quantity without Impact</b></TableCell>
            <TableCell align="right"><b>Quantity with Impact</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
            key={ Math.random().toString(36).substring(2, 9) }
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row">
                {row.assetName}
              </TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.initialValue).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueIfHeld).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueWithIL).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueWithFees).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
