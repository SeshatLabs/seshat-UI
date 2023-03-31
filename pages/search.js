import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useState } from 'react';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import Graph from '../components/Graph';
import { ReactFlowProvider } from 'reactflow';
import { SimpleGrid } from '@chakra-ui/react';

export default function Home() {
  const [searched, setSearched] = useState(false);
  const [inputText, setInputText] = useState('');
  const [hop, setHop] = useState(0);
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    setSearched(true);
    setSearchText(inputText);
  }

  const handleTextInput = (e) => {
    setInputText(e.target.value)
  }

  const handleHopInput = (e) => {
    setHop(e.target.value)
  }

  return (

    <div className={styles.container}>
      <Head>
        <title>SocialBlock - Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={searched ? styles.finishedSearch : styles.main}>
        <SimpleGrid columns={2} className={styles.searchBar} spacing={10}>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={'text'}
              placeholder='Address'
              onChange={handleTextInput}
            />
            <InputRightElement width='4.5rem' >
              <Button h='1.75rem' size='sm' onClick={handleSearch}>
                Search
              </Button>
            </InputRightElement>

          </InputGroup>
          <InputGroup size='sm'>
            <Input
              pr='4.5rem'
              type={'text'}
              placeholder='Hop'
              onChange={handleHopInput}
            />
          </InputGroup>
        </SimpleGrid>

      </div>
      <div className={`${styles.flow} ${searched ? '' : styles.noDisplay}`}><ReactFlowProvider><Graph searchText={searchText} hop={hop}></Graph></ReactFlowProvider></div>
    </div>
  )
}
