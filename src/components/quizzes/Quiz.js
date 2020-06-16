import React, { useContext, useEffect, Fragment } from 'react';
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

    if (currentQuiz) {
        return (
            <Fragment>
                <div className='container'>
                    {/* <h1>{currentQuiz[0].category}</h1> */}
                    {currentQuiz.map((question, index) => (
                        <div key={index} className='card'>
                            <b>Q. {question.question}</b>
                            <br />
                            <input type='radio' name='answers' value={question.incorrect_answers[0]} />
                            <label htmlFor={question.incorrect_answers[0]}>{question.incorrect_answers[0]}</label><br />
                            <input type='radio' name='answers' value={question.incorrect_answers[1]} />
                            <label htmlFor={question.incorrect_answers[1]}>{question.incorrect_answers[1]}</label><br />
                            <input type='radio' name='answers' value={question.correct_answer} />
                            <label htmlFor={question.correct_answer}>{question.correct_answer}</label><br />
                            <input type='radio' name='answers' value={question.incorrect_answers[2]} />
                            <label htmlFor={question.incorrect_answers[2]}>{question.incorrect_answers[2]}</label><br />
                        </div>
                    ))}
                </div>
            </Fragment>

        )
    }
}

export default Quiz
