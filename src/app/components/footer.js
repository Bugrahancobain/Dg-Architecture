// components/Footer.js (SSR versiyon)
import Link from 'next/link';
import { FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { adminDb } from '../../../firebaseAdmin';
import "../style/footer.css";

export const dynamic = 'force-dynamic';

export default async function Footer() {
    const snapshot = await adminDb.ref('references').once('value');
    const data = snapshot.val();

    const recentProjects = data
        ? Object.entries(data)
            .map(([id, val]) => ({ id, ...val }))
            .filter((p) => p.status === 'Devam Ediyor')
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 3)
        : [];

    return (
        <div className='footerClass'>
            <div className='footerMain'>
                <div className='footerLogoLinks'>
                    <Link href="/">
                        <img className='footerLogoImg' src="/dg-mimarlik-logo.png" alt="dg_mimarlik_logo" />
                    </Link>
                    <div className='footerSocial'>
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
                <div>
                    <h6>İletişim</h6>
                    <div className='footerContactDiv'>
                        <div>
                            <Link href="https://www.google.com/maps?q=Central+Balat+A+Blok+303/34+BURSA" target='_blank' style={{ display: "flex" }}>
                                <FaLocationDot />
                                <div>Central Balat A Blok 303/34 | BURSA</div>
                            </Link>
                        </div>
                        <div>
                            <Link href="mailto:arc.damlagocer@gmail.com" target='_blank' style={{ display: "flex" }}>
                                <IoIosMail />
                                <div>arc.damlagocer@gmail.com</div>
                            </Link>
                        </div>
                        <div>
                            <Link href="tel:+905050459890" target='_blank' style={{ display: "flex" }}>
                                <BsFillTelephoneFill />
                                <div>+90 505 045 98 90</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h6>Devam Eden Projelerimiz</h6>
                    <div className="footerProjectList">
                        {recentProjects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.id}`}>
                                <div className="footerProjectItem">{project.location}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='footerCopyright'>
                Copyright © 2025 DG Mimarlık.
            </div>
        </div>
    );
}
