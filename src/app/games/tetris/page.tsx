'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'

// Small amounts of ChatGPT

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const INITIAL_SPEED = 1000

type Tetromino = {
    shape: number[][]
}

const TETROMINOS: Tetromino[] = [
    { shape: [[1, 1, 1, 1]] },
    { shape: [[1, 1], [1, 1]] },
    { shape: [[1, 1, 1], [0, 1, 0]] },
    { shape: [[1, 1, 1], [1, 0, 0]] },
    { shape: [[1, 1, 1], [0, 0, 1]] },
    { shape: [[1, 1, 0], [0, 1, 1]] },
    { shape: [[0, 1, 1], [1, 1, 0]] },
]

const createEmptyBoard = (): number[][] =>
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))

type Piece = {
    shape: number[][]
    color: string
    x: number
    y: number
}

const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 70%, 50%)`
}

export default function Tetris() {
    const [board, setBoard] = useState<number[][]>(createEmptyBoard())
    const [currentPiece, setCurrentPiece] = useState<Piece | null>(null)
    const [score, setScore] = useState<number>(0)
    const [linesCleared, setLinesCleared] = useState<number>(0)
    const [speed, setSpeed] = useState<number>(INITIAL_SPEED)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [bestScore, setBestScore] = useState<number>(0)
    const [isPaused, setIsPaused] = useState<boolean>(false)

    const pieceRef = useRef<Piece | null>(currentPiece)

    useEffect(() => {
        const savedBestScore = localStorage.getItem('tetris_bestScore')
        if (savedBestScore) {
            setBestScore(Number(savedBestScore))
        }
    }, [])

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score)
            localStorage.setItem('tetris_bestScore', score.toString())
        }
    }, [score, bestScore])

    const spawnNewPiece = useCallback(() => {
        const newPiece: Tetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]
        const x = Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2)
        const newCurrentPiece: Piece = { ...newPiece, color: getRandomColor(), x, y: 0 }

        if (isCollision(newCurrentPiece, board)) {
            setGameOver(true)
        } else {
            setCurrentPiece(newCurrentPiece)
            pieceRef.current = newCurrentPiece
        }
    }, [board])

    const isCollision = (piece: Piece, board: number[][], offsetX = 0, offsetY = 0): boolean => {
        return piece.shape.some((row, y) =>
            row.some((value, x) =>
                value !== 0 &&
                (board[y + piece.y + offsetY] === undefined ||
                    board[y + piece.y + offsetY][x + piece.x + offsetX] === undefined ||
                    board[y + piece.y + offsetY][x + piece.x + offsetX] !== 0)
            )
        )
    }

    const merge = (piece: Piece, board: number[][]): number[][] => {
        const newBoard = board.map(row => [...row])
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newBoard[y + piece.y][x + piece.x] = 2 // Use 2 to represent placed blocks
                }
            })
        })
        return newBoard
    }

    const clearRows = (board: number[][]): number[][] => {
        const newBoard = board.filter(row => row.some(cell => cell === 0))
        const clearedRows = BOARD_HEIGHT - newBoard.length
        setLinesCleared(prev => prev + clearedRows)

        let points = 0
        switch (clearedRows) {
            case 1: points = 40; break
            case 2: points = 100; break
            case 3: points = 300; break
            case 4: points = 1200; break
        }
        setScore(prev => prev + points)

        return [...Array(clearedRows).fill(Array(BOARD_WIDTH).fill(0)), ...newBoard]
    }

    const calculateGhostPiece = (piece: Piece, board: number[][]): Piece => {
        let ghostPiece = { ...piece }
        while (!isCollision(ghostPiece, board, 0, 1)) {
            ghostPiece.y += 1
        }
        return ghostPiece
    }

    const moveDown = useCallback(() => {
        if (pieceRef.current && !isPaused) {
            if (!isCollision(pieceRef.current, board, 0, 1)) {
                setCurrentPiece(prev => ({ ...prev!, y: prev!.y + 1 }))
                pieceRef.current = { ...pieceRef.current, y: pieceRef.current!.y + 1 }
            } else {
                const newBoard = merge(pieceRef.current, [...board])
                const clearedBoard = clearRows(newBoard)
                setBoard(clearedBoard)
                spawnNewPiece()
                setScore(prev => prev + 10)
            }
        }
    }, [board, spawnNewPiece, isPaused])

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (gameOver || isPaused) return
        console.log(event.key)
        switch (event.key) {
            case 'ArrowLeft':
                if (pieceRef.current && !isCollision(pieceRef.current, board, -1, 0)) {
                    setCurrentPiece(prev => ({ ...prev!, x: prev!.x - 1 }))
                    pieceRef.current = { ...pieceRef.current, x: pieceRef.current!.x - 1 }
                }
                break
            case 'ArrowRight':
                if (pieceRef.current && !isCollision(pieceRef.current, board, 1, 0)) {
                    setCurrentPiece(prev => ({ ...prev!, x: prev!.x + 1 }))
                    pieceRef.current = { ...pieceRef.current, x: pieceRef.current!.x + 1 }
                }
                break
            case 'ArrowDown':
                setScore(prev => prev + 1)
                moveDown()
                break
            case 'ArrowUp':
                const rotatedPiece: Piece = {
                    ...pieceRef.current!,
                    shape: pieceRef.current!.shape[0].map((_, index) =>
                        pieceRef.current!.shape.map(row => row[index]).reverse()
                    )
                }
                if (!isCollision(rotatedPiece, board)) {
                    setCurrentPiece(rotatedPiece)
                    pieceRef.current = rotatedPiece
                }
                break
            case ' ':
                spawnNewPiece()
        }
    }, [gameOver, moveDown, board, isPaused])

    useEffect(() => {
        //spawnNewPiece()
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [spawnNewPiece, handleKeyPress])

    useEffect(() => {
        if (gameOver || isPaused) return
        const gameLoop = setInterval(moveDown, speed)
        return () => {
            clearInterval(gameLoop)
        }
    }, [moveDown, gameOver, speed, isPaused])

    useEffect(() => {
        const newSpeed = INITIAL_SPEED * Math.pow(0.8, Math.floor(score / 500))
        setSpeed(newSpeed)
    }, [score])

    const resetGame = () => {
        setBoard(createEmptyBoard())
        setScore(0)
        setLinesCleared(0)
        setSpeed(INITIAL_SPEED)
        setGameOver(false)
        setIsPaused(false)
        spawnNewPiece()
    }

    const togglePause = () => {
        setIsPaused(prev => !prev)
    }

    const ghostPiece = currentPiece ? calculateGhostPiece(currentPiece, board) : null

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-500 p-4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Tetris</h1>
                <div className="grid grid-cols-10 gap-px bg-gray-300 dark:bg-gray-600 border border-gray-300 dark:border-gray-500">
                    {board.map((row, y) =>
                        row.map((cell, x) => {
                            const isCurrentPiece = pieceRef.current &&
                                pieceRef.current.shape[y - pieceRef.current.y] &&
                                pieceRef.current.shape[y - pieceRef.current.y][x - pieceRef.current.x]

                            const isGhostPiece = ghostPiece &&
                                ghostPiece.shape[y - ghostPiece.y] &&
                                ghostPiece.shape[y - ghostPiece.y][x - ghostPiece.x]

                            let backgroundColor = 'bg-gray-100 dark:bg-gray-700'
                            if (cell === 2) {
                                backgroundColor = 'bg-gray-400 dark:bg-gray-500'
                            } else if (isCurrentPiece) {
                                backgroundColor = pieceRef.current?.color || ''
                            } else if (isGhostPiece) {
                                backgroundColor = 'bg-gray-300 dark:bg-gray-600'
                            }

                            return (
                                <div
                                    key={`${y}-${x}`}
                                    className={`w-6 h-6 border border-gray-200 dark:border-gray-700 ${backgroundColor}`}
                                    style={{
                                        backgroundColor: isCurrentPiece ? pieceRef.current?.color : undefined,
                                        borderWidth: '1px', // Reduce border width
                                        borderColor: 'rgba(0, 0, 0, 0.1)' // Lighter border color
                                    }}
                                />
                            )
                        })
                    )}
                </div>
                <div className="mt-4 flex justify-center">
                    <Button onClick={togglePause} className="mr-2">
                        {isPaused ? <Play className="w-4 h-4 mr-2"/> : <Pause className="w-4 h-4 mr-2"/>}
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button onClick={resetGame}>Reset</Button>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <div className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Score: {score}</div>
                <div className="text-lg mb-2 text-gray-900 dark:text-gray-100">Lines: {linesCleared}</div>
                <div className="text-lg mb-2 text-gray-900 dark:text-gray-100">Best: {bestScore}</div>
                {gameOver && (
                    <div className="mt-4 text-center">
                        <p className="text-xl font-bold text-red-500 dark:text-red-400 mb-2">Game Over!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
