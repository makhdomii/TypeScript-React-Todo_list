import * as React from 'react';
import { Col } from 'reactstrap'

export interface ITColumnProps {
    func: any;
    status: string;
    data: any;
    title: string;
}
// something
const TColumn = (props: ITColumnProps) => {
    return (
        <>
            <Col md={3} className="droppable pt-5"
                onDragOver={(event) => props.func.onDragOver(event)}
                onDrop={(event) => { props.func.onDrop(event, props.status) }}>
                <h4 className="group-header bg-white p-2">{props.title}</h4>
                {props.data[props.status]}
            </Col>
        </>
    );
}
export default TColumn