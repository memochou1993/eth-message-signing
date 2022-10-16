import './style.css';
import { ethers } from 'ethers';
import Web3 from 'web3';

const sign = async () => {
  const message = 'hello';
  const hexMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
  const web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  const [account] = await web3Provider.send('eth_requestAccounts');
  const sig = await web3Provider.getSigner().signMessage(message);
  const recovered = ethers.utils.verifyMessage(message, sig);

  console.log('message', message);
  console.log('hexMessage', hexMessage);
  console.log('account', account);
  console.log('sig', sig);
  console.log('recovered', recovered);
};

const sign2 = async () => {
  const web3 = new Web3(window.ethereum);
  const [account] = await web3.eth.getAccounts();
  const message = 'hello';
  const hexMessage = web3.utils.utf8ToHex(message);
  const sig = await web3.eth.personal.sign(hexMessage, account, '');
  const recovered = await web3.eth.personal.ecRecover('hello', sig);

  console.log('message', message);
  console.log('hexMessage', hexMessage);
  console.log('account', account);
  console.log('sig', sig);
  console.log('recovered', recovered);
};

const app = document.getElementById('app');

const signButton = document.createElement('button');
signButton.onclick = sign;
signButton.innerHTML = 'Sign with Ethers.js';
app.appendChild(signButton);

const signButton2 = document.createElement('button');
signButton2.onclick = sign2;
signButton2.innerHTML = 'Sign with Web3.js';
app.appendChild(signButton2);
