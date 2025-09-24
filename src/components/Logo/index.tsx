interface LogoProps {
    fixedColor?: boolean
}

export default function Logo({fixedColor}: LogoProps) {
    return(
        <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" />
            <h1 className="text-xl font-bold text-foreground" style={{color: fixedColor ? '#E8EAEE' : undefined}}>ArchStudio Pro</h1>
        </div>
    )
}