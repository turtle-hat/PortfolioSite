interface HeaderProps {
    title: string,
    subtitle?: string,
    variant?: string
}

export default function Header({title, subtitle, variant} : HeaderProps) {
    return (
        <header className={`hero ${variant}`}>
            <div className="hero-text">
                <h1>{title}</h1>
                {subtitle !== undefined && <h2>{subtitle}</h2>}
            </div>
        </header>
    );
}