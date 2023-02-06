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
                    <div className={`${styles.accountNode} ${selected ? styles.selectedNode : ''}`}>
                        <strong>{data?.name ? data?.name : data.label.slice(0,9)}...</strong>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Address: {data.label}</PopoverHeader>
                    <PopoverBody>Account Type: {data.type} </PopoverBody>
                    <PopoverBody>Other info: </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default memo(AccountNode);