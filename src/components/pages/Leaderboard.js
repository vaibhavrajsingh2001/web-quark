import React, { useContext, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import QuizContext from '../../context/quiz/quizContext';

const Leaderboard = () => {
    const quizContext = useContext(QuizContext);
    const { getLeaderboard, leaderboard } = quizContext;

    useEffect(() => {
        getLeaderboard();
        // eslint-disable-next-line
    }, []);

    if (leaderboard.length < 1) {
        return <Spinner />;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <h1>Rank</h1>
                    </th>
                    <th>
                        <h1>Username</h1>
                    </th>
                    <th>
                        <h1>Score</h1>
                    </th>
                </tr>
            </thead>
            {/*<tfoot>
                    <tr>
                        <td colSpan="4">
                            <p>
                                <strong>Rankings will be changed weekly</strong>
                            </p>
                        </td>
                    </tr>
                </tfoot>*/}
            <tbody>
                {leaderboard.map((el, index) => (
                    <tr>
                        <td>{index}</td>
                        <td>{el.name}</td>
                        <td>{el.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Leaderboard;
