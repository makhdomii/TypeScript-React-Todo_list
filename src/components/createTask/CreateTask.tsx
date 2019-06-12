import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import API from '../../services/Api';

export interface ICreateTaskProps {
    toggle: any;
    loadData: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function CreateTask(props: ICreateTaskProps) {
    const createNewTask = (e: any) => {
        e.preventDefault()
        const { title, description } = e.target
        API.post('tasks/add', { title: title.value, description: description.value }).then(res => {
            props.toggle()
            props.loadData(e)
        })
    }
    const cancel = (e: any) => {
        e.preventDefault()
        props.toggle()
    }
    return (
        <Form className="p-5" onSubmit={createNewTask}>
            <h3 className="pb-3">Create New Task</h3>
            <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <Input type="text" name="title" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Description</Label>
                <Input type="text" name="description" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <div className="d-flex justify-content-end">
                <Button onClick={cancel}>Cancel</Button>
                <Button className="ml-2" color="success" type='submit'>Submit</Button>
            </div>
        </Form>
    );
}
