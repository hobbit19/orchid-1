import React, {FC, useState} from "react";
import {Container} from "react-bootstrap";
import './NoWallet.css';
import bugs from '../assets/bugs.png';
import metamask from '../assets/wallet-logos/metamask.png';
import coinbasewallet from '../assets/wallet-logos/coinbasewallet.svg';
import trustwallet from '../assets/wallet-logos/trustwallet.svg';
import breadwallet from '../assets/wallet-logos/bread-wallet.png';
import {SubmitButton} from "./SubmitButton";
import {WalletStatus} from "../api/orchid-api";
import {copyTextToClipboard} from "../util/util";

export const NoWallet: FC<{ walletStatus: WalletStatus }> = (props) => {
  const [buttonCopiedState, setButtonCopiedState] = useState(false);

  function copyUrl() {
    let text = window.location.href;
    copyTextToClipboard(text);

    // Show copied message in the button
    setButtonCopiedState(true);
    setTimeout(() => {
      setButtonCopiedState(false);
    }, 1000);
  }

  let wrongNetwork = props.walletStatus === WalletStatus.WrongNetwork;

  if (wrongNetwork) {
    return (
      <Container className="WrongNetwork" style={{textAlign: 'center'}}>
        <div className="WrongNetwork-title">You’re almost there!</div>
        <div className="WrongNetwork-text">Please select the Ethereum Main Network in your Dapp Browser!</div>
        <img className="WrongNetwork-image" src={bugs} alt="Bugs"/>
      </Container>
    )
  } else {
    return (
      <Container className="NoWallet" style={{textAlign: 'center'}}>
        <div className="NoWallet-title">Let’s get started!</div>
        <div className="NoWallet-text">
          Create a new Ethereum wallet address and then load <a href="https://account.orchid.com">account.orchid.com</a> in that wallet's browser.
          <br/>
          <br/>
          We recommend these wallets:
        </div>
        <div className="NoWallet-images">
          <a className="metamask" href="https://metamask.io/"><img src={metamask} alt="metamask" /></a>
          <a className="trustwallet" href="https://trustwallet.com/"><img src={trustwallet} alt="Trust Wallet" /></a>
          <a className="breadwallet" href="https://brd.com/"><img src={breadwallet} alt="bread" /></a>
          <a className="coinbasewallet" href="https://wallet.coinbase.com/"><img src={coinbasewallet} alt="coinbase Wallet" /></a>
        </div>

        <div className="NoWallet-smalltext">
          Privacy note: we recommend using a new Ethereum wallet for Orchid that is not linked to other Ethereum products or services you use. <a href="https://www.orchid.com/faq#orchid-app--why-new-wallet">(learn more)</a>
        </div>

        <div style={{marginTop: '16px'}}>
          <SubmitButton
            onClick={copyUrl}
            enabled={true}>
            {buttonCopiedState ? "Copied!" : "Copy URL"}
          </SubmitButton>
        </div>

        <div className="NoWallet-fullguide">
          Need more help getting started? <br/>
          <a href="https://www.orchid.com/join">See the Join Now guide on orchid.com</a>
        </div>
      </Container>
    )
  }
};
