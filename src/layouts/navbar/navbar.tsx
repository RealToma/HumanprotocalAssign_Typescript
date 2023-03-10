import { Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../utils/connectors';
import MetaMaskImg from '../../assets/wallet/metamask.png';
import Coin98Img from '../../assets/wallet/coin98.png';
import CoinbaseImg from '../../assets/wallet/coinbase.svg';
import WalletConnectImg from '../../assets/wallet/walletConnect.svg';

const Navbar = () => {
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState<any>(false);
    const [flagDrop, setDrop] = useState<any>(false);

    const DESKTOP_CONNECTORS: any = {
        MetaMask: injected,
        WalletConnect: injected,
        BinanceWallet: injected,
        TrustWallet: injected,
    };
    const walletConnectors: any = DESKTOP_CONNECTORS;
    const { account, active, activate, deactivate } = useWeb3React();

    useEffect(() => {
        const currentWalletState = window.localStorage.getItem('CurrentWalletConnect');
        currentWalletState && activate(walletConnectors[currentWalletState]);
    }, [activate, walletConnectors]);

    const handleConnect = async (currentConnector: any) => {
        await activate(walletConnectors[currentConnector]);
        // set_wConnect(walletConnectors[currentConnector]);
        window.localStorage.setItem('CurrentWalletConnect', currentConnector);
        handleClose();
    };

    return (
        <StyledComponent>
            <ConnectWalletBtn
                onClick={() => {
                    // if (window.localStorage.getItem("CurrentWalletConnect") !== "") {
                    //   return;
                    // }
                    if (active) {
                        setOpen(false);
                        setDrop(!flagDrop);
                    } else {
                        setOpen(true);
                    }
                    // setOpen(true);
                }}
                onMouseLeave={() => {
                    setDrop(false);
                }}
            >
                {active ? (
                    `${account?.slice(0, 6)}...${account?.slice(-4)}`
                ) : (
                    <>
                        <FaWallet />
                        <Box display={'flex'} ml={'10px'}>
                            Connect
                        </Box>
                    </>
                )}
                {flagDrop ? (
                    <DropBox
                        onClick={async () => {
                            setDrop(false);
                            // await deactivate(window.localStorage.getItem('CurrentWalletConnect'));
                            await deactivate();
                            window.localStorage.removeItem('CurrentWalletConnect');
                        }}
                    >
                        <BiExit />
                        Disconnect
                    </DropBox>
                ) : (
                    <></>
                )}
            </ConnectWalletBtn>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <UpText>Select Wallet</UpText>
                    <DownText>
                        Connect to the site below with one of our available wallet providers.
                    </DownText>
                    <ConnectPart>
                        <ConnectWallet
                            onClick={() => {
                                handleConnect('MetaMask');
                            }}
                        >
                            <Box display={'flex'} marginLeft={'5%'}>
                                Metamask
                            </Box>
                            <Box display={'flex'} marginRight={'5%'}>
                                <img src={MetaMaskImg} width={'24px'} height={'24px'} alt="" />
                            </Box>
                        </ConnectWallet>
                        <ConnectWallet
                            onClick={() => {
                                // handleConnect("TrustWallet");
                            }}
                        >
                            <Box display={'flex'} marginLeft={'5%'}>
                                Coinbase Wallet
                            </Box>
                            <Box display={'flex'} marginRight={'5%'}>
                                <img src={CoinbaseImg} width={'24px'} height={'24px'} alt="" />
                            </Box>
                        </ConnectWallet>
                        <ConnectWallet
                            onClick={() => {
                                // handleConnect("WalletConnect");
                            }}
                        >
                            <Box display={'flex'} marginLeft={'5%'}>
                                WalletConnect
                            </Box>
                            <Box display={'flex'} marginRight={'5%'}>
                                <img src={WalletConnectImg} width={'24px'} height={'24px'} alt="" />
                            </Box>
                        </ConnectWallet>
                        <ConnectWallet
                            onClick={() => {
                                // handleConnect("MetaMask");
                            }}
                        >
                            <Box display={'flex'} marginLeft={'5%'}>
                                Coin98
                            </Box>
                            <Box display={'flex'} marginRight={'5%'}>
                                <img src={Coin98Img} width={'24px'} height={'24px'} alt="" />
                            </Box>
                        </ConnectWallet>
                    </ConnectPart>
                </ModalBox>
            </Modal>
        </StyledComponent>
    );
};

const StyledComponent = styled(Box)`
    display: flex;
    width: 100%;
    min-height: 100px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 50px;
`;

const ConnectWalletBtn = styled(Box)`
    display: flex;
    position: relative;
    width: 200px;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background-color: #5b32da;
    color: white;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 20px #8366da;
    }
`;

const ConnectWallet = styled(Box)`
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 2%;
    margin-bottom: 2%;
    justify-content: space-between;
    align-items: center;
    background: #f1f3f5;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    transition: 0.5s;
    &:hover {
        box-shadow: 0px 0px 20px #8366da;
    }
`;

const ConnectPart = styled(Box)`
    display: flex;
    flex: 4;
    flex-direction: column;
    font-family: 'Inter', sans-serif !important;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -0.01em;
    color: #5b32da;

    cursor: pointer;
    user-select: none;
    transition: 0.3s;
`;

const UpText = styled(Box)`
    display: flex;
    flex: 1;
    align-items: center;
    font-family: 'Inter', sans-serif !important;
    font-style: normal;
    letter-spacing: -0.01em;
    font-weight: 600;
    font-size: 24px;
    line-height: 100%;
    color: white;
`;
const DownText = styled(Box)`
    display: flex;
    flex: 1;
    align-items: flex-start;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    font-family: 'Inter', sans-serif !important;
    font-style: normal;
    letter-spacing: -0.01em;
    color: white;
`;

const ModalBox = styled(Box)`
    display: flex;
    width: 350px;
    height: 400px;
    flex-direction: column;
    background-color: #5b32da;
    border: none;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(100px) !important;
    border-radius: 20px !important;
    padding: 30px;
    transition: box-shadow 300ms;
    transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
    outline: none;
    animation: back_animation1 0.5s 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes back_animation1 {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
    @media (max-width: 600px) {
        transition: 0.5s !important;
        width: 300px;
    }
    @media (max-width: 450px) {
        transition: 0.5s !important;
        width: 200px;
        height: 330px;
    }
`;

const DropBox = styled(Box)`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    left: 0%;
    bottom: -40px;
    width: 200px;
    height: 40px;

    border-radius: 0px 0px 8px 8px;
    /* background: hsla(0,30%,100%,.8); */
    border: none;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.01em;

    color: white;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        /* box-shadow: 0px 10px 10px rgb(0 0 0  / 20%), inset 2px 2px 2px #fff; */
        /* background: white; */
        color: #8366da;
    }
`;

export default Navbar;
