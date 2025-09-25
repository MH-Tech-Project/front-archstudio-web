import Features from "../../components/Features";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

export default function Home() {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <Hero />
            <Features />
        </div>
    )
}