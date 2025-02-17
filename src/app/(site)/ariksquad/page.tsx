import {BackgroundGradientAnimation} from "@/components/ui/bg-gradient-anim";

export const metadata = {
    title: "ArikSquad @ MikArt Europe"
}

export default function Page() {
    return (
        <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl flex-col">
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-white/80 to-white/20 mb-4">
                    ArikSquad
                </p>
                <p className="bg-clip-text text-transparent drop-shadow-2xl font-light bg-linear-to-b from-white/80 to-white/20">
                    A developer
                </p>
            </div>
        </BackgroundGradientAnimation>
    );
}