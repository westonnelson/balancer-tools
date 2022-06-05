import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTableDataFromAssetArrayInvestmentPI } from '../../../utils/createTableDataFromAssetArrayInvestmentPI'
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



export default function DataTableInvestmentPI(props) {

    //Init styles
  const classes = useStyles();

//Create data rows for table (using props to forward values to another component)
const investDataTable = createTableDataFromAssetArrayInvestmentPI(props.assetArray, props.SwapFee);

  return (
    <TableContainer>
      <Table className={props.darkState ? classes.darkTable : classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Asset</b></TableCell>
            <TableCell align="right"><b>BPT Spot Price (Asset / BPT)</b></TableCell>
            <TableCell align="right"><b>BPT Effective Price (Asset / BPT)</b></TableCell>
            <TableCell align="right"><b>Quantity without Impact (BPT)</b></TableCell>
            <TableCell align="right"><b>Quantity with Impact (BPT)</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {investDataTable.map((el) => (
            <TableRow
            key={ Math.random().toString(36).substring(2, 9) }
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row">
                {el.tokenName}
              </TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(1/el.bptSpotPrice).toFixed(5)} name={el.bptSpotPrice} decimals={5}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(1/el.bptEffectivePrice).toFixed(5)} name={el.tokenName} decimals={5}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(el.tokenSpotBPT).toFixed(5)} name={el.tokenSpotBPT} decimals={5}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(el.tokenEffectiveBPT).toFixed(5)} name={el.tokenName} decimals={5}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
