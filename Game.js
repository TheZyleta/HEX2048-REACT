import React, { useState, useEffect, useRef, usePreviousProps } from 'react';
import Bg from './Bg';
import './index.css'
import { GAME_STATES } from './constants';
import TransitionWrap from './TransitionWrap';
import { useSwipeable } from 'react-swipeable';

function Game({ radiusLvl, handleExit }) {
    const [board, setBoard] = useState([]);
    const [scale, setScale] = useState([])
    const [gameState, setGameState] = useState(GAME_STATES.GAME)
    const [site, setSite] = useState([]);
    const hexRefs = useRef([]);
    const [show,setShow]=useState([])

    useEffect(() => {
        setSite(generateSite(radiusLvl));
    }, [radiusLvl])

    useEffect(() => {
        setScale(scaleF(radiusLvl));

    }, [site]);
    useEffect(() => {
        setBoard(generateBase(radiusLvl));
    }, [scale])

    const handleReset = () => {
        setGameState(GAME_STATES.GAME)
        setBoard(generateBase(radiusLvl))
    }

    useEffect(() => {
        if (board.length !== 0 && isBoardFull(board)) {
            if (!combineB(moveE(board))[3] && !combineB(moveE(board))[4]) {
                if (!combineF(moveQ(board))[3] && !combineF(moveQ(board))[4]) {
                    if (!combineB(moveD(board))[3] && !combineB(moveD(board))[4]) {
                        if (!combineF(moveA(board))[3] && !combineF(moveA(board))[4]) {
                            if (!combineB(moveS(board))[3] && !combineB(moveS(board))[4]) {
                                if (!combineF(moveW(board))[3] && !combineF(moveW(board))[4]) {
                                    setShow(true)
                                    setGameState(GAME_STATES.OVER)
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [board])

    const isBoardFull = (board) => {
        for (let cell of board) {
            if (cell.value === 0) {
                return false;
            }
        }
        return true;
    };

    function generateSite(rad) {
        let tRA = rad, mn = 1
        let sRad = ((rad - 1) * 2) + 1;
        const newSite = []
        for (let i = 0; i < sRad; i++) {
            newSite.push(tRA);
            if (i === rad - 1) {
                mn = -1;
            }
            tRA += mn;
        }
        return newSite;
    }

    function generateBase(rad) {
        let TeY = -1, TeZ = 1, n = 0,
            GeY = 0, GeZ = 0,
            s = -1, t = 0,
            tRad = rad - 1;
        const site = generateSite(rad)
        const board = [];
        for (let j = 0; j < site.length; j++) {
            TeZ = GeZ + 1 + s;
            TeY = GeY + t;
            for (let k = 0; k < site[j]; k++) {
                board.push({ data_x: (-1 * tRad) + j, data_y: tRad + TeY, data_z: 0 + TeZ, id: n, rlx: (-tRad + j) * (scale - 15 * (scale / 100)), rly: (scale / 2) + ((Math.abs((-tRad + j) * scale / 2))) + (k * scale), value: 0 });
                TeY--;
                TeZ++;
                n++;
            }
            if (j === tRad) { s = 0; GeZ = -rad; t = -1 }
            else if (j > tRad) { t-- }
            else { s--; }
        }
        const randomIndex1 = Math.floor(Math.random() * board.length);
        const randomIndex2 = Math.floor(Math.random() * board.length);
        board[randomIndex1].value = Math.random() < 0.9 ? 2 : 4;
        board[randomIndex2].value = Math.random() < 0.9 ? 2 : 4;
        return board;
    }

    const handleMove = (direction) => {
        const updatedBoard = move(direction, board);
        setBoard(updatedBoard);
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'e':
            case 'E':
                handleMove('e');
                break;
            case 'a':
            case 'A':
                handleMove('a');
                break;
            case 'q':
            case 'Q':
                handleMove('q');
                break;
            case 'd':
            case 'D':
                handleMove('d');
                break;
            case 'w':
            case 'W':
                handleMove('w');
                break;
            case 's':
            case 'S':
                handleMove('s');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [board]);

    const move = (direction, board) => {
        const cloneBoard = [...board];
        switch (direction) {
            case 'w':
                return updateInnerHtml(combineF(moveW(cloneBoard)))
            case 's':
                return updateInnerHtml(combineB(moveS(cloneBoard)));
            case 'a':
                return updateInnerHtml(combineF(moveA(cloneBoard)));
            case 'd':
                return updateInnerHtml(combineB(moveD(cloneBoard)));
            case 'q':
                return updateInnerHtml(combineF(moveQ(cloneBoard)));
            case 'e':
                return updateInnerHtml(combineB(moveE(cloneBoard)));
            default:
                break;
        }
        return cloneBoard;
    };

    function searchforY(objects, id) {
        let results = []
        for (const object of objects) {
            if (object.data_y === id) {
                results.push(object);
            }
        }
        return results;
    }

    function sortObjectsForY(array) {
        array.sort((a, b) => a.data_x - b.data_x);
        return array;
    }

    function searchforZ(objects, id) {
        let results = []
        for (const object of objects) {
            if (object.data_z === id) {
                results.push(object);
            }
        }
        return results;
    }

    function sortObjectsForZ(array) {
        array.sort((a, b) => a.data_x - b.data_x);
        return array;
    }
    function scaleF(rad) {
        if (window.screen.height > window.screen.width) {
            if (rad > 2) {
                return ((window.screen.width / 1.2) / site[(site.length - 1) / 2 + 1]);
            } else { return ((window.screen.width / 1.5) / site[(site.length - 1) / 2 + 1]); }
        } else {
            if (rad > 3) {
                return ((window.screen.height / 1.5) / site[(site.length - 1) / 2 + 1]);
            } else { return ((window.screen.height / 2) / site[(site.length - 1) / 2 + 1]); }

        }
    }

    function crMovY(board) {
        let li = 0;
        let taEA = []
        for (let i = (site.length - 1) / 2; i >= -1 * ((site.length - 1) / 2); i--) {
            taEA[li] = sortObjectsForY(searchforY(board, i));
            li++;
        }

        return [taEA, board];
    }

    function mY([taEA, board]) {
        let kf = [], mem = [];

        for (let j = 0; j < taEA.length; j++) {
            let ff = [], dmemY = [];
            for (let k = 0; k < taEA[j].length; k++) {
                ff.push(board[taEA[j][k].id].value);
                dmemY.push(taEA[j][k].id);
            }
            mem.push(dmemY);
            kf.push(ff);
        }

        let newMmemm = ([].concat(...mem));
        return [newMmemm, kf]
    }

    function crMovZ(board) {
        let li = 0, taQD = [];
        for (let i = (site.length - 1) / 2; i >= -1 * ((site.length - 1) / 2); i--) {
            taQD[li] = sortObjectsForZ(searchforZ(board, i));
            li++;
        }
        return [taQD, board];
    }

    function mZ([taQD, board]) {
        let kf = [], mem = [];
        for (let j = 0; j < taQD.length; j++) {
            let ff = [], dmemZ = [];
            for (let k = 0; k < taQD[j].length; k++) {
                ff.push(board[taQD[j][k].id].value);
                dmemZ.push(taQD[j][k].id);
            }
            mem.push(dmemZ)
            kf.push(ff);
        }

        let newMmemm = ([].concat(...mem));
        return [newMmemm, kf]
    }

    function crMovX(board) {
        let li = 0, kf = [];
        const newMmemm = []
        for (let i = 0; i < site.length; i++) {
            let ff = [];
            for (let j = 0; j < site[i]; j++) {
                ff.push(board[li].value)
                newMmemm[li] = board[li].id;
                li++;
            }
            kf.push(ff);
        }
        return [newMmemm, kf]
    }

    function generate(board) {
        let num = Math.floor(Math.random() * (board.length));
        if (board[num].value === 0) {
            board[num].value = Math.random() < 0.9 ? 2 : 4;
        } else { generate(board) }
        return board;
    }

    function moveE(board) {
        const [memory, taEA] = mY(crMovY(board));
        let newRow = []
        for (let j = 0; j < site.length; j++) {
            let filteredRow = taEA[j].filter(num => num)
            let missing = site[j] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newRow[j] = zeros.concat(filteredRow);
        }
        let bCheck = ([].concat(...taEA).toString() !== [].concat(...newRow).toString() ? true : false);
        return ([memory, newRow, board, bCheck])
    }

    function moveA(board) {
        const [memory, taEA] = mY(crMovY(board));
        let newRow = []
        for (let j = 0; j < site.length; j++) {
            let filteredRow = taEA[j].filter(num => num)
            let missing = site[j] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newRow[j] = filteredRow.concat(zeros)
        }
        let bCheck = ([].concat(...taEA).toString() !== [].concat(...newRow).toString() ? true : false);
        return ([memory, newRow, board, bCheck])
    }

    function moveQ(board) {
        const [memory, taQD] = mZ(crMovZ(board));
        let newRow = []
        for (let j = 0; j < site.length; j++) {
            let filteredRow = taQD[j].filter(num => num)
            let missing = site[j] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newRow[j] = filteredRow.concat(zeros)
        }
        let bCheck = ([].concat(...taQD).toString() !== [].concat(...newRow).toString() ? true : false);
        return ([memory, newRow, board, bCheck])
    }

    function moveD(board) {
        const [memory, taQD] = mZ(crMovZ(board));
        let newRow = []
        for (let j = 0; j < site.length; j++) {
            let filteredRow = taQD[j].filter(num => num)
            let missing = site[j] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newRow[j] = zeros.concat(filteredRow)
        }
        let bCheck = ([].concat(...taQD).toString() !== [].concat(...newRow).toString() ? true : false);
        return ([memory, newRow, board, bCheck])
    }

    function moveW(board) {
        const [memory, taWS] = crMovX(board);
        let newRow = []
        for (let j = 0; j < site.length; j++) {
            let filteredRow = taWS[j].filter(num => num)
            let missing = site[j] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newRow[j] = filteredRow.concat(zeros)
        }
        let bCheck = ([].concat(...taWS).toString() !== [].concat(...newRow).toString() ? true : false);
        return ([memory, newRow, board, bCheck])
    }

    function moveS(board) {
        const [memory, taWS] = crMovX(board);
        let newRow = []
        for (let j = 0; j < site.length; j++) {
            let filteredRow = taWS[j].filter(num => num)
            let missing = site[j] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newRow[j] = [...zeros, ...filteredRow];
        }
        let bCheck = ([].concat(...taWS).toString() !== [].concat(...newRow).toString() ? true : false);
        return ([memory, newRow, board, bCheck])
    }

    function combineB([memory, newRow, board, bCheck]) {
        const newNewRow = [...newRow];
        const comRow = [].concat(...newRow)
        for (let i = 0; i < site.length; i++) {
            for (let j = site[i]; j > 0; j--) {
                if (newNewRow[i][j] === newNewRow[i][j - 1]) {
                    newNewRow[i][j] = newNewRow[i][j] * 2
                    newNewRow[i][j - 1] = 0;
                }
            }
            let filteredRow = newNewRow[i].filter(num => num)
            let missing = site[i] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newNewRow[i] = [...zeros, ...filteredRow];
        }
        let gg = ([].concat(...newNewRow));
        let stComR = (comRow.toString() !== gg.toString() ? true : false)
        /*  updateHighScore(Math.max(...gg)) */
        return [memory, board, gg, bCheck, stComR]
    }

    function combineF([memory, newRow, board, bCheck]) {
        const newNewRow = [...newRow];
        const comRow = [].concat(...newRow)
        for (let k = 0; k < site.length; k++) {
            for (let l = 0; l < site[k]; l++) {
                if (newNewRow[k][l] === newNewRow[k][l + 1]) {
                    newNewRow[k][l] = newNewRow[k][l] * 2
                    newNewRow[k][l + 1] = 0;
                }
            }
            let filteredRow = newNewRow[k].filter(num => num)
            let missing = site[k] - filteredRow.length
            let zeros = Array(missing).fill(0)
            newNewRow[k] = [...filteredRow, ...zeros];
        }
        let gg = ([].concat(...newNewRow));
        let stComR = (comRow.toString() !== gg.toString() ? true : false)
        /*  updateHighScore(Math.max(...gg) )*/
        return [memory, board, gg, bCheck, stComR]
    }


    function updateInnerHtml([memory, board, gg, a, b]) {
        for (let k = 0; k < gg.length; k++) {
            board[memory[k]].value = gg[k]
        }
        if (a || b) { return generate(board); }
        return board;
    }

    function checkForHighS() {
        let highS = document.getElementById('highSValue')
        let savedValue = localStorage.getItem(`highscore${radiusLvl}`);
        if (!savedValue) { localStorage.setItem(`highscore${radiusLvl}`, 0); }
        highS.textContent = localStorage.getItem(`highscore${radiusLvl}`);
    }

    function updateHighScore(s) {
        let highS = document.getElementById('highSValue')
        let savedValue = localStorage.getItem(`highscore${radiusLvl}`);
        if (s > savedValue) {
            localStorage.setItem(`highscore${radiusLvl}`, s);
            highS.textContent = localStorage.getItem(`highscore${radiusLvl}`);
        }
    }

    useEffect(() => {
        hexRefs.current.forEach((hexRef, index) => {
            if (hexRef) {
                const previousValue = hexRef.dataset.prevValue || '';
                const currentValue = board[index].value || '';
                hexRef.dataset.prevValue = currentValue;
                if (previousValue !== currentValue.toString() && currentValue !== '') {
                    hexRef.classList.add('animate');
                    const handleAnimationEnd = () => {
                        hexRef.classList.remove('animate');
                    };
                    hexRef.addEventListener('animationend', handleAnimationEnd);
                    return () => {
                        hexRef.removeEventListener('animationend', handleAnimationEnd);
                    };
                }
            }
        });
    }, [board]);

    const getCellColor = (value) => {
        if (value === 0) {
            return { backgroundColor: 'rgba(255, 255, 255, 0.25)' };
        }
        if (value === 2) {
            return { backgroundColor: 'rgba(184, 184, 255, 0.55)' };
        } if (value === 4) {
            return { backgroundColor: 'rgba(115, 0, 194, 0.55)' };
        } else if (value === 8) {
            return { backgroundColor: 'rgba(211, 101, 130, 0.55)' };
        } else if (value === 16) {
            return { backgroundColor: 'rgba(140, 39, 30, 0.55)' };
        } else if (value === 32) {
            return { backgroundColor: 'rgba(6, 141, 157, 0.55)' };
        } else { return { backgroundColor: 'rgba(255, 0, 0, 0.55)' }; }
    };

    const handleSwipe = (eventData) => {
        const { deltaX, deltaY } = eventData;
        const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI + 360) % 360;

        if (angle >= 0 && angle < 60) {
            handleMove('d')
        } else if (angle >= 60 && angle < 120) {
            handleMove('s')
        } else if (angle >= 120 && angle < 180) {
            handleMove('a')
        } else if (angle >= 180 && angle < 240) {
            handleMove('q')
        } else if (angle >= 240 && angle < 300) {
            handleMove('w')
        } else {
            handleMove('e')
        }
    };

    const swipeHandlers = useSwipeable({
        onSwiped: handleSwipe,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        let touchStartY = 0;
        const handleTouchStart = (event) => {
            touchStartY = event.touches[0].clientY;
        };
        const handleTouchMove = (event) => {
            const touchCurrentY = event.touches[0].clientY;
            if (touchCurrentY > touchStartY || touchCurrentY < touchStartY) {
                event.preventDefault();
            }
        };
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div {...swipeHandlers} >
            <Bg variant="game" handleExit={handleExit} />
            {board.map(({ id, rlx, rly, value }, index) => (
                <div
                    ref={el => (hexRefs.current[index] = el)}
                    key={id}
                    className={`hexagon-${id}`}
                    style={
                        {
                            width: `${scale}px`,
                            height: `${scale}px`,
                            top: `${rly + (window.screen.height * 0.06)}px`,
                            left: `calc(50% + ${rlx}px)`,
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '16px',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            position: 'absolute',
                            ...getCellColor(value),
                            backdropFilter: 'blur(2.9px)',
                            WebkitBackdropFilter: 'blur(2.9px)',
                            WebkitClipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                            clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                        }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'rgba(33,1,50,255)',
                            fontSize: `${40 * (scale / 100)}px`,
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                        }}
                    >
                        {value !== 0 && value}
                    </span>
                </div>
            ))}

            {gameState === GAME_STATES.OVER && (
                <TransitionWrap show={show} anim="fadeInOut">
                    <div className="overlay">
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            fontSize: `100px`,
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            animation: 'woOow 1s',
                        }}>GAME OVER</span>
                        <br />
                        <div className='button-container'>
                            <button onClick={() => handleExit()}>EXIT</button>
                            <button onClick={() => handleReset()}>RESTART</button>
                        </div>
                    </div>
                </TransitionWrap>
            )}
        </div>
    )
}

export default Game