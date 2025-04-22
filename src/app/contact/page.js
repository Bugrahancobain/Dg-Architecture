"use client";
import React, { useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import "./contact.css";
import { FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaPencilAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "./contact.css"
import Link from "next/link";
function Page() {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS servis ID
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // EmailJS şablon ID
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // EmailJS public key
            )
            .then(
                (result) => {
                    alert("Teşekkürler! Mesaj başarıyla gönderildi!");
                    console.log(result.text);
                },
                (error) => {
                    alert("Mesaj gönderilirken hata oluştu!");
                    console.log(error.text);
                }
            );

        e.target.reset();
    };
    return (
        <div className='contactMain'>
            <div className='contactDiv'>
                <div className="contactFormDiv">
                    <h1>Bize Ulaşın</h1>
                    <form ref={form} onSubmit={sendEmail} className="contactForm">
                        <div className="formGroup">
                            <FaUser className="formIcon" />
                            <input type="text" name="user_name" placeholder="İsim Soyisim" required />
                        </div>
                        <div className="formGroup">
                            <FaEnvelope className="formIcon" />
                            <input type="email" name="user_email" placeholder="E-mail" required />
                        </div>
                        <div className="formGroup">
                            <FaPhone className="formIcon" />
                            <input type="tel" name="user_phone" placeholder="Telefon Numarası" required />
                        </div>
                        <div className="formGroup">
                            <FaInfoCircle className="formIcon" />
                            <input type="text" name="user_subject" placeholder="Başlık" required />
                        </div>
                        <div className="formGroup">
                            <FaPencilAlt className="formIcon" />
                            <textarea name="message" placeholder="Mesajınız" required></textarea>
                        </div>
                        <button type="submit" className="submitButton">
                            Gönder
                        </button>
                    </form>
                </div>
                <div className="contactInfo">
                    <h1>İletişim bilgilerimiz</h1>
                    <div className='footerContactDiv'>
                        <div>
                            <Link href="https://www.google.com/maps?q=Central+Balat+A+Blok+303/34+BURSA" target='_blank' style={{ display: "flex" }}>
                                <FaLocationDot />
                                <div>
                                    Central Balat A Blok 303/34 | BURSA
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="mailto:arc.damlagocer@gmail.com" target='_blank' style={{ display: "flex" }}>
                                <IoIosMail />
                                <div>
                                    arc.damlagocer@gmail.com
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="tel:+905050459890" target='_blank' style={{ display: "flex" }}>
                                <BsFillTelephoneFill />
                                <div>
                                    +90 505 045 98 90
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="https://www.instagram.com/arc.damlagocer/" target='_blank' style={{ display: "flex" }}>
                                <FaInstagram />
                                <div>
                                    : @arc.damlagocer
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="#" target='_blank' style={{ display: "flex" }}>
                                <FaYoutube />
                                <div>
                                    : @arc.damlagocer
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="https://www.linkedin.com/in/damla-g%C3%B6%C3%A7er-1a6948312/" target='_blank' style={{ display: "flex" }}>
                                <FaLinkedin />
                                <div>
                                    : @Damla Göçer
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contactMapDiv'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2362.591396849487!2d28.94448357600359!3d40.266573371464126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca13648001a0bd%3A0x1f925a94a469bbf3!2sCENTRAL%20BALAT!5e1!3m2!1str!2str!4v1744970266121!5m2!1str!2str" width="100%" height="75%" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default Page