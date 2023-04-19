
const tokenContract = "0xaec92d302CE4b7F175B33Ef16f64145B244D227c";


ethereum.on('chainChanged', (_chainId) => {
     console.log(_chainId);
    window.location.reload();
  });

async function checkChain(){
    currentChainID = await ethereum.request({ method: 'eth_chainId' });
    console.log(currentChainID);

    if (currentChainID == "0x38") {
        const x = await window.ethereum.request({ method: "eth_requestAccounts" });
        account = x[0];
     //   document.getElementById("connectBtnTop").innerText = account.substring(0,5) + "..." + account.substring(37, account.lenght);
        document.getElementById("logBtn").style.display = "none";
      //  document.getElementById("selectNftBtn").style.display = "unset";
        document.getElementById("loading").style.display = "unset";

      //  window.web3 = new Web3(window.ethereum);
      //  document.getElementById("connectBtnTop").onclick = function (){};
       console.log(account);
       loginWithWallet(account);
       
     }else{
      //  document.getElementById("connectBtn").innerText = "connect to Polyogn chain!";
        addPolyogn();
     }
}
function addPolyogn(){
    window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
        chainId: '0x38',
        chainName: 'Binance smart chain',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: [' https://bscscan.com']
        }]
        })
        .catch((error) => {
        console.log(error)
        }) 
}
async function connect() {
    if (window.ethereum) {
        checkChain();
    } else {
      console.log("No wallet");
    }
}

async function checkWallet(){
  
    const NameContract = web3.Contract(nftAbi, tokenContract);
    var balance = await NameContract.methods.balanceOf(account).call(); 

    balance = Web3.utils.fromWei(balance, 'ether');

    console.log(balance);
}
