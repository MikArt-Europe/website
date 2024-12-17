'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const PongGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ball, setBall] = useState({ x: 200, y: 100, dx: 2, dy: 2 });
    const [paddle1, setPaddle1] = useState({ y: 80 });
    const [paddle2, setPaddle2] = useState({ y: 80 });
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [isAIEnabled, setIsAIEnabled] = useState(false);
    const [overExaggerate, setOverExaggerate] = useState(false);
    const requestRef = useRef<number>();

    const updateGame = useCallback(() => {
        setBall(prev => {
            let { x, y, dx, dy } = prev;

            // Ball movement
            x += dx;
            y += dy;

            // Wall collision
            if (y <= 0 || y >= 196) dy = -dy;

            // Paddle collision with overExaggerate effect
            const handlePaddleCollision = (paddleY: number) => {
                const hitPosition = (y - paddleY) / 40;
                if (overExaggerate) {
                    dy = (dy * 0.5) + (dy * hitPosition); // Exaggerate the angle based on hit position
                }
                dx = -dx;
            };

            if (x <= 10 && y >= paddle1.y && y <= paddle1.y + 40) handlePaddleCollision(paddle1.y);
            if (x >= 390 && y >= paddle2.y && y <= paddle2.y + 40) handlePaddleCollision(paddle2.y);

            // Scoring
            if (x <= 0) {
                setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
                if (score.player2 + 1 >= 10) setGameOver(true);
                return { x: 200, y: 100, dx: 2, dy: 2 };
            }
            if (x >= 400) {
                setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
                if (score.player1 + 1 >= 10) setGameOver(true);
                return { x: 200, y: 100, dx: -2, dy: 2 };
            }

            return { x, y, dx, dy };
        });

        // AI control for paddle2
        if (isAIEnabled) {
            setPaddle2(prev => ({
                y: Math.min(Math.max(ball.y - 20, 0), 160)
            }));
        }

        requestRef.current = requestAnimationFrame(updateGame);
    }, [paddle1.y, paddle2.y, score, isAIEnabled, ball.y, overExaggerate]);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.clearRect(0, 0, 400, 200);
            context.fillStyle = 'red';
            context.fillRect(ball.x, ball.y, 4, 4);
            context.fillRect(4, paddle1.y, 4, 40);
            context.fillRect(392, paddle2.y, 4, 40);
        }
    }, [ball, paddle1, paddle2]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isAIEnabled) {
                switch (e.key) {
                    case 'w':
                        setPaddle2(prev => ({ y: Math.max(prev.y - 10, 0) }));
                        break;
                    case 's':
                        setPaddle2(prev => ({ y: Math.min(prev.y + 10, 160) }));
                        break;
                }

            }

            switch (e.key) {
                case 'ArrowUp':
                    setPaddle1(prev => ({ y: Math.max(prev.y - 10, 0) }));
                    break;
                case 'ArrowDown':
                    setPaddle1(prev => ({ y: Math.min(prev.y + 10, 160) }));
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAIEnabled]);

    useEffect(() => {
        if (!gameOver) {
            requestRef.current = requestAnimationFrame(updateGame);
        }
        return () => cancelAnimationFrame(requestRef.current!);
    }, [updateGame, gameOver]);

    const resetGame = () => {
        setBall({ x: 200, y: 100, dx: 2, dy: 2 });
        setPaddle1({ y: 80 });
        setPaddle2({ y: 80 });
        setScore({ player1: 0, player2: 0 });
        setGameOver(false);
        requestRef.current = requestAnimationFrame(updateGame);
    };

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Pong Game</CardTitle>
            </CardHeader>
            <CardContent>
                <motion.canvas ref={canvasRef} width={400} height={200} className="border border-gray-500" />
                <div className="mt-4">
                    <p>Player 1: {score.player1}</p>
                    <p>Player 2: {score.player2}</p>
                    <Button onClick={resetGame}>New Game</Button>
                </div>
                <div className="mt-4 flex items-center">
                    <span>AI Opponent:</span>
                    <Switch checked={isAIEnabled} onCheckedChange={setIsAIEnabled} />
                </div>
                <div className="mt-4 flex items-center">
                    <span>OverExaggerate:</span>
                    <Switch checked={overExaggerate} onCheckedChange={setOverExaggerate} />
                </div>
                {gameOver && <p className="text-red-500">Game Over!</p>}
            </CardContent>
        </Card>
    );
};

export default function GamePage() {
    return (
        <div className="flex flex-col items-center">
            <PongGame />
        </div>
    );
};
