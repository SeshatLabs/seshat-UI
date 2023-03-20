import { Popover, PopoverContent, PopoverTrigger, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { memo } from 'react';
import { Handle } from 'reactflow';
import styles from './Graph.module.css'

const AccountNode = ({ data, xPos, yPos, selected }) => {
    return (
        <>
            <Popover>
                <Handle type="target" ></Handle>
                <Handle type="source" ></Handle>
                <PopoverTrigger>
                    <div className={`${styles.accountNode} ${selected ? styles.selectedNode : ''} ${data.hovered ? styles.pathHovered : ''}`}>
                        <strong>{data?.name ? data?.name : data.label.slice(0,9) + '...'}</strong>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Details:</PopoverHeader>
                    <PopoverBody>Address: {data.label} <br></br>
                        {data?.name ? <div>Name: {data?.name}</div>: <></>}
                    </PopoverBody>
                    
                </PopoverContent>
            </Popover>
        </>
    );
};

export default memo(AccountNode);