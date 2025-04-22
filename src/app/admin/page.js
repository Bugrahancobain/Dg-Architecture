"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import AdminSidebar from "../components/AdminSidebar";
import "./adminHomePage.css";

export default function AdminPage() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                window.location.href = `/login`;
                alert(t("redirecting"));
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return <div>Yükleniyor</div>;
    }

    return (
        <div className="adminHomeMain">
            <div className="adminSideBar">
                <AdminSidebar />
            </div>
            <div>
                <h1>Admin Paneli</h1>
                <p>
                    Hoşgeldin, {user.email}
                </p>
            </div>
        </div>
    );
}