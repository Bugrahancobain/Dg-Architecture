// --- REFERANS EKLEME SAYFASI ---

"use client";
import withAuth from "../../components/withAuth";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { database } from "../../../../firebase";
import { ref, set, onValue, remove, push } from "firebase/database";
import "./adminReferences.css";

function Page() {
    const [references, setReferences] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isTagPopupOpen, setTagPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editReferenceId, setEditReferenceId] = useState(null);
    const [referenceToDelete, setReferenceToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [newTagName, setNewTagName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [tagToDelete, setTagToDelete] = useState(null);
    const [showTagDeleteConfirm, setShowTagDeleteConfirm] = useState(false);

    const [newReference, setNewReference] = useState({
        location: "",
        purpose: "",
        year: "",
        area: "",
        blocks: "",
        status: "Devam Ediyor",
        description: "",
        website: "https://",
        youtube: "",
        coverImage: "",
        images: [""],
        tags: [],
    });

    useEffect(() => {
        const referencesRef = ref(database, "references");
        const tagsRef = ref(database, "tags");

        onValue(referencesRef, (snapshot) => {
            const data = snapshot.val();
            const referencesArray = data
                ? Object.entries(data).map(([id, reference]) => ({ id, ...reference }))
                : [];
            setReferences(referencesArray);
        });

        onValue(tagsRef, (snapshot) => {
            const tagData = snapshot.val();
            const tagArray = tagData ? Object.entries(tagData).map(([id, value]) => ({ id, name: value })) : [];
            setTagList(tagArray);
        });
    }, []);

    const handleAddTag = () => {
        if (newTagName.trim()) {
            const tagsRef = ref(database, "tags");
            push(tagsRef, newTagName.trim());
            setNewTagName("");
        }
    };


    const handleRequestDeleteTag = (tagId) => {
        setTagToDelete(tagId);
        setShowTagDeleteConfirm(true);
    };

    const confirmDeleteTag = () => {
        const tagRef = ref(database, `tags/${tagToDelete}`);
        remove(tagRef);
        setTagToDelete(null);
        setShowTagDeleteConfirm(false);
    };
    const handleAddReference = () => {
        const newReferenceKey = editMode ? editReferenceId : Date.now().toString();
        const referencesRef = ref(database, `references/${newReferenceKey}`);
        const currentDate = new Date().toISOString();
        const referenceToSave = {
            ...newReference,
            dateAdded: editMode ? newReference.dateAdded : currentDate
        };

        set(referencesRef, referenceToSave)
            .then(() => {
                setPopupOpen(false);
                setNewReference({
                    location: "",
                    purpose: "",
                    year: "",
                    area: "",
                    blocks: "",
                    status: "Devam Ediyor",
                    description: "",
                    website: "https://",
                    youtube: "",
                    coverImage: "",
                    images: [""],
                    tags: [],
                });
                setEditMode(false);
                setEditReferenceId(null);
            })
            .catch((error) => {
                console.error("Referans eklenirken hata oluştu:", error);
            });
    };

    const handleEditReference = (refData) => {
        setNewReference({ ...refData });
        setEditMode(true);
        setEditReferenceId(refData.id);
        setPopupOpen(true);
    };

    const handleDeleteReference = () => {
        const referencesRef = ref(database, `references/${referenceToDelete}`);
        remove(referencesRef)
            .then(() => {
                setShowDeleteConfirm(false);
                setReferenceToDelete(null);
            })
            .catch((error) => {
                console.error("Referans silinirken hata oluştu:", error);
            });
    };

    const filteredReferences = references.filter((ref) => {
        const query = searchQuery.toLowerCase();
        const matchesLocation = ref.location?.toLowerCase().includes(query);
        const matchesTags = ref.tags?.some((tag) => tag.toLowerCase().includes(query));
        return matchesLocation || matchesTags;
    });

    return (
        <div className="adminReferencesMain">
            <AdminSidebar />
            <div className="adminReferencesContent">
                <div className="referenceTopBar">
                    <input
                        type="text"
                        placeholder="Proje adı veya etiket ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="searchInput"
                    />
                    <button onClick={() => setTagPopupOpen(true)}>+ Etiket Ekle</button>
                </div>
                <button
                    className="adminReferencesAddButton"
                    onClick={() => {
                        setEditMode(false);
                        setPopupOpen(true);
                        setNewReference({
                            location: "",
                            purpose: "",
                            year: "",
                            area: "",
                            blocks: "",
                            status: "Devam Ediyor",
                            description: "",
                            website: "https://",
                            youtube: "",
                            coverImage: "",
                            images: [""],
                            tags: [],
                        });
                    }}
                >
                    + Referans Ekle
                </button>

                {isTagPopupOpen && (
                    <div className="adminReferencesPopup tagPopup">
                        <h2>Etiket Ekle</h2>
                        <input
                            type="text"
                            placeholder="Yeni etiket"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                        />
                        <button onClick={handleAddTag}>Ekle</button>
                        <div className="tagList">
                            {tagList.map((tag) => (
                                <div key={tag.id} className="tagItem">
                                    {tag.name}
                                    <button onClick={() => handleRequestDeleteTag(tag.id)}>Sil</button>
                                </div>
                            ))}

                        </div>
                        <button style={{ backgroundColor: "red" }} onClick={() => setTagPopupOpen(false)}>Kapat</button>
                    </div>
                )}
                {/* Etiketi olmayan veya silinmiş etiketli referanslar */}
                {filteredReferences
                    .filter((ref) => !ref.tags || !ref.tags.some(tag => tagList.some(t => t.name === tag)))
                    .length > 0 && (
                        <>
                            <h3>Etiketsiz / Silinmiş Etiketli Projeler</h3>
                            <div className="adminReferencesGrid">
                                {filteredReferences
                                    .filter((ref) => !ref.tags || !ref.tags.some(tag => tagList.some(t => t.name === tag)))
                                    .map((reference) => (
                                        <div key={reference.id} className="adminReferencesCard">
                                            {(reference.coverImage || reference.images[0]) ? (
                                                <img src={reference.coverImage || reference.images[0]} alt="Kapak" />
                                            ) : (
                                                <div className="placeholderImage">📷 Kapak Yok</div>
                                            )}
                                            <h3>{reference.location}</h3>
                                            <p>{reference.purpose}</p>
                                            <p>{reference.status}</p>
                                            <p>{reference.year}</p>
                                            <div className="adminReferencesCardActions">
                                                <button onClick={() => handleEditReference(reference)}>Düzenle</button>
                                                <button onClick={() => {
                                                    setReferenceToDelete(reference.id);
                                                    setShowDeleteConfirm(true);
                                                }}>Sil</button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                {isPopupOpen && (
                    <div className="adminReferencesPopup">
                        <h2>{editMode ? "Referansı Düzenle" : "Yeni Referans Ekle"}</h2>
                        <input type="text" placeholder="Proje İsmi" value={newReference.location} onChange={(e) => setNewReference({ ...newReference, location: e.target.value })} />
                        <input type="text" placeholder="Konum" value={newReference.purpose} onChange={(e) => setNewReference({ ...newReference, purpose: e.target.value })} />
                        <input type="text" placeholder="Yıl" value={newReference.year} onChange={(e) => setNewReference({ ...newReference, year: e.target.value })} />
                        <input type="text" placeholder="İnşaat Alanı" value={newReference.area} onChange={(e) => setNewReference({ ...newReference, area: e.target.value })} />
                        <input type="text" placeholder="Blok Adedi" value={newReference.blocks} onChange={(e) => setNewReference({ ...newReference, blocks: e.target.value })} />
                        <select value={newReference.status} onChange={(e) => setNewReference({ ...newReference, status: e.target.value })}>
                            <option value="Devam Ediyor">Devam Ediyor</option>
                            <option value="Hazır">Hazır</option>
                        </select>
                        <div className="tagCheckboxList">
                            <p>Etiketler:</p>
                            {tagList.map((tag) => (
                                <label key={tag.id}>
                                    <input
                                        type="checkbox"
                                        checked={Array.isArray(newReference.tags) && newReference.tags.includes(tag.name)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setNewReference({ ...newReference, tags: [...newReference.tags, tag.name] });
                                            } else {
                                                setNewReference({
                                                    ...newReference,
                                                    tags: newReference.tags.filter((t) => t !== tag.name),
                                                });
                                            }
                                        }}
                                    />
                                    {tag.name}
                                </label>
                            ))}
                        </div>
                        <textarea placeholder="Proje Açıklaması" value={newReference.description} onChange={(e) => setNewReference({ ...newReference, description: e.target.value })} />
                        <input type="text" placeholder="Projenin Resmi Sitesi" value={newReference.website} onChange={(e) => setNewReference({ ...newReference, website: e.target.value })} />
                        <input type="text" placeholder="YouTube Video Linki" value={newReference.youtube} onChange={(e) => setNewReference({ ...newReference, youtube: e.target.value })} />
                        <input type="text" placeholder="Kapak Fotoğrafı Linki" value={newReference.coverImage} onChange={(e) => setNewReference({ ...newReference, coverImage: e.target.value })} />
                        {newReference.images.map((img, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Fotoğraf ${index + 1}`}
                                value={img}
                                onChange={(e) => {
                                    const updated = [...newReference.images];
                                    updated[index] = e.target.value;
                                    setNewReference({ ...newReference, images: updated });
                                }}
                            />
                        ))}
                        <button className="addImageButton" onClick={() => {
                            const lastImage = newReference.images.at(-1);
                            if (lastImage && lastImage.trim() !== "") {
                                setNewReference({ ...newReference, images: [...newReference.images, ""] });
                            }
                        }}>+ Fotoğraf Ekle</button>
                        <div className="adminReferencesPopupActions">
                            <button onClick={handleAddReference}>{editMode ? "Kaydet" : "Ekle"}</button>
                            <button onClick={() => setPopupOpen(false)}>Çık</button>
                        </div>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="deletePopup">
                        <div className="deletePopupContent">
                            <h3>Emin misiniz?</h3>
                            <p>Bu referansı silmek istediğinizden emin misiniz?</p>
                            <div className="deletePopupActions">
                                <button className="cancelButton" onClick={() => setShowDeleteConfirm(false)}>Vazgeç</button>
                                <button className="deleteButton" onClick={handleDeleteReference}>Sil</button>
                            </div>
                        </div>
                    </div>
                )}

                {tagList.map((tag) => {
                    const tagReferences = filteredReferences.filter((ref) =>
                        ref.tags?.includes(tag.name)
                    );

                    if (tagReferences.length === 0) return null; // Etikete ait proje yoksa hiç render etme

                    return (
                        <div key={tag.id}>
                            <h3 style={{ borderTop: "1px solid black", padding: "30px", margin: "50px" }}>{tag.name}</h3>
                            <div className="adminReferencesGrid">
                                {tagReferences.map((reference) => (
                                    <div key={reference.id} className="adminReferencesCard">
                                        {(reference.coverImage || reference.images[0]) ? (
                                            <img src={reference.coverImage || reference.images[0]} alt="Kapak" />
                                        ) : (
                                            <div className="placeholderImage">📷 Kapak Yok</div>
                                        )}
                                        <h3>{reference.location}</h3>
                                        <p>{reference.purpose}</p>
                                        <p>{reference.year}</p>
                                        <p>&quot;{reference.status}&quot;</p>
                                        <div className="adminReferencesCardActions">
                                            <button onClick={() => handleEditReference(reference)}>Düzenle</button>
                                            <button onClick={() => {
                                                setReferenceToDelete(reference.id);
                                                setShowDeleteConfirm(true);
                                            }}>Sil</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {showTagDeleteConfirm && (
                <div className="deletePopup">
                    <div className="deletePopupContent">
                        <h3>Etiketi Sil</h3>
                        <p>Bu etiketi silmek istediğinizden emin misiniz?</p>
                        <div className="deletePopupActions">
                            <button className="cancelButton" onClick={() => setShowTagDeleteConfirm(false)}>Vazgeç</button>
                            <button className="deleteButton" onClick={confirmDeleteTag}>Sil</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(Page);