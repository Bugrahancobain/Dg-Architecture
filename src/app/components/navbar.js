"use client";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin } from "react-icons/fa";
import "../style/navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className='NavbarMain'>
            <div className='NavbarLogo'>
                <Link href="/">
                    <img className='NavbarLogoImg' src="/dg-mimarlik-logo.png" alt="Damla_Gocer_Mimarlik_Logo" />
                </Link>
            </div>

            <div className='NavbarBurger' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={`NavbarLinksWrapper ${menuOpen ? 'open' : ''}`}>
                <div className="NavbarLinks">
                    <Link href="/" onClick={() => setMenuOpen(false)} className={pathname === '/' ? 'active' : ''}>Ana Sayfa</Link>
                    <Link href="/aboutUs" onClick={() => setMenuOpen(false)} className={pathname === '/aboutUs' ? 'active' : ''}>Hakkımızda</Link>
                    <Link href="/projects" onClick={() => setMenuOpen(false)} className={pathname === '/projects' ? 'active' : ''}>Projeler</Link>
                    <Link href="/videos" onClick={() => setMenuOpen(false)} className={pathname === '/videos' ? 'active' : ''}>Videolar</Link>
                    <Link href="/contact" onClick={() => setMenuOpen(false)} className={pathname === '/contact' ? 'active' : ''}>İletişim</Link>
                </div>

                <div className='NavbarSocial'>
                    <Link target='_blank' href="https://www.instagram.com/arc.damlagocer/"><FaInstagram /></Link>
                    <Link target='_blank' href="https://api.whatsapp.com/send/?phone=%2B905050459890"><FaWhatsapp /></Link>
                    <Link target='_blank' href="https://www.youtube.com/@arc.damlag%C3%B6%C3%A7er"><FaYoutube /></Link>
                    <Link target='_blank' href="https://www.linkedin.com/in/damla-g%C3%B6%C3%A7er-1a6948312/"><FaLinkedin /></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;