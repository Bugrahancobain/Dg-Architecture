import React from 'react'
import "./aboutUs.css"
function aboutUs() {
    return (
        <div className='aboutPageMain'>
            <div className='aboutPagePClass'>
                <div>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} src="/about_Us_Image.jpg" alt="Damla_Gocer_Mimarlik_Hakkimizda_Image" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <h2>Hakkımızda</h2>
                    <p>DG Mimarlık, kurucusu Mimar Damla Göçer’ın liderliğinde hayata geçen, mimariyi yalnızca bir yapı üretme süreci değil; aynı zamanda yaşam alanlarına ruh katma sanatı olarak gören bir tasarım ofisidir.

                        Mimari yaklaşımımız; fonksiyonellik, sadelik, estetik ve oran kavramlarını modernlik ve sürdürülebilirlik ilkeleriyle birleştirerek kullanıcıya değer katan yapılar üretmeyi amaçlar. Her projede, mimari ritim ve denge ile şekillenen yalın ama güçlü çizgiler oluşturmak bizim için esastır.

                        DG Mimarlık olarak, tasarımlarımızda çevreyle uyumu, kullanıcı konforunu ve zamansız estetiği ön planda tutuyoruz. Çünkü inanıyoruz ki, gerçek mimarlık; yalnızca bina yapmak değil, hissettirmek, yaşatmak ve geleceğe değer bırakmaktır.

                        Hizmet alanlarımız arasında; lüks konutlar, rezidanslar, yüksek yapılar, oteller, özel hastaneler, eğitim yapıları, sosyal tesisler, restorasyon projeleri ve konsept yarışma projeleri yer almaktadır. Yurt içi ve yurt dışında farklı ölçekteki projelerde edindiğimiz deneyimle, her yeni çalışmamızda heyecanla ilerlemeye devam ediyoruz.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default aboutUs