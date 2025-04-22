// app/admin/companys/page.js

"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { database } from "../../../../firebase";
import { ref, set, onValue, remove } from "firebase/database";
import "./companys.css";

export default function Page() {
    const [companies, setCompanies] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCompanyId, setEditCompanyId] = useState(null);
    const [companyToDelete, setCompanyToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [newCompany, setNewCompany] = useState({
        name: "",
        website: "https://",
        logo: ""
    });

    useEffect(() => {
        const companiesRef = ref(database, "companies");
        onValue(companiesRef, (snapshot) => {
            const data = snapshot.val();
            const array = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
            setCompanies(array);
        });
    }, []);

    const handleSaveCompany = () => {
        const companyKey = editMode ? editCompanyId : Date.now().toString();
        const companyRef = ref(database, `companies/${companyKey}`);

        set(companyRef, newCompany).then(() => {
            setIsPopupOpen(false);
            setNewCompany({ name: "", website: "https://", logo: "" });
            setEditMode(false);
            setEditCompanyId(null);
        });
    };

    const handleEditCompany = (company) => {
        setNewCompany({ name: company.name, website: company.website, logo: company.logo });
        setEditCompanyId(company.id);
        setEditMode(true);
        setIsPopupOpen(true);
    };

    const handleDeleteCompany = () => {
        const companyRef = ref(database, `companies/${companyToDelete}`);
        remove(companyRef).then(() => {
            setShowDeleteConfirm(false);
            setCompanyToDelete(null);
        });
    };

    return (
        <div className="companyPageMain">
            <AdminSidebar />
            <div className="companyPageContent">
                <button className="companyAddButton" onClick={() => {
                    setEditMode(false);
                    setIsPopupOpen(true);
                    setNewCompany({ name: "", website: "https://", logo: "" });
                }}>+ Çözüm Ortağı Ekle</button>

                {isPopupOpen && (
                    <div className="companyPopup">
                        <h2>{editMode ? "Düzenle" : "Yeni Çözüm Ortağı Ekle"}</h2>
                        <input
                            type="text"
                            placeholder="Firma Adı"
                            value={newCompany.name}
                            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Website Linki"
                            value={newCompany.website}
                            onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Logo Linki"
                            value={newCompany.logo}
                            onChange={(e) => setNewCompany({ ...newCompany, logo: e.target.value })}
                        />

                        <div className="companyPopupActions">
                            <button onClick={handleSaveCompany}>{editMode ? "Kaydet" : "Ekle"}</button>
                            <button onClick={() => setIsPopupOpen(false)}>Vazgeç</button>
                        </div>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="deletePopup">
                        <div className="deletePopupContent">
                            <h3>Firmayı Sil</h3>
                            <p>Bu firmayı silmek istediğinize emin misiniz?</p>
                            <div className="deletePopupActions">
                                <button className="cancelButton" onClick={() => setShowDeleteConfirm(false)}>Vazgeç</button>
                                <button className="deleteButton" onClick={handleDeleteCompany}>Sil</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="companyGrid">
                    {companies.map((company) => (
                        <div className="companyCard" key={company.id}>
                            <img src={company.logo} alt={company.name} className="companyLogo" />
                            <h3>{company.name}</h3>
                            <a href={company.website} target="_blank" rel="noopener noreferrer">Siteye Git</a>
                            <div className="companyCardActions">
                                <button onClick={() => handleEditCompany(company)}>Düzenle</button>
                                <button onClick={() => {
                                    setCompanyToDelete(company.id);
                                    setShowDeleteConfirm(true);
                                }}>Sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
