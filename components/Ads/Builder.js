import { Text, Box, Container, Button, TableContainer, Thead, Td, Tr, Th, Tbody, Table, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import styles from './builder.module.css';
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from "axios";
import CampaignBuilder from './CampaignBuilder';

export default function Builder({ builderSelected }) {
    const [prevCampaigns, setPrevCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(undefined);
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    function handleEntryOnClick(campaign) {
        if (selectedCampaign && campaign._id == selectedCampaign._id) {
            setSelectedCampaign(undefined);
        } else {
            setSelectedCampaign(campaign)
        }
    }

    async function getPrevCampaigns() {
        const campaigns = await axios.get('/api/get_campaign');
        console.log(campaigns.data.data)
        console.log(campaigns["data"])
        setPrevCampaigns([...campaigns.data.data]);
    }

    useEffect(() => {
        // load prev campaigns if exists
        getPrevCampaigns()
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message === undefined ? "Unauthorized usage of auth0" : error.message}</div>;
    };

    if (user) {
        return (
            <Box className={`${styles.builder} ${builderSelected ? '' : styles.noDisplay}`}>
                <CampaignBuilder />
                <Box className={styles.row} my='16'>
                    <Box className={`${styles.section} ${prevCampaigns ? '' : styles.hidden}`}>
                        <TableContainer >
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Campaigns</Th>
                                        <Th>Remaining</Th>
                                        <Th>Description</Th>
                                    </Tr>
                                </Thead>
                                {
                                    prevCampaigns.map((campaign) => {
                                        return <Tbody className={`${styles.tableEntry} ${selectedCampaign && campaign._id == selectedCampaign._id ? styles.selected : ''}`} key={campaign._id} onClick={() => { handleEntryOnClick(campaign); }}><Tr>
                                            <Td>{campaign.title}</Td>
                                            <Td>{campaign.timeRemaining} days</Td>
                                            <Td>{campaign.description.slice(0, 10)}</Td>
                                        </Tr></Tbody>
                                    })
                                }
                            </Table>
                        </TableContainer>


                    </Box>
                    <Box className={`${styles.section} ${prevCampaigns ? '' : styles.hidden}`}>
                        {selectedCampaign ?
                            <Accordion allowMultiple>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                Content
                                            </Box>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <img className={styles.preview} src={`data:image/png;base64,${Buffer.from(selectedCampaign.media).toString('base64')}`} />
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                Details
                                            </Box>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Box>{selectedCampaign.timeRemaining} days remaining</Box>
                                        <Box>${selectedCampaign.budget} left in your budget</Box>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            : <></>}
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Container maxW="xl" mt={80} textAlign="center">
            <Text fontSize="xl" mb={4}>
                You are not logged in, please hit the continue to create a new account or login into your account.
            </Text>
            <Button colorScheme="blue" onClick={() => router.push('/api/auth/login')}>
                Login
            </Button>
        </Container>
    );
}
