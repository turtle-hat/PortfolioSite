interface FooterProps {
    variant?: string
}

export default function Footer({variant} : FooterProps) {
    return (
        <footer className={variant}>
            <p>&copy;2026 Owen Gebhardt</p>
        </footer>
    );
}
