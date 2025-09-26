import { useEffect } from "react";
import Header from "../../components/Header";
import PlansSelector from "../../components/PlansSelector";

export default function Plans() {

    useEffect(() =>{
        window.document.title = "Planos | ArchStudio Pro";
    },[])

    return(
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <Header />
            <div className="w-full flex flex-col gap-16 justify-center items-center mt-40 lg:mt-20">
                <div className="w-11/12 md:w-3/5 flex flex-col justify-center items-center text-center gap-4">
                    <h1 className="text-3xl md:text-5xl text-foreground font-bold flex-wrap text-center">Escolha o plano ideal para você</h1>
                    <p className="w-4/5  lg:w-3/5 text-base md:text-xl text-[#9FA3AD] font-light text-center">Soluções completas para arquitetos e urbanistas, desde projetos individuais até grandes escritórios</p>
                </div>

                <div className="w-4/5">
                    <PlansSelector />
                </div>
            </div>
        </div>
    )
}