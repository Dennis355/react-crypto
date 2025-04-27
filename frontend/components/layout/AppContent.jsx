import {Layout, Typography} from "antd";
// import React, {useContext} from "react";
import CryptoContext, {useCrypto} from "../../src/context/crypto-context.jsx";
import {toFixedPrice2} from "../../src/utils.js";
import PortfolioChart from "../PortfolioChart.jsx";
import AssetsTable from "../AssetsTable.jsx";

const contentStyle= {
    textAlign: 'center',
    minHeight: 'calc(100vh - 68px)',
    // outline: '2px solid tomato',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001259',
    // marginLeft: '10px',
};


export default function AppContent () {
    // const {assets, crypto} = useContext(CryptoContext)
    const {assets, crypto} = useCrypto()
//// 1 варииант (2 пробегание по массиву)
//     return    <Layout.Content style={contentStyle}>
//       <Typography.Title level={3} style={{textAlign: "left", color: '#fff', marginLeft: '10px'}}>
//           Price total: {toFixedPrice2(assets.map((asset) => {
//           // const coin = ctypto.find((coin) => coin.id === asset.id)
//           const coin = crypto.find((c) =>c.id === asset.id)
//           // получаем coin в масиве id которого совпадает с выбраным asset
//           return asset.amount * coin.price
//       }).reduce((acc, v) => (acc += v), 0))} $
//
//       </Typography.Title>
//
//     </Layout.Content>



    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    return    <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{textAlign: "left", color: '#fff', marginLeft: '10px'}}>
            {/* /////////////// 1 ///////////// */}
        {/*    Price total: {' '}*/}
        {/*    {toFixedPrice2(assets.map((asset) => {*/}
        {/*        const coin = crypto.find((coin) => coin.id === asset.id)*/}
        {/*        return asset.amount * coin.price*/}
        {/*    }).reduce((acc, v) => (acc +=v), 0))*/}
        {/*}{' '}$*/}


            {/* /////////////// 2 ///////////// */}
            Price total: {' '}
            {toFixedPrice2(assets.map((asset) => {

                return asset.amount * cryptoPriceMap[asset.id]
            }).reduce((acc, v) => (acc +=v), 0))
            }{' '}$
<PortfolioChart/>
            <AssetsTable/>
        </Typography.Title>

    </Layout.Content>


}