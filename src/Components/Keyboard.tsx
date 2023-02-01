import React, { useCallback , useContext, useEffect} from 'react'
import {Context} from '../App'
import './styles.css';

const Keyboard: React.FC = () => {
    const keys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
    const {
        gameOver,
        handleEnter,
        handleDelete,
        handleSelect,
        currentAttempt
    } = useContext(Context)

    const handleKeyBoard = useCallback((event) => {
        if(gameOver.isGameOver) return;
        if(event.key === 'Enter') {
            handleEnter()
        } else if(event.key === 'Backspace') {
            handleDelete()
        } else {
            keys.forEach((key) => {
                if(key.split("").includes(event.key.toUpperCase())) {
                    handleSelect(event.key)
                }
            })
        }
    }, [currentAttempt])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyBoard);
        return () => {
        document.removeEventListener("keydown", handleKeyBoard);
        };
    }, [handleKeyBoard]);


    return(
        <div className="keyboard" onKeyDown={handleKeyBoard}>
        {keys.map((key, index) => (
                <div className='line' key={index}>
                    {key.split("").map((character) => {
                            return(
                                <div className='key' key={character} onClick={() => handleSelect(character)}>
                                    {character}
                                </div>
                            )
                        })}
                </div>
            ))}
        </div>
    )
}

export default Keyboard