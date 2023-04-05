import * as THREE from "three";
import { useEffect, useRef, useState, useCallback } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import NavBar from "../components/Header";
import { Box } from "@chakra-ui/react";

const Home = () => {
  const containerRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const rendererRef = useRef();
  const [objectsList, setObjectsList] = useState([]);
  const [objectNames, setObjectNames] = useState('');

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

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create 10 objects and distribute them randomly
    const objects = [];
    for (let i = 0; i < 50; i++) {
      const name = `Object ${i + 1}`;
      const object = createSphere(name);
      object.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
      objects.push(object);
      scene.add(object);
    }
    setObjectsList(objects)

    // Connect all objects with lines
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
    }

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
    window.addEventListener("click", onClick);

    return () => {
      containerRef.current.removeChild(rendererRef.current.domElement);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // return  <div ref={containerRef} />;
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      maxWidth: '100vw'
    },
    leftSection: {
      paddingLeft: "50px",
    },
    rightSection: {
      flexGrow: 1,
    },
    outer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      alignItems: 'center',
      maxWidth: '100vw'
    }
  };

  return (
    <>
    <Box style={styles.outer}>
      <NavBar style={{maxWidth: '100vw'}}></NavBar>
    
    <div style={styles.container}>
      
      <div style={styles.leftSection}>
        <h1>Seshat</h1>
        <h3>Bring personalization to web3</h3>
        <p>Show me relevant addresses to:</p>
        <textarea
          rows="4"
          cols="50"
          defaultValue="Airdrop a NFT with this description ..., Playing Axis, Frequency using Audius, ..."
        />
        <p>Change color of objects:</p>
        <input
          type="text"
          placeholder="Enter comma-separated names"
          onChange={(e) => setObjectNames(e.target.value)}
        />
        <button onClick={() => changeObjectsColor(objectNames.split(","))}>
          Change Color
        </button>
      </div>
      <div style={styles.rightSection} ref={containerRef} />
    </div>
    </Box>
    </>
  );
};

export default Home;
