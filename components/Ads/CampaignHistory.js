import { Text, Box, Container, Button, TableContainer, Thead, Td, Tr, Th, Tbody, Table, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import styles from './builder.module.css';
import { useState, useEffect } from 'react'
import axios from "axios";

export default function CampaignHistory({ userID }) {
    const [prevCampaigns, setPrevCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(undefined);

    function handleEntryOnClick(campaign) {
        if (selectedCampaign && campaign._id == selectedCampaign._id) {
            setSelectedCampaign(undefined);
        } else {
            setSelectedCampaign(campaign)
        }
    }

    async function getPrevCampaigns() {
        const campaigns = await axios.get('/api/get_campaign', {
            params: {
                userID: userID
            }
        });
        setPrevCampaigns([...campaigns.data.data]);
    }

    useEffect(() => {
        // load prev campaigns if exists
        getPrevCampaigns()
    }, []);

    return (
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
                    : <></>
                }
            </Box>
        </Box>
    );
}