import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Selector from '../components/Ads/Selector';
import Builder from '../components/Ads/Builder';
import Explainer from '../components/Ads/Explainer';
import { useState } from 'react';
import { Box } from "@chakra-ui/react"

export default function Ads() {
    const [builderSelected, setBuilderSelected] = useState(true);
    return (
        <div className={styles.container}>
            <Head>
                <title>Seshat - Ads</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.main}>
                <Selector builderSelected={builderSelected} setBuilderSelected={setBuilderSelected} />
                <div className={styles.adSection}>
                    <Box my='10' mx='auto' maxW='1600px'>
                        <Builder builderSelected={builderSelected} />
                        <Explainer builderSelected={builderSelected} />
                    </Box>
                </div>
            </div>
        </div>
    )
}
