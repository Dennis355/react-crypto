import {Divider, Flex, Select, Space, Typography, Form, DatePicker, InputNumber, Input, Button, Result} from "antd";
import React, {useState, useRef} from "react";
// import {useForm } from "react";
import {useCrypto} from "../src/context/crypto-context.jsx";
import {toFixedPrice2} from "../src/utils.js";
import Coininfo from "./Coininfo.jsx";

export default function AddAssetForm({onClose}) {
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = React.useState(null)
    const [form] = Form.useForm()
    const [loadResult, setLoaderResult] = useState(false)
    const assetRef = React.useRef();
    if (loadResult) {
        return <Result
            status="success"
            title="New Asset added"
            subTitle={`added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
            extra={[
                <Button type="primary" key="console" onClick={onClose}>
                    Close
                </Button>,
                <Button key="buy">Buy Again</Button>,
            ]}
        />
    }

    if (!coin) {
        return (

            <Select
                // value="press / to open"
                // open={select}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                //    в массиве crypto находим монету (crypto) id кот. совпадает со значением выбраного нами (v)
                style={{width: '100%'}}
                placeholder="Select one coin"
                options={crypto.map((coin) => ({
                    label: coin.name, value: coin.id, icon: coin.icon,
                }))}
                optionRender={(option) => (<Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>
                    {option.data.label}
                </Space>)}
            />);
    }

    function onFinish(values) {
        console.log('finish', values)
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setLoaderResult(true)
        addAsset(newAsset)
    }

    // функция получения данніх из формі через Ref
    // и получение нового массива Asset
    // візів функцию addAsset и добавляем newAsset


    function handleChangeAmount(value) {
        const price = form.getFieldValue('price')

        form.setFieldsValue({
            total: +toFixedPrice2(value * price),
        })
    }

    function handleChangePrice(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +toFixedPrice2(amount * value),
        })
    }

    return (<>
        <Coininfo coin={coin}/>
        <Divider/>
        {/*<Typography.Paragraph>*/}

        {/*</Typography.Paragraph>*/}


        <Form
            form={form}
            name="amount"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{price: toFixedPrice2(coin.price)}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item

                label="Amount"
                name="amount"
                rules={[{
                    required: true, type: 'number', min: 0, message: 'Please input minimum value greater than 0'
                }]}
            >
                {/*<Input />*/}
                <InputNumber onChange={handleChangeAmount} style={{width: '100%'}}
                             placeholder="coin amount"/>

            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                // rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <InputNumber onChange={handleChangePrice} style={{width: '100%'}}/>

                {/*<Input.Password />*/}
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber style={{width: '100%'}} disabled/>
            </Form.Item>

            <Form.Item label="Date & Time" name="date">
                <DatePicker showTime/>
            </Form.Item>


            {/*<Form.Item name="remember" valuePropName="checked" label={null}>*/}
            {/*    <Checkbox>Remember me</Checkbox>*/}
            {/*</Form.Item>*/}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>


    </>)
}


//
//
//
//
//
//
// if (!coin) {
//     return
//     ( <Select>
//             // mode="multiple"
//             value="press / to open"
//             open={select}
//             // optionalLabelProp="Label"
//             onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
//             //    в массиве crypto находим монету (crypto) id кот. совпадает со значением выбраного нами (v)
//
//             // onClick={() => setSelect((prev) => !prev)}
//             // при клике меняем состояние (возврат к предідущему состоянию)
//             // onClick={() => setSelect()}
//
//             style={width: "100%"}
//             placeholder="select one country"
//             // defaultValue={['china']}
//             // onChange={handleChange}
//             options={crypto.map((coin) => ({
//                 label: coin.name,
//                 // value: coin.code,
//                 value: coin.id,
//                 icon: coin.icon,
//             }))}
//             optionRender={(option) => (
//                 <Space>
//                     {/*<span role="img" aria-label={option.data.label}>*/}
//                     {/*  {option.data.emoji}*/}
//                     {/*</span>*/}
//
//
//                     <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
//                 </Space>
//             )}
//         <Select/>
// )
// }
// return
//     <form> Form Asset </form>
//  }