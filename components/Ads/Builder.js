import { Text, Box, Select, FormLabel, Container, FormControl, Textarea, Input, Button, TableContainer, Thead, Td, Tr, Th, Tbody, Table, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import styles from './builder.module.css';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from "axios";

const CURRENT_ADVERTISER = 'test';

export default function Builder({ builderSelected }) {
    const [prevCampaigns, setPrevCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(undefined);
    const [mode, setMode] = useState('simple');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('30');
    const [budget, setBudget] = useState('');
    const inputRef = useRef();
    const [files, setFiles] = useState([]);
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
    }, [])


    const handleOnFileChange = (e) => {
        console.log(e.target.files);
        setFiles([...e.target.files].filter((fileObj) => fileObj.size < 2097152 && fileObj.type.startsWith('image')));
    }

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleDurationChange = (e) => {
        setDuration(e.target.value)
    }

    const handleBudgetChange = (e) => {
        setBudget(e.target.value)
    }

    const handleCampaignOnClick = () => {
        const formData = new FormData();

        files.forEach((f) => {
            formData.append('files', f)
        })
        formData.append('mode', mode)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('duration', parseInt(duration))
        formData.append('advertiser', CURRENT_ADVERTISER)

        const floatBudget = parseFloat(budget);
        if (isNaN(floatBudget)) {
            console.log('invalid budget');
            return;
        }

        formData.append('budget', floatBudget)

        for (const e of formData.entries()) { console.log(e) }
        axios.post('/api/create_campaign', formData)
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message === undefined ? "Unauthorized usage of auth0" : error.message}</div>;
    };

    if (user) {
        return (
            <Box className={`${styles.builder} ${builderSelected ? '' : styles.noDisplay}`}>
                <Box className={styles.row}>
                    <Box className={styles.section}>
                        <Text fontSize='3xl'>1. Campaign</Text>
                        <FormControl>
                            <Box className={styles.row}>
                                <Box className={styles.section}>
                                    <Box className={styles.textin}>
                                        <FormLabel>Mode</FormLabel>
                                        <Select onChange={handleModeChange}>
                                            <option value='simple'>Simple</option>
                                            <option value='airdrop'>Airdrop</option>
                                        </Select>
                                    </Box>
                                </Box>
                                <Box className={styles.section}>
                                    <Box className={styles.textin}>
                                        <FormLabel>Title</FormLabel>
                                        <Input placeholder='Title' onChange={handleTitleChange} className={styles.textin} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles.row}>
                                <Box className={styles.section}>
                                    <FormLabel>Description</FormLabel>
                                    <Box className={styles.textin}>
                                        <Textarea className={styles.textin} placeholder='I want to run a campaign on my...' onChange={handleDescriptionChange} />
                                        <input
                                            type="file"
                                            ref={inputRef}
                                            style={{ display: "none" }}
                                            multiple={true}
                                            onChange={handleOnFileChange}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </FormControl>
                        <Box className={styles.row}>

                            <Box className={styles.bottom}>
                                <Button variant='outline' colorScheme='purple' onClick={() => { inputRef.current.click() }}>Upload Media</Button>
                            </Box>

                        </Box>

                    </Box>
                    <Box className={styles.section}>
                        <Box className={styles.row}>
                            <Text fontSize='3xl'>2. Details</Text>
                        </Box>
                        <FormControl className={styles.makeflex}>

                            <Box className={styles.section}>
                                <FormLabel>Duration</FormLabel>
                                <Box className={styles.textin}>
                                    <Select className={styles.textin} onChange={handleDurationChange} >
                                        <option value='30'>30 Days</option>
                                        <option value='60'>60 Days</option>
                                    </Select>
                                </Box>
                            </Box>
                            <Box className={styles.section}>
                                <FormLabel>Budget</FormLabel>
                                <Box className={styles.textin}>
                                    <Input className={styles.textin} placeholder='$' onChange={handleBudgetChange} />
                                </Box>
                            </Box>


                        </FormControl>
                        <Box className={`${styles.row} ${styles.fill}`}>
                            <Box className={` ${styles.bottom}`}>
                                <Button variant='outline' colorScheme='purple' onClick={handleCampaignOnClick}>Run Campaign</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
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
