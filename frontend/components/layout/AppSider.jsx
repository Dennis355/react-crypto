import {Layout, Card, Statistic, List, Typography, Tag} from "antd";
import React, {useContext} from "react";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {cryptoAssets, cryptoData} from "../../src/data.js";
import {localFetchCrypto, localFetchCryptoAssets} from "../../src/Api.js";
// import {persentDifference, capitalize} from "/src/utils.js"
import {persentDifference, capitalize} from "../../src/utils.js"

// import CryptoContext from "../../src/context/crypto-context.jsx";
import CryptoContext from "../../src/context/crypto-context.jsx";


const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};



export default function AppSider() {
const { assets} = useContext(CryptoContext)


    return <Layout.Sider width="25%" style={siderStyle}>

        {assets.map((asset) =>
            <Card key={asset.id} style={{marginBottom: '1erm'}}>
                <Statistic
                    title={capitalize(asset.id)}
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                    prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                    suffix="%"
                />
                <List
                    size={"small"}
                    dataSource={[
                        {title: 'Total Profit', value: asset.totalProfit.toFixed(2), withTag: true},
                        {title: 'Total Amount', value: asset.totalAmount.toFixed(2), isPlain: true},
                        // {title: 'Difference', value: asset.growPercent},
                    ]}

                    renderItem={item => (
                        <List.Item>
                            <span> {item.title}</span>
                            <span>

                                {item.withTag && (
                                    <Tag color={asset.grow ? 'green' : 'red'}> {asset.growPercent} %</Tag>)}
                                {item.isPlain && item.value}
                                {!item.isPlain && <Typography.Text
                                    type={asset.grow ? 'success' : 'danger'}>{item.value}$</Typography.Text>}

                                </span>
                        </List.Item>
                    )}
                    // обращаемся к стуктуре описаной веше
                />
            </Card>
        )}


    </Layout.Sider>
}