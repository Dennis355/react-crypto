import React, {Component, useEffect, useState} from "react";
import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../src/context/crypto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const {Header} = Layout;

const headerStyle = {
    width: "100%",
    textAlign: 'center',
    color: '#191919',
    height: 60,
    paddingInline: 48,
    lineHeight: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
};


// const handleChange = (value) => {
//     console.log(`selected ${value}`);
// };
// функция изменения при выборе из select

// const options = [
//     {
//         label: 'China',
//         value: 'china',
//         emoji: '🇨🇳',
//         desc: 'China (中国)',
//     },
//     {
//         label: 'USA',
//         value: 'usa',
//         emoji: '🇺🇸',
//         desc: 'USA (美国)',
//     },
//     {
//         label: 'Japan',
//         value: 'japan',
//         emoji: '🇯🇵',
//         desc: 'Japan (日本)',
//     },
//     {
//         label: 'Korea',
//         value: 'korea',
//         emoji: '🇰🇷',
//         desc: 'Korea (韩国)',
//     },
// ];


export default function AppHeader() {
    // const handleChange = (value: string[]) => {
    //     console.log(`selected ${value}`);
    // };
    // из дефолт настроек библиотеки Ant

    const {crypto} = useCrypto()
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)

    const [coin, setCoin] = useState(null)
    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                /// нажатие решетки на клавиат
                setSelect((prev) => !prev)
                // setSelect (true)

            }
        }
        document.addEventListener("keypress", keypress)
        return () => document.removeEventListener("keypress", keypress)
    }, [])

// функ закрітия и откріт  Select

    function handleSelect(value) {
        console.log(value)
        setCoin(crypto.find((c) => c.id === value))
        // поиск  по соответствующ id
        setModal(true)
    }

    return (


        <Layout.Header style={headerStyle}>
            <Select
                // mode="multiple"
                value="press / to open"
                open={select}
                // optionalLabelProp="Label"
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                // при клике меняем состояние (возврат к предідущему состоянию)
                // onClick={() => setSelect()}

                style={{width: 250}}
                placeholder="select one country"
                defaultValue={['china']}
                // onChange={handleChange}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    // value: coin.code,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        {/*<span role="img" aria-label={option.data.label}>*/}
                        {/*  {option.data.emoji}*/}
                        {/*</span>*/}


                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />
            <Button onClick={() => setDrawer(true)} type="primary">Add asset</Button>

            <Modal title="Basic Modal"
                   open={modal}
                // onOk={() => setModal((prev) => !prev)}
                   onOk={() => setModal(false)}
                   onCancel={() => setModal(false)}
                   footer={null}
            >
                <CoinInfoModal coin={coin}/>

            </Modal>
            <Drawer width={600} title="Add asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
                <AddAssetForm onClose={() => setDrawer(false)} />
                {/*<p>Some contents...</p>*/}
                {/*<p>Some contents...</p>*/}
                {/*<p>Some contents...</p>*/}
            </Drawer>

        </Layout.Header>)
}