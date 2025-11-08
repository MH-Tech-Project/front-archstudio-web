export function Container({ children }: { children: React.ReactNode }) {
    return(
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-16 py-6 sm:py-8 lg:py-12 max-w-[86rem]">
            {children}
        </div>
    )
}