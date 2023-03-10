import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

const IS_MAINNET: any = process.env.REACT_APP_NETWORK === 'mainnet';
const chainId: any = IS_MAINNET ? 1 : 5;

const injected: any = new InjectedConnector({ supportedChainIds: [chainId] });

export const getLibrary = (provider: any) => {
    const library = new ethers.JsonRpcProvider(provider);
    library.pollingInterval = 12000;
    return library;
};

export { injected };
