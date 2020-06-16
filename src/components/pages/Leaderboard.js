import React from 'react';

const Leaderboard = () => {
    return (
            <table className="ranking">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
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
                    <tr>
                        <td>1</td>
                        <td>hutleydearg</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>trackballl</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>tuilleslift</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>kerfufflemargin</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>blazecandle</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>maimed</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>swittertender</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>venomoustux</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>unclecolumbia</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>dingyprofit</td>
                    </tr>
                </tbody>
            </table>
    );
};

export default Leaderboard;
