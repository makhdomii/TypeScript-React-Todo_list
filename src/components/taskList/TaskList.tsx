import * as React from 'react';
import { Row } from 'reactstrap';
import TColumn from '../tColumn/TColumn';
// import axios from 'axios'
// import TaskModal from '../modal/TaskModal';
import { GModal } from '../modal/GModal';
import API from '../../services/Api';
import { DetailTask } from '../modal/DetailTask';

export interface ITaskListProps {
    data: [];
    loadData: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface ITaskListState {
    data: any[];
    detailModal: boolean;
    detail: {
        title: string,
        description: string,
        status: string,
        _id: string
    };
}

export default class TaskList extends React.Component<ITaskListProps, ITaskListState> {
    constructor(props: ITaskListProps) {
        super(props);

        this.state = {
            data: props.data,
            detailModal: false,
            detail: {
                title: '',
                description: '',
                status: '',
                _id: ''
            },
        }
    }
    onDragStart = (event: any, taskName: any, task: any) => {
        event.dataTransfer.setData("taksId", task._id);
    }
    onDragOver = (event: any) => {
        event.preventDefault();
    }

    onDrop = (event: any, cat: any) => {
        let tkId = event.dataTransfer.getData("taksId");
        let tasks = this.props.data.filter((task: any) => {
            if (tkId === task._id) {
                task.status = cat;
                const taskUpdate = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    taskId: task._id
                }
                API.post('tasks/edit', taskUpdate)
            }
            return task;
        });

        this.setState({
            data: tasks
        });
    }
    showModal = (task: any) => {
        // const detail = <div>{task.title}</div>
        this.setState({
            detailModal: !this.state.detailModal,
            detail: task
        })
    }
    toggle = () => {
        this.setState({
            detailModal: !this.state.detailModal
        })
    }
    public render() {
        var tasks: any = {
            todo: [],
            doing: [],
            done: [],
            test: []
        }
        this.props.data.forEach((task: any) => {
            tasks[task.status].push(
                <button key={task._id}
                    onDragStart={(event) => this.onDragStart(event, task.title, task)}
                    draggable
                    onClick={() => this.showModal(task)}
                    className="draggable d-block border-0 p-3">
                    {task.title}
                </button>
            );
        });
        return (
            <Row className="drag-container">
                <GModal
                    modal={this.state.detailModal}
                    toggle={this.toggle}
                    Children={<DetailTask toggle={this.toggle} detail={this.state.detail} loadData={this.props.loadData} />} />
                <TColumn
                    func={{ onDragOver: this.onDragOver, onDrop: this.onDrop }}
                    title="To Do"
                    status="todo"
                    data={tasks}
                />
                <TColumn
                    func={{ onDragOver: this.onDragOver, onDrop: this.onDrop }}
                    title="In Progress"
                    status="doing"
                    data={tasks}
                />
                <TColumn
                    func={{ onDragOver: this.onDragOver, onDrop: this.onDrop }}
                    title="Test"
                    status="test"
                    data={tasks}
                />
                <TColumn
                    func={{ onDragOver: this.onDragOver, onDrop: this.onDrop }}
                    title="Done"
                    status="done"
                    data={tasks}
                />
            </Row>
        );
    }
}
