import { Link } from "@inertiajs/react";
import React from "react";
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineDatabase,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory, BiUser } from "react-icons/bi";

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
                        <AiOutlineUser />
                        User
                    </Link>
                </li>
                <li>
                    <Link href="/admin/kategori">
                        <BiCategory />
                        Kategori
                    </Link>
                </li>
                <li>
                    <Link href="/admin/barang">
                        <AiOutlineDatabase />
                        Barang
                    </Link>
                </li>
                <li>
                    <Link href="/admin/pesanan">
                        <AiOutlineShoppingCart />
                        Pesanan
                    </Link>
                </li>
            </ul>
        </div>
    );
};
