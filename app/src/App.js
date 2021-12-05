import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  //States declarations
  const [walletAdress, setWalletAddress] = useState(null);

  //Actions
  //Check if user has connected wallet
  const checkIfWalletIsConnected = async () => {
    try{
      const { solana } = window; //solana wallet

      if(solana){
        if (solana.isPhantom){
          console.log('Phantom Solana wallet was found');

          //Solana gives access to selected website to use user's wallet
          const response = await solana.connect({ onlyIfTrusted: true});
          console.log('Connected with Public Key:', response.publicKey.toString());

          //Store users public adress (we are using it later)
          setWalletAddress(response.publicKey.toString());
        }
      }else{
        alert('Solana object is not found. Get Phantom Wallet!');
      }
    }catch(error){
      console.log(error);
    }
  };

  //Method to generate connect user Wallet button
  const connectWallet = async () =>{
    const { solana } = window;

    if(solana){
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

    //We want to show the button only when the user has not connected his wallet to the app yet
  const renderNotConnectedContainer = () => (
    <button 
    className="cta-button connect-wallet-button"
      onClick={connectWallet}
    > 
      Connect to Wallet
      </button>
  );
  

  //Method executed each time page is load
  //Check if wallet is connected (called to method)
  useEffect(() => {
    const onLoad = async () => { //Phantom wallet teem suggets to wait until fully finish loading before checking
      //for solana object
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/*Render to connect to wallet button here*/}
          {!walletAdress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
