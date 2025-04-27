import {Flex, Typography, Tag, Divider} from 'antd'
import {toFixedPrice2} from "../src/utils.js";
import CoinInfo from "./Coininfo.jsx";


export default function CoinInfoModal({coin}) {
    return <>
        {/*<Flex align="center">*/}
        {/*    <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>*/}
        {/*    <Typography.Title level={2} style={{margin: 0}}>({coin.symbol}) {coin.name}</Typography.Title>*/}
        {/*</Flex>*/}

        <CoinInfo coin={coin} withSymbol/>
        <Divider style={{marginBottom: 20}}></Divider>
        <Typography.Paragraph>
            <Typography.Text strong> 1 hour: </Typography.Text>
            <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}> {coin.priceChange1h} %</Tag>

            <Typography.Text strong> 1 day: </Typography.Text>
            <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}> {coin.priceChange1d} %</Tag>

            <Typography.Text strong> 1 week: </Typography.Text>
            <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}> {coin.priceChange1w} %</Tag>
            {/*<Typography.Paragraph>*/}
            {/*    <Typography.Text strong> Price current </Typography.Text>*/}
            {/*    <Tag> {coin.price} $</Tag>*/}
            {/*</Typography.Paragraph>*/}
<Divider/>
            <Typography.Paragraph>
                <Typography.Text strong> Price current </Typography.Text>
                {/*<Tag> {coin.price.toFixed(2)} $</Tag>*/}
                <Tag> {toFixedPrice2(coin.price)} $</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong> Price BTC </Typography.Text>
                <Tag> {coin.priceBtc} </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong> PmarketCap </Typography.Text>
                <Tag> {coin.marketCap} $ </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong> contractAddress </Typography.Text>
                <Tag> {coin.contractAddress} </Tag>
            </Typography.Paragraph>







        </Typography.Paragraph>
    </>
}