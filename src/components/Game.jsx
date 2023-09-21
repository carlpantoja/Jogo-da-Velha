import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2em;`

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(3, 150px);
    gap: 1rem;
    margin-top: 1em;
    padding: 15px;
    background-color: #5d8aa8;
    border-radius: 1em;
    align-items: center;
    justify-content: center;`

const Button = styled.button`
    font-size: 100px;
    padding: 10px;
    height: 1.5em;
    cursor: pointer;
    border: none;
    ${props => props.$clear && css `
        height: 30px;
        margin: 5px;
        padding: 5px;
        font-size: 15px;
        border: 1px solid;
        border-radius: 5px;`}
    ${props => props.$block && css`
        cursor: not-allowed;`}
    ${props => {
        switch (props.$block){
            case 'O':
                return css`
                background-color: #ffff00;`
            case 'X':
                return css`
                background-color: #00ff00;`
        }
    }}
    ${props => {
        switch (props.$game){
            case 'game-over':
                return css`
                cursor: not-allowed;`
            default:
                return null
        }
    }}`

const Span = styled.div`
    display: flex;
    margin-top: 10px;`

const Message = styled.p`
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;`

function Game(){
    const emptyBlock = Array(9).fill('')
    const [block, setBlock] = useState(emptyBlock)
    const [currentPlayer, setCurrentPlayer] = useState('O')
    const [winner, setWinner] = useState(null)

    const handleClick = (index) => {
        if (winner) {
            alert('Jogo finalizado!')
            return null
        }

        if (block[index] !== '') {
            alert('Posição ocupada!')
            return null
        }
        setBlock(block.map((item, itemIndex) => (itemIndex === index ? currentPlayer : item)))

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    function result(){
        const checkResult = [
            // vertical
            [block[0], block[1], block[2]],
            [block[3], block[4], block[5]],
            [block[6], block[7], block[8]],
            // horizontal
            [block[0], block[3], block[6]],
            [block[1], block[4], block[7]],
            [block[2], block[5], block[8]],
            // diagonal
            [block[0], block[4], block[8]],
            [block[2], block[4], block[6]]
        ]

        checkResult.forEach((block) => {
            if (block.every((item) => item === 'O')) setWinner('O')
            if (block.every((item) => item === 'X')) setWinner('X')
        })

        if (block.every((item) => item !== '')) setWinner('D')
    }

    const resetGame = () => {
        setCurrentPlayer('O')
        setBlock(emptyBlock)
        setWinner(null)
    }

    useEffect(result, [block])

    return(
        <Container>
            <Box>
                {block.map((item, index) => 
                    (<Button $block={`${item}`} $game={`${winner ? 'game-over' : ''}`} key={String(index)} onClick={() => handleClick(index)}>{item}</Button>))
                }
            </Box>
            {winner &&
                <Span>
                    {winner === 'D' ? <Message>Deu empate</Message>
                    : <Message>{winner} venceu!</Message>}
                    <Button $clear onClick={resetGame}>Novo Jogo</Button>
                </Span>
            }
        </Container>
    )
}

export default Game