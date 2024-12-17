import Link from 'next/link';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import Footer from '@/components/footer';
import {Button} from "@/components/ui/button";

const games = [
    { name: 'Tetris', description: 'Classic block-stacking game', link: '/games/tetris' },
    { name: 'Snake', description: 'Guide the snake to eat food', link: '/games/snake' },
    { name: 'Pong', description: 'Classic table tennis game', link: '/games/pong' },
];

export default function GameSelection() {
    return (
        <div className="min-h-screen flex flex-col bg-background p-8">
            <div className="flex-grow">
                <h1 className="text-4xl font-bold text-center mb-8">Select a game</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game) => (
                        <Card key={game.name} className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{game.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{game.description}</p>

                            </CardContent>
                            <CardFooter>
                                <Link href={game.link}>
                                <Button>
                                    Play {game.name}
                                </Button></Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};