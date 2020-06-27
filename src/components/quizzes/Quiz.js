import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router';
import QuizContext from '../../context/quiz/quizContext';
import Spinner from '../layout/Spinner';

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { currentQuiz, getQuiz, sendScore } = quizContext;

    let { id } = useParams();
    let score = 0;

    useEffect(() => {
        getQuiz(id);
        // eslint-disable-next-line
    }, [id]);

    const [userAnswers, setUserAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    const { quizData, name } = currentQuiz;
    if (quizData && !quizComplete) {
        const questions = quizData.map((el) => el.question);
        const answers = quizData.map((el) => el.answer);

        const onChange = (e) => {
            let newUserAnswers = [...userAnswers];
            newUserAnswers[e.target.name] = e.target.value;
            setUserAnswers([...newUserAnswers]);
        };

        const onSubmit = (e) => {
            e.preventDefault();
            score = 0;

            for (let i = 0; i < answers.length; i++) {
                if (answers[i].toUpperCase() === userAnswers[i].toUpperCase()) {
                    score = score + 1;
                }
            }

            setQuizComplete(true);
            sendScore({ points: score });
        };

        return (
            <Fragment>
                <div className="form-container">
                    <h2>{name}</h2>
                    <br />
                    <br />
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            {questions.map((question, index) => (
                                <Fragment key={index}>
                                    <label htmlFor={index}>Q. {question}</label>
                                    <input
                                        type="text"
                                        name={index}
                                        onChange={onChange}
                                    ></input>
                                    <hr />
                                    <br />
                                </Fragment>
                            ))}
                        </div>
                        <input
                            type="submit"
                            value="Submit Quiz"
                            className="btn btn-dark"
                        ></input>
                    </form>
                </div>
            </Fragment>
        );
    } else if (quizComplete) {
        return (
            <Fragment>
                <div className="container-small">
                    <h2>
                        <span className="text-primary">Congratulations</span> on
                        finishing the quiz!
                    </h2>
                    <h3>Your score is: {score}</h3>
                </div>
            </Fragment>
        );
    }

    return <Spinner />;
};

export default Quiz;
