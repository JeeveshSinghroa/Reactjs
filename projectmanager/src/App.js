import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';
import uuid from 'uuid';
import $ from 'jquery';
import Todos from './Components/Todos';
import TodoItem from './Components/TodoItem';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects : [],
      todos: []
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          //console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects:[
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development'
      },
      {
        id: uuid.v4(),
        title: 'Ecommerce Shoping Cart',
        category: 'Web Development'
      }
    ]});
  }
  //everytime the component will re-render this will call.
  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }
  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project){
    //console.log(project);
    let projects1 = this.state.projects;
    projects1.push(project);
    this.setState({projects: projects1})
  }
  handleDeleteProject(id){
    let projects1 = this.state.projects;
    let index = projects1.findIndex(x => x.id === id);
    projects1.splice(index, 1);
    this.setState({projects:projects1}); 
  }
  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        <hr />
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
