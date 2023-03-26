import React from "react";
import { Head } from "@inertiajs/react";
import { FooterLayout, NavbarLayout, SideBarLayout } from "../Layouts";

export default function MainLayout({ children, title, navbarTitle }) {
    return (
        <>
            <Head title={title} />
            <div className="drawer">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Content */}
                    <div className="bg-gray-100 min-h-screen flex flex-col">
                        {/* Navbar */}
                        <NavbarLayout title={navbarTitle} />

                        {/* Main Content */}
                        <main className="p-4 grow">{children}</main>

                        {/* Footer */}
                        <FooterLayout />
                    </div>
                </div>
                <SideBarLayout />
            </div>
        </>
    );
}
