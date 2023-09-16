import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3em;`

const H1 = styled.h1`
    font-family: Arial, Helvetica, sans-serif;`

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(3, 150px);
    gap: 1rem;
    margin-top: 2em;
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
    ${props => props.$block && css`
        cursor: not-allowed;`}`

function Game(){
    const emptyBlock = Array(9).fill('')
    const [block, setBlock] = useState(emptyBlock)
    const [currentPlayer, setCurrentPlayer] = useState('O')

    const handleClick = (index) => {
        if (block[index] !== '') {
            alert('Posição ocupada!')
            return null
        }
        setBlock(block.map((item, itemIndex) => (itemIndex === index ? currentPlayer : item)))

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
    // empate
    const draw = () => {
        if (block.every((item) => item !== '')) {
            alert('Houve um empate')
            resetGame()
        }
    }

    function winner(){
        const waysToWin = [
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

        waysToWin.forEach((cells) => {
            if (cells.every((cell) => cell === 'O')) {
                alert('O venceu!')
                resetGame()
            }
            if (cells.every((cell) => cell === 'X')) {
                alert('X venceu!')
                resetGame()
            }
        })
    }

    const resetGame = () => {
        setCurrentPlayer('O')
        setBlock(emptyBlock)
    }

    useEffect(winner, [block])
    useEffect(draw, [block])

    return(
        <Container>
            <H1>Jogo da Velha</H1>
            <Box>
                {block.map((item, index) => (<Button $block={`${item}`} key={String(index)} onClick={() => handleClick(index)}>{item}</Button>))}
            </Box>
        </Container>
    )
}

export default Game