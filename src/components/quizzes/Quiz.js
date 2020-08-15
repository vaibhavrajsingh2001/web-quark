import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    Fragment,
} from 'react';
import { useParams } from 'react-router';
import QuizContext from '../../context/quiz/quizContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';
import Timer from 'react-compound-timer';

const Quiz = () => {
    const quizContext = useContext(QuizContext);
    const { currentQuiz, getQuiz, sendScore, error, clearQuiz } = quizContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    let { id } = useParams();

    // component level state
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);

    const timeoutRef = useRef();
    const dataFetched = useRef(false);

    const { quizData, name } = currentQuiz;

    useEffect(() => {
        async function fetchData() {
            await getQuiz(id);
            if (error === 'no such quiz found!') {
                setAlert(error, 'danger');
            }

            if (quizData) {
                const questions = quizData.map((el) => el.question);
                setQuizQuestions(questions);
                const answers = quizData.map((el) => el.answer);
                setQuizAnswers(answers);
                dataFetched.current = true;
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, [error, id, quizData]);

    useEffect(() => {
        if (dataFetched.current) {
            console.log('Timer started');
            const timer = setTimeout(() => {
                if (!quizComplete) {
                    console.log('Timer over');
                    setQuizComplete(true);
                }
            }, 1800000);
            timeoutRef.current = timer;
        }

        // eslint-disable-next-line
    }, [dataFetched.current]);

    useEffect(() => {
        clearQuiz();
        return () => {
            clearTimeout(timeoutRef.current);
        };
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (quizComplete) {
            onSubmit();
        }
        // eslint-disable-next-line
    }, [quizComplete]);

    const onChange = (e) => {
        let newUserAnswers = [...userAnswers];
        newUserAnswers[e.target.name] = e.target.value;
        setUserAnswers([...newUserAnswers]);
    };

    function onSubmit(e) {
        clearTimeout(timeoutRef.current);
        let count = 0;

        if (e) {
            e.preventDefault();
        }

        if (!quizComplete) {
            setQuizComplete(true);
        }

        for (let i = 0; i < userAnswers.length; i++) {
            if (typeof userAnswers[i] !== 'undefined') {
                if (
                    quizAnswers[i].toString().toUpperCase() ===
                    userAnswers[i].toString().toUpperCase()
                ) {
                    count = count + 10;
                }
            }
        }

        console.log('submitted score: ' + count);
        setScore(count);
        const submission = {
            quizId: id,
            quizName: name,
            userAnswers: [...userAnswers],
        };
        sendScore(count, submission);
    }

    if (!quizComplete && quizData) {
        return (
            <Fragment>
                <div className="form-container text-center">
                    <h2 className="text-success">{name}</h2>
                    <br />
                    <Timer initialTime={1800000} direction="backward">
                        <Fragment>
                            <Timer.Minutes /> minutes & {''}
                            <Timer.Seconds /> seconds left
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    {quizData[index].imageLink && (
                                        <img
                                            src={quizData[index].imageLink}
                                            style={{
                                                maxWidth: '300px',
                                                padding: '30px',
                                            }}
                                            alt="img for question"
                                        ></img>
                                    )}
                                    <br />
                                    <br />
                                    <label htmlFor={index}>
                                        Q {index + 1}.{' '}
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `${quizQuestions[index]}`,
                                            }}
                                        ></span>
                                    </label>
                                    <input
                                        type="text"
                                        name={index}
                                        onChange={onChange}
                                    ></input>
                                    <br />
                                    {index < quizQuestions.length - 1 && (
                                        <span
                                            className="btn btn-dark"
                                            onClick={() => {
                                                setIndex(index + 1);
                                            }}
                                        >
                                            Next question
                                        </span>
                                    )}
                                    {index > 0 && (
                                        <span
                                            className="btn btn-dark"
                                            onClick={() => {
                                                setIndex(index - 1);
                                            }}
                                        >
                                            Previous question
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="submit"
                                    value="Submit Quiz"
                                    className="btn btn-danger"
                                ></input>
                            </form>
                        </Fragment>
                    </Timer>
                </div>
            </Fragment>
        );
    }

    if (quizComplete || index >= quizQuestions.length) {
        clearTimeout(timeoutRef.current);
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

    if (error) {
        return <h2>Open quizzes from the quizzes panel only</h2>;
    }
    return <Spinner />;
};

export default Quiz;
