import { Box } from "@chakra-ui/react"
import styles from './builder.module.css'

export default function Explainer({ builderSelected }) {
    return <Box className={`${styles.builder} ${builderSelected ? styles.noDisplay : ''}`}></Box>
}