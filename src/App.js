import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Leaderboard from './components/pages/Leaderboard';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Quizzes from './components/quizzes/Quizzes';
import Quiz from './components/quizzes/Quiz';

import QuizState from './context/quiz/QuizState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

function App() {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    return (
        <AuthState>
            <QuizState>
                <AlertState>
                    <Router>
                        <div className="App">
                            <Navbar />
                            <div className="container">
                                <Alerts />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route
                                        exact
                                        path="/quiz"
                                        component={Quizzes}
                                    />
                                    <Route
                                        exact
                                        path="/leaderboard"
                                        component={Leaderboard}
                                    />
                                    <Route
                                        exact
                                        path="/about"
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path="/quiz/:id"
                                        component={Quiz}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    ></Route>
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    ></Route>
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </AlertState>
            </QuizState>
        </AuthState>
    );
}

export default App;
