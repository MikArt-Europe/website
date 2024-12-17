'use client'

import React, {useState, useEffect, useRef, useCallback, ChangeEvent} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface SnakeSegment {
    x: number;
    y: number;
}

interface Direction {
    x: number;
    y: number;
}

interface GameSettingsProps {
    onSpeedChange: (newSpeed: number) => void;
    onReset: () => void;
}

const SnakeGame: React.FC<{ speed: number, setSpeed: (speed: number) => void }> = ({ speed, setSpeed }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<SnakeSegment>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Direction>({ x: 1, y: 0 });
    const [inputQueue, setInputQueue] = useState<Direction[]>([]);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const requestRef = useRef<number>();
    const lastUpdateTimeRef = useRef<number>(0);

    const updateGame = useCallback((time: number) => {
        if (time - lastUpdateTimeRef.current < speed) {
            requestRef.current = requestAnimationFrame(updateGame);
            return;
        }
        lastUpdateTimeRef.current = time;

        setSnake(prev => {
            const newSnake = [...prev];
            let newDirection = direction;

            // Process input queue
            if (inputQueue.length > 0) {
                newDirection = inputQueue[0];
                setInputQueue(queue => queue.slice(1));
                setDirection(newDirection); // Update direction state
            }

            const head = { x: newSnake[0].x + newDirection.x, y: newSnake[0].y + newDirection.y };

            // Check for wall collision
            if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
                setGameOver(true);
                cancelAnimationFrame(requestRef.current!);
                return prev;
            }

            // Check for self collision
            if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                cancelAnimationFrame(requestRef.current!);
                return prev;
            }

            newSnake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
                setScore(score + 1);
            } else {
                newSnake.pop();
            }
            return newSnake;
        });

        requestRef.current = requestAnimationFrame(updateGame);
    }, [direction, food, score, speed, inputQueue]);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.clearRect(0, 0, 400, 400);
            context.fillStyle = 'green';
            snake.forEach(segment => context.fillRect(segment.x * 20, segment.y * 20, 20, 20));
            context.fillStyle = 'red';
            context.fillRect(food.x * 20, food.y * 20, 20, 20);
        }
    }, [snake, food]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let newDirection: Direction | null = null;
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) newDirection = { x: 0, y: -1 };
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) newDirection = { x: 0, y: 1 };
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) newDirection = { x: -1, y: 0 };
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) newDirection = { x: 1, y: 0 };
                    break;
            }
            if (newDirection) {
                setInputQueue(queue => [...queue, newDirection]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (!gameOver) {
            requestRef.current = requestAnimationFrame(updateGame);
        }
        return () => cancelAnimationFrame(requestRef.current!);
    }, [updateGame, gameOver]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection({ x: 1, y: 0 });
        setInputQueue([]);
        setScore(0);
        setGameOver(false);
        lastUpdateTimeRef.current = 0;
        requestRef.current = requestAnimationFrame(updateGame);
    };

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Snake Game</CardTitle>
            </CardHeader>
            <CardContent>
                <motion.div
                    className="relative"
                    style={{ width: 400, height: 400, border: '1px solid gray' }}
                >
                    {snake.map((segment, index) => (
                        <motion.div
                            key={index}
                            className="absolute bg-green-500"
                            style={{ width: 20, height: 20 }}
                            animate={{ x: segment.x * 20, y: segment.y * 20 }}
                            transition={{ duration: speed / 1000 }}
                        />
                    ))}
                    <motion.div
                        className="absolute bg-red-500"
                        style={{ width: 20, height: 20 }}
                        animate={{ x: food.x * 20, y: food.y * 20 }}
                        transition={{ duration: speed / 1000 }}
                    />
                </motion.div>
                <div className="mt-4">
                    <p>Score: {score}</p>
                    <Button onClick={resetGame}>New Game</Button>
                </div>
                {gameOver && <p className="text-red-500">Game Over!</p>}
            </CardContent>
        </Card>
    );
};

const GamePage = () => {
    const [speed, setSpeed] = useState<number>(200);

    return (
        <div className="flex flex-col items-center">
            <SnakeGame speed={speed} setSpeed={setSpeed} />
        </div>
    );
};

export default GamePage;