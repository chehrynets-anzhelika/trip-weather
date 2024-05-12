import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from "../Footer/Footer";

test("Footer has corrects href", () => {

    const links = [
        {
            text: "github",
            href: "https://github.com/chehrynets-anzhelika",
        },
        {
            text: "linkedin",
            href: "https://linkedin.com/in/chehrynets-anzhelika",
        },
        {
            text: "mail",
            href: "mailto:chehrynets.a@gmail.com",
        },
        {
            text: "telegram",
            href: "https://t.me/chehrynets_anzhelika",
        },
    ];

   render (<Footer/>)
   links.forEach(link => {
    const element = screen.getByRole("link", { name: new RegExp(link.text, "i") });
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", link.href);
});
})