'use client';

import React, { useState } from 'react';

export default function ImagePopup({ images }) {
    const [popupImage, setPopupImage] = useState(null);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div className="gallerySection">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Proje Foto ${idx + 1}`}
                        className="galleryImage"
                        onClick={() => setPopupImage(img)}
                    />
                ))}
            </div>

            {popupImage && (
                <div className="popupOverlay" onClick={() => setPopupImage(null)}>
                    <img src={popupImage} alt="Büyük Görsel" className="popupImage" />
                </div>
            )}
        </>
    );
}