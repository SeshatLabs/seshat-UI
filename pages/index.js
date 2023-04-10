import * as THREE from "three";
import { useEffect, useRef, useState, useCallback } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import NavBar from "../components/Header";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Box, Heading, Textarea, Button, Card, Stack, CardBody, Divider, CardFooter, ButtonGroup, Image, Text, SimpleGrid, useBreakpointValue
} from "@chakra-ui/react";
import Selector from '../components/Ads/Selector';
import Header from '../components/Header'


const SEARCH_ENDPOINT = 'https://lg-research-1.uwaterloo.ca/search';


const Home = () => {
  const containerRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const rendererRef = useRef();
  const [objectsList, setObjectsList] = useState([]);
  const [edgesList, setEdgesList] = useState([]);
  const [objectNames, setObjectNames] = useState('');
  const [marketerSelect, setMarketerSelect] = useState(true);
  const [names, setNames] = useState([]);
  const [rawData, setRawData] = useState(false);
  const [searchAddress, setSearchAddress] = useState('0xe3108157338a6038410d18a2d70f2fe579ca7414');
  const [showme, setShowme] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);


  const changeObjectsColor = (namesList) => {
    namesList.forEach((name, index) => {
      const object = objectsList.find((obj) => obj.userData.name === name.trim());
      if (object && !object.userData.resized) {
        const intensity = 1 - index / namesList.length;
        const color = new THREE.Color(0x800080);
        color.multiplyScalar(intensity);
        object.material.color.set(color);
        object.scale.set(object.scale.x * 2, object.scale.y * 2, object.scale.z * 2);
        object.userData.resized = true;
      }
    });
  };

  const showPopup = (object) => {
    const popupDiv = document.createElement("div");
    popupDiv.className = "popup";
    popupDiv.innerText = object.userData.name;
    popupDiv.style.position = "absolute";
    popupDiv.style.backgroundColor = "white";
    popupDiv.style.padding = "5px";
    popupDiv.style.borderRadius = "5px";
    const position = object.position.clone().project(cameraRef.current);
    position.x = ((position.x + 1) / 2) * window.innerWidth;
    position.y = (-(position.y - 1) / 2) * window.innerHeight;
    popupDiv.style.left = `${position.x}px`;
    popupDiv.style.top = `${position.y}px`;
    containerRef.current.appendChild(popupDiv);
    setTimeout(() => {
      containerRef.current.removeChild(popupDiv);
    }, 2000);
  };

  const createLabel = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "64px Arial";
    context.fillText(text, 0, 100);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(1, 0.25);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };

  const createSphere = (name) => {
    const geometry = new THREE.SphereGeometry(0.25, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Set the color to white
    const sphere = new THREE.Mesh(geometry, material);
    sphere.userData = { name };

    // Create a label with the object's name
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const fontSize = 48;
    context.font = `${fontSize}px Arial`;
    context.fillText(name, 0, 100);
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const labelGeometry = new THREE.PlaneGeometry(0.5, 0.25);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0.5, 0); // Position the label above the sphere
    sphere.add(label); // Add the label as a child of the sphere
    return sphere;
  };

  async function getNodesEdges(address, hop) {
    const res = await fetch(SEARCH_ENDPOINT + '?' + new URLSearchParams({
      query: address,
      hop: hop
    }), {
      method: "GET",
      mode: "cors"
    })

    let raw_res = await res.json();
    if (raw_res.length == 0) {
      return {
        objects: [],
        names: [],
        edges: [],
        mapping: [],
      }
    }
    let data = raw_res[0];
    let nodes = data.nodes;
    let paths = data.paths;
    const o = [];
    const e = [];
    const ns = [];
    let i = 0;
    const index_mapping = new Map();
    for (const node of nodes) {
      const object = createSphere(node.ContractName ? node.ContractName : node.address);
      ns.push(node.ContractName ? node.ContractName : node.address)
      object.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
      o.push(object);
      index_mapping[node.address] = i;
      i++;
    }

    for (const path of paths) {
      for (const edge of path.path) {
        e.push([index_mapping[edge.start_node.address], index_mapping[edge.end_node.address], edge.label])
      }
    }

    // this is pretty useless 
    setObjectNames(ns);
    setEdgesList(e);
    setObjectsList(o);

    return {
      objects: o,
      names: ns,
      edges: e,
      mapping: index_mapping,
    }

  }

  async function updateAdvertisers() {
    const res = await fetch('https://lg-research-1.uwaterloo.ca/ads' + '?' + new URLSearchParams({
      address: searchAddress,
    }), {
      method: "GET",
      mode: "cors"
    })
    const data = await res.json();
    setAdvertisements(data);
  }


  useEffect(() => {
    if (marketerSelect) {
      return;
    }
    updateAdvertisers();

  }, [marketerSelect])

  async function renderStuff() {
    let { objects, names, edges, mapping } = await getNodesEdges(searchAddress, 2);
    if (!objects) {
      return;
    }
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    await containerRef.current.appendChild(rendererRef.current.domElement);


    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    for (const o of objects) {
      scene.add(o)
    }

    for (const e of edges) {
      const curve = new THREE.CatmullRomCurve3([objects[e[0]].position, objects[e[1]].position]);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      const midpoint = objects[e[0]].position.clone().lerp(objects[e[1]].position, 0.5);
      const label = createLabel(e[2]); // Replace with the actual input string
      label.position.copy(midpoint);
      label.lookAt(cameraRef.current.position);
      scene.add(label);
    }

    setObjectsList(objects)
    changeObjectsColor(names)

    // Create 10 objects and distribute them randomly
    /*
    const objects = [];
    for (let i = 0; i < 50; i++) {
      const name = `Object ${i + 1}`;
      const object = createSphere(name);
      object.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
      objects.push(object);
      scene.add(object);
    } */


    // Connect all objects with lines
    /*
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    for (let i = 0; i < objects.length / 4; i++) {
      for (let j = i + 1; j < objects.length / 4; j++) {
        const curve = new THREE.CatmullRomCurve3([objects[i].position, objects[j].position]);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        const midpoint = objects[i].position.clone().lerp(objects[j].position, 0.5);
        const label = createLabel("Edge label"); // Replace with the actual input string
        label.position.copy(midpoint);
        label.lookAt(cameraRef.current.position);
        scene.add(label);
      }
    } */

    cameraRef.current.position.z = 30;
    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.001;
      rendererRef.current.render(scene, cameraRef.current);
    };
    animate();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onClick = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(objects);
      if (intersects.length > 0) {
        const object = intersects[0].object;
        showPopup(object);
      }
    };
    // window.addEventListener("click", onClick);

    return () => {
      containerRef.current.removeChild(rendererRef.current.domElement);
      // window.removeEventListener("click", onClick);
    };
  }


  useEffect(() => {
    renderStuff();

  },[]);

  // return  <div ref={containerRef} />;
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      maxWidth: '80vw'
    },
    leftSection: {
      paddingLeft: "10px",
      paddingRight: "10px",
      maxWidth: '80vw'
    },
    rightSection: {
      paddingLeft: "10px",
      paddingRight: "10px",
      maxWidth: '80vw'
    },
    outer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      alignItems: 'center',
      maxWidth: '100vw'
    }
  };

  const supporterColumnCount = useBreakpointValue({ base: 1, md: 3 }); // Use 1 column on mobile, 3 columns on desktop
  const productsColumnCount = useBreakpointValue({ base: 1, md: 2 }); // Use 1 column on mobile, 3 columns on desktop

  return (
    <>
    <Header></Header>
      <Box style={styles.outer}>
        
        <Box>
          <div style={styles.container}>
            <div style={styles.leftSection}>
              <Heading style={{ fontSize: '122px', padding: '20px' }}>Seshat</Heading>
              <p style={{ fontSize: '25px', padding: '20px' }}>Bring personalization to web3</p>
              <Box style={{ paddingLeft: '20px' }}>

                <Selector builderSelected={marketerSelect} setBuilderSelected={setMarketerSelect} firstButton='Marketers' secondButton='dApp Developers' />
              </Box>
              {marketerSelect ?

                <><p style={{ padding: '20px' }}>Show me Addresses to target for below campaign:</p>
                  <Box style={{ padding: '20px' }}>

                    <Textarea onChange={(e) => { setSearchAddress(e.target.value) }}
                      rows="4"
                      cols="50"
                      placeholder="Airdrop a NFT with this description ..., Playing Axis, Frequency using Audius, ..."
                    />
                  </Box>
                </>
                :
                <><p style={{ padding: '20px' }}>Request a personalized ad for:</p>
                  <Box style={{ padding: '20px' }}>

                    <Textarea onChange={(e) => { setSearchAddress(e.target.value) }}
                      rows="4"
                      cols="50"
                      placeholder="0xe3108157338a6038410d18a2d70f2fe579ca7414"
                    />

                  </Box>

                  <TableContainer>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th>Name </Th>
                          <Th>Description</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          advertisements.map((ad) => {
                            return <Tr >
                                <Td>{ad[0]}</Td>
                                <Td>{ad[1]}</Td>
                            </Tr>
                          })
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </>
              }
              <Box style={{ paddingLeft: '20px', justifyContent: 'right'}}>
                <Button colorScheme="purple" onClick={() => { setShowme(!showme) }}>Show Me</Button>
              </Box>

              <p style={{ padding: '20px' }}>I have my web3 items, how do I personalize them?</p>

              <Box style={{ paddingLeft: '20px' }}>
              <Button colorScheme="purple" onClick={() => window.open('https://docs.seshatlabs.xyz')}>
                Documentation
              </Button>
              </Box>

            </div>
            <div style={styles.rightSection} ref={containerRef} />
          </div>
        </Box>
        <Box>
          <Heading style={{ fontSize: '48px', padding: '10px' }}>Products</Heading>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Box style={{ padding: '20px' }}>
            <Card maxW='sm' minH='md'>
              <CardBody>
                <Stack alignItems='center' mt='6' spacing='20'>
                  <Heading size='md'>Marketers</Heading>
                  <Text align={'center'}>
                    Run on-chain targeted campaigns.
                  </Text>
                  <Text align={'center'}>
                    Expand your ads to blockchain dApps
                  </Text>

                  <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='purple' onClick={() => window.open('https://www.seshatlabs.xyz/ads')}>
                      Campaign Builder
                    </Button>

                  </ButtonGroup>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Box style={{ padding: '20px' }}>
            <Card maxW='sm' minH='md'>
              <CardBody>
                <Stack alignItems='center' mt='6' spacing='20'>
                  <Heading size='md'>dApp Developers</Heading>
                  <Text align={'center'}>
                    Customize your contents based on users
                  </Text>
                  <Text align={'center'}>
                    Request targeted ads for each user
                  </Text>
                  <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='purple' onClick={() => window.open('https://docs.seshatlabs.xyz')}>
                      dApp Personalization
                    </Button>
                  </ButtonGroup>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </Box>

        <SimpleGrid columns={supporterColumnCount} spacing={10} columnGap={'10vw'} height='30vh'>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Heading style={{ fontSize: '80px' }}>5+</Heading>
            <Text style={{ fontSize: '32px'}} >Blockchains</Text>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Heading style={{ fontSize: '80px' }}>2M+</Heading>
            <Text style={{ fontSize: '32px'}}>Addresses</Text>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Heading style={{ fontSize: '80px' }}>10+</Heading>
            <Text style={{ fontSize: '32px'}}>DApps</Text>
          </Box>

          {/* <Box>
            <Heading style={{ fontSize: '48px', padding: '10px' }}>Supporters</Heading>
          </Box> */}

          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Image src="https://uwaterloo.ca/brand/sites/ca.brand/files/styles/body-500px-wide/public/uploads/images/universityofwaterloo_logo_horiz_rgb_1.jpg?itok=1aKXR4xp" boxSize="200px" objectFit="contain"></Image>
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Image src="https://uwaterloo.ca/bioengineering-biotechnology/sites/ca.bioengineering-biotechnology/files/uploads/images/velocity-logo_0.jpg" boxSize="200px" objectFit="contain"></Image>
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Image src="https://xrpl.org/assets/img/xrp-x-logo.png" boxSize="100px" objectFit="contain"></Image>
          </Box>
        </SimpleGrid>

        {/* <footer style={{ backgroundColor: '#F5F5F5', padding: '1rem', textAlign: 'center', marginTop: '200px' }}>
          &copy; 2023 SeshatLabs. All rights reserved.
        </footer> */}
      </Box>
      
    </>
  );
};

export default Home;
