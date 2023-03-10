import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Navbar from './layouts/navbar/navbar';
import Content from './layouts/content/content';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { NotificationContainer } from 'react-notifications';

function getLibrary(provider: any) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <StyledComponent>
                <Navbar />
                <Content />
                <NotificationContainer />
            </StyledComponent>
        </Web3ReactProvider>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: black;
`;
export default App;
