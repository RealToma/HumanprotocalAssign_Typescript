import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import CustomBtn from '../../components/CustomBtn';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { CONTRACTS } from '../../utils/constants';
import { abiCAT } from '../../utils/abi';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Content = () => {
    const [meows, setMeows] = useState<any>();

    const [stringMessage, setMessage] = useState<any>('');
    const { active, library } = useWeb3React();

    const contractCAT: any = useMemo(
        () =>
            library ? new ethers.Contract(CONTRACTS.addressCAT, abiCAT, library.getSigner()) : null,
        [library],
    );

    const handleSetMeows = async () => {
        try {
            console.log(stringMessage);
            const resSayMeow = await contractCAT.sayMeow(stringMessage);
            await resSayMeow.wait();
            NotificationManager.success('Successed added.', '', 3000);
            handleGetMeows();
        } catch (e) {
            console.log(e);
            NotificationManager.warn('Failed', '', 3000);
        }
    };

    const formatAddress = (address: any) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleGetMeows = useCallback(async () => {
        try {
            let resGetAllMeows = await contractCAT.getAllMeows();
            // --------- get owned meows -------------
            // let tempMeows = [];
            // for (let i = 0; i < Object.keys(resGetAllMeows).length; i++) {
            //   let temp = resGetAllMeows[i];
            //   if (temp[1] === account) {
            //     tempMeows.push(temp[0]);
            //   }
            // }
            // console.log(resGetAllMeows);
            setMeows(resGetAllMeows);
            NotificationManager.success('Updated, check again.', '', 3000);
        } catch (e) {
            console.log(e);
            NotificationManager.warn('Failed', '', 3000);
        }
    }, [contractCAT]);

    useEffect(() => {
        if (active) {
            handleGetMeows();
        }
    }, [active, handleGetMeows]);

    return (
        <StyledComponent>
            <MintBox>
                <Box
                    display={'flex'}
                    flex={'1'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                >
                    <LeftMintMox>
                        <TitleText01>Write Contract</TitleText01>
                        <InputBox01>
                            <TitleText02>Type Message :</TitleText02>
                            <Input01
                                component={'input'}
                                onChange={(e: any) => {
                                    setMessage(e.target.value);
                                }}
                            ></Input01>
                        </InputBox01>
                        <Box
                            display={'flex'}
                            width={'100%'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            mt={'40px'}
                        >
                            <Box
                                display={'flex'}
                                flex={'1'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                mr={'20px'}
                                onClick={() => {
                                    handleSetMeows();
                                }}
                            >
                                <CustomBtn
                                    width={'100%'}
                                    height={'50px'}
                                    str={'Say Meows'}
                                    fsize={'1.5rem'}
                                    fcolor={'#5b32da'}
                                    bgcolor={'white'}
                                    border={'none'}
                                    bradius={'8px'}
                                    fweight={'600'}
                                />
                            </Box>
                        </Box>
                    </LeftMintMox>
                </Box>
                <Box
                    display={'flex'}
                    flex={'0.1'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                ></Box>
                <Box
                    display={'flex'}
                    flex={'1'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                >
                    <LeftMintMox>
                        <TitleText01>Read Contract</TitleText01>
                        <SubjectBox>
                            <TitleText02>Display Meows : </TitleText02>
                        </SubjectBox>
                        <SectionDisplayMeows>
                            {meows?.map((each: any, index: any) => {
                                return (
                                    <TextList01
                                        key={index}
                                        borderBottom={
                                            index === meows.length - 1
                                                ? 'unset'
                                                : '1px dashed solid grey'
                                        }
                                    >
                                        {index + 1}: {each[0]}, {'\u00a0'}
                                        <span style={{ color: '#0ce7b4' }}>
                                            {formatAddress(each[1])}
                                        </span>
                                    </TextList01>
                                );
                            })}
                        </SectionDisplayMeows>
                        <Box
                            display={'flex'}
                            width={'100%'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            mt={'40px'}
                        >
                            <Box
                                display={'flex'}
                                flex={'1'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                mr={'20px'}
                                onClick={() => {
                                    handleGetMeows();
                                }}
                            >
                                <CustomBtn
                                    width={'100%'}
                                    height={'50px'}
                                    str={'Get All Meows'}
                                    fsize={'1.5rem'}
                                    fcolor={'#5b32da'}
                                    bgcolor={'white'}
                                    border={'none'}
                                    bradius={'8px'}
                                    fweight={'600'}
                                />
                            </Box>
                        </Box>
                    </LeftMintMox>
                </Box>
            </MintBox>
        </StyledComponent>
    );
};

const StyledComponent = styled(Box)`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
`;

const MintBox = styled(Box)`
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-top: 200px;
`;
const LeftMintMox = styled(Box)`
    display: flex;
    width: 70%;
    padding: 30px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    background-color: #5b32da;
    border-radius: 8px;
    border: none;
    outline: none;
    color: white;
    transition: 0.3s;
    &:hover {
        box-shadow: 0px 0px 30px #8366da;
    }
    @media (max-width: 1600px) {
        width: 85% !important;
    }
    @media (max-width: 1200px) {
        width: 95% !important;
    }
`;

const TitleText01 = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
`;

const TextList01 = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid grey;
`;

const TitleText02 = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 400;
`;

const InputBox01 = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
`;
const Input01 = styled(Box)`
    display: flex;
    flex: 1;
    width: 100%;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 400;
`;

const SubjectBox = styled(Box)`
    display: flex;
    align-items: center;
    margin-top: 40px;
`;

const SectionDisplayMeows = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    margin-top: 20px;
    overflow-y: auto;
`;

export default Content;
