import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useParams } from "react-router";
import QuizContext from '../../context/quiz/quizContext';

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { currentQuiz, getQuiz } = quizContext;

    let { id } = useParams();

    useEffect(() => {
        getQuiz(id);
        // eslint-disable-next-line
    }, [id]);

    const { quizData, name } = currentQuiz;
    const questions = quizData.map(el => el.question);
    const answers = quizData.map(el => el.answer);

    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);

    const onChange = (e) => {
        let newUserAnswers = [...userAnswers];
        newUserAnswers[e.target.name] = e.target.value
        setUserAnswers();
    }

    return (
        <Fragment>
            <div className='form-container'>
                <h2>{name}</h2>
                <br /><br />
                <form>
                    <div className='form-group'>
                        {questions.map((question, index) => (
                            <Fragment key={index}>
                                <label htmlFor={index}>Q. {question}</label>
                                <input type='text' name={index} onChange={onChange}></input>
                            </Fragment>
                        ))}
                    </div>
                </form>
            </div>
        </Fragment>

    )


}

export default Quiz
