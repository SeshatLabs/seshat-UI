import { Button, Box } from "@chakra-ui/react"
import styles from './builder.module.css'

export default function Selector({ builderSelected, setBuilderSelected, firstButton, secondButton }) {
    return <div>
        <Box my="10">
        <Button className={styles.selectorButtonLeft} colorScheme={builderSelected ? 'purple' : 'gray'} onClick={() => { setBuilderSelected(true) }}>{firstButton ? firstButton : 'Build Campaign'}</Button>
        <Button className={styles.selectorButtonRight} colorScheme={builderSelected ? 'gray' : 'purple'} onClick={() => { setBuilderSelected(false) }}>{secondButton ? secondButton : 'Explain Campaign'}</Button>
        </Box>
    </div>
}
