import { GAUGE_WHITELIST_MAINNET } from "../components/constants/gaugeWhiteList";

export default function getGaugeArray(data, poolArray) {
    //Obtain gauge data from gauge subgraph
    let gaugeArray = [];
    //total veBAL staked:
    data.liquidityGauges.forEach(({ poolAddress, poolId, symbol, totalSupply, id, shares}) => {
        //Only add whitelisted Gauges:
        if (GAUGE_WHITELIST_MAINNET.includes(poolId)) {
            //Find relevant pool information
           const poolInfo = poolArray.find(pool => pool.id === poolId);
           let poolName = symbol;
           let bptPrice = 0
           if (poolInfo) {
            poolName = poolInfo.poolName;
            bptPrice = poolInfo.tvl / poolInfo.totalShares;
           }
        let gaugeEntry = {
            poolAddress: poolAddress,
            poolId: poolId,
            id: id,
            name: poolName,
            totalStaked: totalSupply,
            pricePerBPT: bptPrice,
            totalStakedUSD: Number(totalSupply) * Number(bptPrice),
            shares: shares,
        }
            if (gaugeEntry.totalStaked > 0) {
            gaugeArray.push(gaugeEntry);
            }
        }
        });
    //sort by totalStake
    gaugeArray.sort((a, b) => (b.totalSupply - a.totalSupply)); 
    return gaugeArray;
}