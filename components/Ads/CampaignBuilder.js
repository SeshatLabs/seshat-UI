import styles from './builder.module.css';
import { Text, Box, Select, FormLabel, FormControl, Textarea, Input, Button } from "@chakra-ui/react";
import { useState, useRef } from 'react'
import axios from "axios";

export default function CampaignBuilder({ user_sid }) {
    const [mode, setMode] = useState('simple');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('30');
    const [budget, setBudget] = useState('');
    const inputRef = useRef();
    const [files, setFiles] = useState([]);

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
        formData.append('advertiser', user_sid)

        const floatBudget = parseFloat(budget);
        if (isNaN(floatBudget)) {
            console.log('invalid budget');
            return;
        }

        formData.append('budget', floatBudget)

        for (const e of formData.entries()) { console.log(e) }
        axios.post('/api/create_campaign', formData)
    }
    return (
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
    );
}