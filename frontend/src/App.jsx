import React from 'react';

import {Layout} from 'antd';

import AppLayout from "../components/layout/AppLayout.jsx";
// import CryptoContext, {CryptoContextProvider} from "./context/crypto-context.jsx";
import CryptoContext, {CryptoContextProvider} from "./context/crypto-context.jsx";

const {Header, Footer, Sider, Content} = Layout;

// const headerStyle = {
//     textAlign: 'center',
//     color: '#fff',
//     height: 60,
//     paddingInline: 48,
//     lineHeight: '64px',
//     backgroundColor: '#4096ff',
// };


// const layoutStyle = {
//     borderRadius: 8,
//     overflow: 'hidden',
//     width: 'calc(50% - 8px)',
//     maxWidth: 'calc(50% - 8px)',
// };


//
export default function App() {
    return (
<CryptoContextProvider>
        <AppLayout/>
</CryptoContextProvider>

    )
}
