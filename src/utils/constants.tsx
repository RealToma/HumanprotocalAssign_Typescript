const IS_MAINNET = process.env.REACT_APP_NETWORK === 'mainnet';

const CONTRACTS = IS_MAINNET
    ? {
          addressCAT: '0xd054e5724d7D595B72AbbB0C460e0221cD859C8f',
      }
    : {
          addressCAT: '0xd054e5724d7D595B72AbbB0C460e0221cD859C8f',
      };

const HTTP_PROVIDER_URL = IS_MAINNET
    ? 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    : 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

export { IS_MAINNET, CONTRACTS, HTTP_PROVIDER_URL };
