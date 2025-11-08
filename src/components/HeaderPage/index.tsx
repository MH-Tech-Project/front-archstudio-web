interface HeaderPageProps {
    title: string;
    description: string;
}

export function HeaderPage({ title, description }: HeaderPageProps){

    return(
        <div className="mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">{title}</h1>
            <p className="text-[#9FA3AD]">{description}</p>
        </div>
    )
}