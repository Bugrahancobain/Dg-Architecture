"use client";
import Link from 'next/link'
import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { usePathname } from 'next/navigation';

import "../style/navbar.css"

function Navbar() {
    const pathname = usePathname();
    return (
        <div className='NavbarMain'>
            <div className='NavbarLogo'>
                <Link href="/">
                    <img className='NavbarLogoImg' src="/dg-mimarlik-logo.png" alt="Damla_Gocer_Mimarlik_Logo" />
                </Link>
            </div>

            <div className='NavbarLinks'>
                <Link href="/" className={pathname === '/' ? 'active' : ''}>Ana Sayfa</Link>
                <Link href="/aboutUs" className={pathname === '/aboutUs' ? 'active' : ''}>Hakkımızda</Link>
                <Link href="/projects" className={pathname === '/projects' ? 'active' : ''}>Projeler</Link>
                <Link href="/videos" className={pathname === '/videos' ? 'active' : ''}>Videolar</Link>
                <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>İletişim</Link>
            </div>
            <div className='NavbarSocial'>
                <Link target='_blank' href="https://www.instagram.com/arc.damlagocer/">
                    <FaInstagram />
                </Link>
                <Link target='_blank' href="https://api.whatsapp.com/send/?phone=%2B905050459890&text&type=phone_number&app_absent=0">
                    <FaWhatsapp />
                </Link>
                <Link target='_blank' href="https://www.youtube.com/@arc.damlag%C3%B6%C3%A7er">
                    <FaYoutube />
                </Link>
                <Link target='_blank' href="https://www.linkedin.com/in/damla-g%C3%B6%C3%A7er-1a6948312/">
                    <FaLinkedin />
                </Link>
            </div>
        </div>
    )
}

export default Navbar