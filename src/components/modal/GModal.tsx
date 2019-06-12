import * as React from 'react';
import { Modal } from 'reactstrap';

export interface IGModalProps {
    toggle?: any;
    modal: boolean;
    Children: any;
}


export function GModal(props: IGModalProps) {
    const { toggle, modal, Children } = props
    return (
        <Modal isOpen={modal} toggle={toggle}>
            {Children}
        </Modal>
    );
}

