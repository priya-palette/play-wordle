import React, {useContext} from 'react'
import './styles.css';
import { Context } from '../App';


const Board: React.FC = () => {
    const {targetWord, currentAttempt, board} = useContext(Context)

    const getId = (value:string, i: number) => {
        const correct = targetWord[i] === value.toLowerCase()
        const exist = !correct && value!== "" && targetWord.includes(value.toLocaleLowerCase())
        return correct ? "correct" : exist ? 'exist' : "notExist"
    }
    
    return(
        <div className='board'>
            {board.map((val, index) => {
                return(
                    <div className='row' key={index}>
                        {val.map((value, i) => <div className="letter" id={value !=="" && currentAttempt.attempt > index ? getId(value, i) : ''} key={`${index}${i}`}>{value}</div>)}
                    </div>
                )
            })}
        </div>
    )
}

export default Board