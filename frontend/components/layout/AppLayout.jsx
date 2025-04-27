

import React, {useContext} from 'react';

import {Layout, Spin} from 'antd';
import AppHeader from "./AppHeader.jsx";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import CryptoContext from "../../src/context/crypto-context.jsx";

const {Header, Footer, Sider, Content} = Layout;


export default function AppLayout() {

    const {loading } = useContext(CryptoContext);

    if (loading) {
        return <Spin fullscreen/>
/// прокрутка спиннера  - имитация загрузки
    }
    return (<Layout>
        <AppHeader/>
        <Layout>
            <AppSider/>
            <AppContent/>
        </Layout>
    </Layout>)
}
