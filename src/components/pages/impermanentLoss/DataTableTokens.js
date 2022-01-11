import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createTokenTableFromAssetArray } from '../../../utils/createTokenTableFromAssetArray';
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



export default function DataTableTokens(props) {

    //Init styles
  const classes = useStyles();

//Create data rows for table (using props to forward values to another component)
const rows = createTokenTableFromAssetArray(props.assetArray, props.investment, props.SwapFee);


  return (
    <TableContainer>
      <Table className={props.darkState ? classes.darkTable : classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Asset</b></TableCell>
            <TableCell align="right"><b>Initial tokens</b></TableCell>
            <TableCell align="right"><b>Tokens with IL</b></TableCell>
            <TableCell align="right"><b>Tokens with Fees APY</b></TableCell>
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
              <TableCell align="right"><DynamicValueFormatter value={Number(row.initialTokens).toFixed(2)} name={row.initialTokens} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.tokensWithIL).toFixed(2)} name={row.tokensWithIL} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.tokensWithFees).toFixed(2)} name={row.tokensWithFees} decimals={2}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}