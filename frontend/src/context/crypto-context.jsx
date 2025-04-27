import {createContext, useContext, useEffect, useState} from "react";
import {localFetchCrypto, localFetchCryptoAssets} from "../Api.js";
import {persentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets : [],
    crypto : [],
    loading: false,
})

function mapAssets(assets, result) {

    return assets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id)
        // console.log(coin)
        return {
            grow: asset.price < coin.price,
            /// выводим больше или меньше
            growPercent: persentDifference(asset.price, coin.price),
            /// вычисляем в процентах
            totalAmount: asset.amount * coin.price,
            /// общая стоимость = кол * текушая цена
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            //
            name: coin.name,
            ...asset
        }
    })
}

export function  CryptoContextProvider({ children }) {



    const [loading, setLoading  ] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);


    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await localFetchCrypto()
            const assets = await localFetchCryptoAssets()


            // setAssets(assets.map((asset) => {
            // const coin = result.find((c) => c.id === asset.id)
            // // console.log(coin)
            // return {
            //     grow: asset.price < coin.price,
            //     /// выводим больше или меньше
            //     growPercent: persentDifference(asset.price, coin.price),
            //     /// вычисляем в процентах
            //     totalAmount: asset.amount * coin.price,
            //     /// общая стоимость = кол * текушая цена
            //     totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            //     //
            //     ...asset
            // }

            // }))
            // setCrypto(result)
            // setLoading(false)
            // }
            //  переносим в функцию всего функцтонала в mapAsset
            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, []);

function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
}

    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset}}>  {children} </CryptoContext.Provider>
}

export default CryptoContext;

export function useCrypto() {
    return useContext(CryptoContext)
}

/// используем кастомный (собственный) хук для исп. контекста