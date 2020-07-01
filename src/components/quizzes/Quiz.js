import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router';
import QuizContext from '../../context/quiz/quizContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { currentQuiz, getQuiz, sendScore, error } = quizContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    let { id } = useParams();

    let count = 0;

    useEffect(() => {
        getQuiz(id);
        if (error === 'no such quiz found!') {
            setAlert(error, 'danger');
        }
        // eslint-disable-next-line
    }, [error, id]);

    // component level state
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);

    const { quizData, name } = currentQuiz;

    if (quizData) {
        const questions = quizData.map((el) => el.question);
        const answers = quizData.map((el) => el.answer);

        const onChange = (e) => {
            let newUserAnswers = [...userAnswers];
            newUserAnswers[e.target.name] = e.target.value;
            setUserAnswers([...newUserAnswers]);
        };

        const onSubmit = (e) => {
            if (e) {
                e.preventDefault();
            }

            for (let i = 0; i < userAnswers.length; i++) {
                if (typeof userAnswers[i] !== 'undefined') {
                    if (
                        answers[i].toString().toUpperCase() ===
                        userAnswers[i].toString().toUpperCase()
                    ) {
                        count = count + 10;
                        console.log(
                            'Equal' +
                                userAnswers[i] +
                                ' ' +
                                answers[i] +
                                ' ' +
                                count
                        );
                    }
                }
            }
            setScore(count);
            setQuizComplete(true);
            sendScore(count);
        };

        // timer to change questions
        let timer = setTimeout(() => {
            setIndex(index + 1);
        }, 100000);

        if (index >= questions.length && !quizComplete) {
            clearTimeout(timer);
            onSubmit();
        }

        if (!quizComplete && index < questions.length) {
            return (
                <Fragment>
                    <div className="form-container">
                        <h2>{name}</h2>
                        <br />
                        <br />
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                {quizData[index].imageLink && (
                                    <img
                                        src={quizData[index].imageLink}
                                        style={{ height: '300px' }}
                                        alt="img for question"
                                    ></img>
                                )}
                                <label htmlFor={index}>
                                    Q. {questions[index]}
                                </label>
                                <input
                                    type="text"
                                    name={index}
                                    onChange={onChange}
                                ></input>
                                <br />
                                <span
                                    className="btn btn-dark"
                                    onClick={() => setIndex(index + 1)}
                                >
                                    Next question
                                </span>
                            </div>
                            <input
                                type="submit"
                                value="Submit Quiz"
                                className="btn btn-danger"
                            ></input>
                        </form>
                    </div>
                </Fragment>
            );
        }

        if (quizComplete || index >= questions.length) {
            clearTimeout(timer);
            return (
                <Fragment>
                    <div className="container-small">
                        <h2>
                            <span className="text-primary">
                                Congratulations
                            </span>{' '}
                            on finishing the quiz!
                        </h2>
                        <h3>Your score is: {score}</h3>
                    </div>
                </Fragment>
            );
        }
    }
    if (error) {
        return <h2>Open quizzes from the quizzes panel only</h2>;
    }
    return <Spinner />;
};

export default Quiz;
