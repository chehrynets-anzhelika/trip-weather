import React from 'react';
import "./footer.css";

const Footer = () => {
    return (
        <footer className='my-footer'>
            <ul className='footer-list'>
                <li className='footer-item'><a href="https://github.com/chehrynets-anzhelika" target="blank"><img src="/images/footer/github.svg" alt='icon-github-image' width={30} height={25}></img></a></li>
                <li className='footer-item'><a href="https://linkedin.com/in/chehrynets-anzhelika/" target="blank"><img src="/images/footer/linkedin.svg" alt='icon-linkedin-image' width={30} height={30}></img></a></li>
                <li className='footer-item'><a href="mailto:chehrynets.a@gmail.com" target="blank"><img src="/images/footer/mail.svg" alt='icon-mail-image' width={30} height={30}></img></a></li>
                <li className='footer-item'><a href="https://t.me/chehrynets_anzhelika" target="blank"><img src="/images/footer/telegram.svg" alt='icon-telegram-image' width={30} height={25}></img></a></li>
            </ul>

        </footer>
    );
}

export default Footer;
