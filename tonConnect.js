import { TonConnectUI,THEME } from '@tonconnect/ui';
import { Cell } from '@ton/ton';


//  Create TonConnectUI instance
export const tonConnectUI = new TonConnectUI({ //连接应用
    manifestUrl: 'https://ton-connect-demo.netlify.app/tonconnect-manifest.json', // public 目录下tonconnect-manifest.json，根据项目情况修改
    buttonRootId: 'ton-connect-button', // Connect Wallect Button Id,自定义Button打开不需要配置
    uiPreferences: {theme: THEME.LIGHT }, // 配置UI主题色有亮色和深色可选
    actionsConfiguration: {
        twaReturnUrl: 'https://t.me/Simple_Dao_Bot/orders' //返回地址，根据项目情况修改,只有在TMA模式下打开dApp时才会应用该链接。
    }
});

const transaction = {
    // The transaction is valid for 10 minutes from now, in unix epoch seconds.
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
  
      {
        // The receiver's address.
        address: '0QCn3eLz1a8OUYSvOUkRmYjMT9Wd0Zsz5_OEQLbCnNAv74aC',
        // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
        amount: '20000000',
      },
      {
        // The receiver's address.
        address: 'UQDTFsNMabhWWQub-HfMsCtHngXJubl1iDdmM__rM-KtGXGR',
        // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
        amount: '20000000',
      }
  
    ],
  };
  

let connectedWalletInfo = null

// Subscribe to the connection status changes
const unsubscribe = tonConnectUI.onStatusChange(
    walletAndwalletInfo => {
        connectedWalletInfo = walletAndwalletInfo
        if(walletAndwalletInfo){
            renderButton()
        }else{
            renderConnectWalletButton()
        }
    } 
);

// getTransactionHash  
export const getTransactionHash = (boc)=>{
    console.log('boc',boc)
    // 将Base64编码的Boc数据解码为二进制格式
    const bocBuffer = Buffer.from(boc, 'base64');

    // 使用Cell类解析Boc数据
    const rootCell = Cell.fromBoc(bocBuffer)[0];
    // 获取交易哈希
    const hash = rootCell.hash().toString('base64');

    console.log('Transaction Hash:', hash);
    return hash
   
  }

const renderButton = ()=>{
    document.querySelector('#transaction-box').innerHTML=` <button id="sendTxns"  type="button">Send transaction</button>`
    document.querySelector('#sendTxns').addEventListener('click',async()=>{
        const result = await sendTransaction(transaction)
        renderBoc(result.boc)
        const hash =  getTransactionHash(result.boc)
        renderHash(hash)
    })
    
}


// Send transaction
export const sendTransaction = async (transaction)=>{
   return await tonConnectUI.sendTransaction(transaction)
  }



const renderConnectWalletButton = ()=>{
   document.querySelector('#transaction-box').innerHTML=` <button id="connectWalletSendTxns"  type="button">Connect wallet to send the transaction</button>`
   // 自定义button打开Modal
   document.querySelector('#connectWalletSendTxns').addEventListener('click',async()=>{
   tonConnectUI.openModal()
})
}

const renderBoc = (boc)=>{
    document.querySelector('#boc-box').innerHTML= `boc:${boc}`
 }

 const renderHash = (hash)=>{
    document.querySelector('#hash-box').innerHTML= `hash:${hash}`
 }


// Disconnect wallet
 export const disconnectWallet = async ()=>{
    await tonConnectUI.disconnect();
 }

renderConnectWalletButton()



