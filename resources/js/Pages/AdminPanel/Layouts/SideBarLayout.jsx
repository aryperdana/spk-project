import { Link } from "@inertiajs/react";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

export const SideBarLayout = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>

            <ul className="menu menu-compact p-4 w-72 bg-base-100 text-base-content">
                <li className="mb-8">
                    <a className="btn btn-ghost normal-case text-xl">
                        NAKTRUNALAHNE !!!
                    </a>
                </li>
                <li>
                    <Link className="active">
                        <AiOutlineHome />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/user">
                        <AiOutlineHome />
                        User
                    </Link>
                </li>
                <li>
                    <Link href="/admin/kategori">
                        <AiOutlineHome />
                        Kategori
                    </Link>
                </li>
                <li>
                    <Link href="/admin/barang">
                        <AiOutlineHome />
                        Barang
                    </Link>
                </li>
            </ul>
        </div>
    );
};
