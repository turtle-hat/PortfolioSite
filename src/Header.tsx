interface HeaderProps {
    variant?: string
}

export default function Header({variant} : HeaderProps) {
    return (
        <header className={`hero ${variant}`}>
            <div className="hero-text">
                <h1>Owen Gebhardt</h1>
                <h2>Meticulous creator always ready for a new challenge</h2>
            </div>
        </header>
    );
}