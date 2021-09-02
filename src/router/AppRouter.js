import React from 'react';
import {
    BrowserRouter as Router, Switch, Route
  } from 'react-router-dom';
import Heading from '../components/Heading';
import TaskForm from '../components/taskForm';
import TaskList from '../components/taskList';

const AppRouter = () => {
    return (
        <Router>
            <div className="h-screen text-white text center p-10">
                <div className="container mx-auto h-full">
                    <Heading />

                    <Switch>
                        <Route exact path="/" component={TaskList} />
                        <Route exact path="/add" component={TaskForm} />
                        <Route exact path="/edit/:id" component={TaskForm} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default AppRouter
