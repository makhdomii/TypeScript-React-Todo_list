import * as React from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import API from '../../services/Api';

export interface IDetailTaskProps {
    detail: { title: string, description: string, status: string, _id: string };
    toggle: any;
    loadData: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export interface IDetailTaskState {
    deleteModal: boolean;
}

export class DetailTask extends React.Component<IDetailTaskProps, IDetailTaskState> {
    constructor(props: IDetailTaskProps) {
        super(props);

        this.state = {
            deleteModal: false
        }
    }
    editTask = (e: any) => {
        e.preventDefault()
        const { status, title, description } = e.target
        console.log({ status: status.value, title: title.value, description: description.value })
        API.post('tasks/edit', { status: status.value, title: title.value, description: description.value })
    }
    cancel = (e: any) => {
        e.preventDefault()
        this.props.toggle()
    }
    deleteTask = (e: any) => {
        console.log(e)
        this.setState({
            deleteModal: true
        })
    }
    toggleDeleteModal = () => {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    }
    approveDelete = (e: any) => {
        API.post('tasks/delete', { taskId: this.props.detail._id })
            .then(res => {
                this.setState({
                    deleteModal: !this.state.deleteModal
                })
                setTimeout(() => {
                    this.props.toggle()
                    this.props.loadData(e)
                }, 200)
            })
    }
    public render() {
        const { title, description, status } = this.props.detail
        return (
            <Form onSubmit={this.editTask} className="bg-white p-5">
                <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                    <ModalHeader>Are you sure ?</ModalHeader>
                    <ModalBody>Do you want to delete <strong>{title}</strong> ?</ModalBody>
                    <ModalFooter>
                        <Button className="mr-2" color="primary" onClick={this.toggleDeleteModal}>No</Button>
                        <Button color="secondary" onClick={this.approveDelete}>Yes</Button>
                    </ModalFooter>
                </Modal>
                <h3 className="pb-3">Edit Task</h3>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" name="title" defaultValue={title} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input id="description" type="text" name="description" defaultValue={description} />
                </FormGroup>
                <FormGroup className="pb-3">
                    <Label for="status">Status</Label>
                    <Input id='status' type="select" name="status" defaultValue={status}>
                        <option value={'todo'}>To do</option>
                        <option value={'doing'}>Doing</option>
                        <option value={'test'}>Test</option>
                        <option value={'done'}>Done</option>
                    </Input>
                </FormGroup>
                <div className="d-flex justify-content-end pt-5">
                    <Button className="ml-2" color="danger" onClick={this.deleteTask}>Delete</Button>
                    <Button className="ml-2" onClick={this.cancel}>Cancel</Button>
                    <Button className="ml-2" color="success" type="submit">Submit</Button>
                </div>
            </Form>
        );
    }
}
