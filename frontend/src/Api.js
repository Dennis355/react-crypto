import {cryptoAssets, cryptoData} from "./data.js";


// export {cryptoAssets, cryptoData} from "./data.js"


export  function  localFetchCrypto () {
 return new Promise((resolve) => {
     setTimeout(() => { resolve(cryptoData) }, 2000);
 })
}


export function  localFetchCryptoAssets () {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(cryptoAssets) }, 2000);
    })
}


