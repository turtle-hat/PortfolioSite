import { nanoid } from "nanoid";
import type { ReactElement } from "react";
import navLinks from '../../data/nav-links';

type NavBarProps = {
    pageName?: string;
}

type NavLinkProps = {
    name: string,
    className: string,
    link: string,
    label: string,
    colors: {
        base: string,
        dark: string,
        light: string
    }
}

export default function Nav({ pageName } : NavBarProps) {
    const navElements : ReactElement[] = navLinks.map(link => {
        let element : ReactElement = <p>{link.label}</p>;
        if (pageName === link.name) {
            element = <div
                className={`${link.className} current`}
                style={{
                    backgroundColor: link.colors.dark,
                    borderColor: link.colors.base
                }}
            >{element}</div>
        } else {
            const highlight = (e: 
                React.MouseEvent<HTMLAnchorElement, MouseEvent> |
                React.FocusEvent<HTMLAnchorElement, Element>
            ) => {
                e.currentTarget.style = `
                background-color: ${link.colors.dark};
                outline-color: ${link.colors.base};
                border-color: ${link.colors.base};
                `;
            };
            const unhighlight = (e:
                React.MouseEvent<HTMLAnchorElement, MouseEvent> |
                React.FocusEvent<HTMLAnchorElement, Element>
            ) => {
                e.currentTarget.style = `
                color: light-dark(${link.colors.dark}, ${link.colors.light});
                border-color: light-dark(${link.colors.dark}, ${link.colors.light});
                `;
            };

            element = <a
                className={link.className}
                href={link.link}
                style={{
                    color: `light-dark(${link.colors.dark}, ${link.colors.light})`,
                    borderColor: `light-dark(${link.colors.dark}, ${link.colors.light})`
                }}
                onMouseOver={highlight}
                onMouseOut={unhighlight}
                onFocus={highlight}
                onBlur={unhighlight}
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