"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { database } from "../../../../firebase";
import { ref, onValue, set, remove } from "firebase/database";
import "./services.css";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editServiceId, setEditServiceId] = useState(null);
    const [newService, setNewService] = useState({
        title: "",
        description: "",
        image: "",
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);


    useEffect(() => {
        const servicesRef = ref(database, "services");
        onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            const array = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
            setServices(array);
        });
    }, []);
    // Silme İşlemi
    const handleDeleteService = (id) => {
        setServiceToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteService = () => {
        const serviceRef = ref(database, `services/${serviceToDelete}`);
        remove(serviceRef).then(() => {
            setShowDeleteConfirm(false);
            setServiceToDelete(null);
        });
    };
    const handleSaveService = () => {
        const serviceKey = editMode ? editServiceId : Date.now().toString();
        const serviceRef = ref(database, `services/${serviceKey}`);

        set(serviceRef, newService).then(() => {
            setIsPopupOpen(false);
            setNewService({ title: "", description: "", image: "" });
            setEditMode(false);
            setEditServiceId(null);
        });
    };

    const handleEditService = (service) => {
        setNewService({ title: service.title, description: service.description, image: service.image });
        setEditServiceId(service.id);
        setEditMode(true);
        setIsPopupOpen(true);
    };

    return (
        <div className="adminServicesMain">
            <AdminSidebar />
            <div className="adminServicesContent">
                <button className="addServiceButton" onClick={() => {
                    setEditMode(false);
                    setIsPopupOpen(true);
                    setNewService({ title: "", description: "", image: "" });
                }}>
                    + Hizmet Ekle
                </button>

                {isPopupOpen && (
                    <div className="servicePopup">
                        <h2>{editMode ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}</h2>
                        <input
                            type="text"
                            placeholder="Hizmet Başlığı"
                            value={newService.title}
                            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Hizmet Açıklaması"
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Görsel Linki"
                            value={newService.image}
                            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                        />
                        <div className="servicePopupActions">
                            <button onClick={handleSaveService}>{editMode ? "Kaydet" : "Ekle"}</button>
                            <button onClick={() => setIsPopupOpen(false)}>İptal</button>
                        </div>
                    </div>
                )}

                <div className="servicesGrid">
                    {services.map((service) => (
                        <div key={service.id} className="serviceCard">
                            <img src={service.image} alt={service.title} className="serviceImage" />
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="serviceCardActions">
                                <button onClick={() => handleEditService(service)}>Düzenle</button>
                                <button onClick={() => handleDeleteService(service.id)}>Sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showDeleteConfirm && (
                <div className="deletePopup">
                    <div className="deletePopupContent">
                        <h3>Hizmeti Sil</h3>
                        <p>Bu hizmeti silmek istediğinize emin misiniz?</p>
                        <div className="deletePopupActions">
                            <button className="cancelButton" onClick={() => setShowDeleteConfirm(false)}>Vazgeç</button>
                            <button className="deleteButton" onClick={confirmDeleteService}>Sil</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}