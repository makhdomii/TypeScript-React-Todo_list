import React from 'react';
import {
  Container, Row, Button,
} from 'reactstrap'
import { GModal } from './components/modal/GModal';
import TaskList from './components/taskList/TaskList';
import { CreateTask } from './components/createTask/CreateTask';
import API from './services/Api';

export interface IAppProps {
}

export interface IAppState {
  tasks: any;
  modal: boolean;
  taskData: [];
  loading: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      tasks: [],
      modal: false,
      taskData: [],
      loading: true
    }
  }
  toggle = (e: any, reload: boolean = false) => {
    if (reload) {
      this.forceUpdate()
    }
    this.setState({
      modal: !this.state.modal
    })
  }
  componentDidMount = () => {
    this.loadDataFromServer()
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }
  loadDataFromServer = () => {
    API.get('tasks/list').then(res => {
      this.setState({
        taskData: res.data
      })
    })
  }
  public render() {
    if (this.state.loading) {
      return (
        <div className="spinner"></div>
      )
    }
    return (
      <Container>
        <Row className="pt-3 pb-3 justify-content-between align-items-center">
          <h1>My Todo List App</h1>
          <Button color="primary" onClick={this.toggle}>Add New Task</Button>
        </Row>
        <TaskList data={this.state.taskData} loadData={this.loadDataFromServer} />
        <GModal
          modal={this.state.modal}
          toggle={this.toggle}
          Children={<CreateTask toggle={this.toggle}  {...this.props} loadData={this.loadDataFromServer} />} />
      </Container>
    );
  }
}
