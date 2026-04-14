import type { ReactElement } from "react";
import navLinks from '../../data/nav-links';

type NavBarProps = {
    pageName?: string;
}

type NavLinkProps = {
    name: string,
    className: string,
    link: string,
    label: string
}

export default function Nav({ pageName } : NavBarProps) {
    const navElements : ReactElement[] = navLinks.map((link: NavLinkProps, i: number) => {
        let element : ReactElement = <p>{link.label}</p>;
        if (pageName === link.name) {
            element = <div
                id={"" + i}
                className={`${link.className} current`}
            >{element}</div>
        } else {
            element = <a
                className={link.className}
                href={link.link}
            >{element}</a>
        }
        
        return element;
    });

    return (
        <nav className="site-nav">
            {navElements}
        </nav>
    );
}