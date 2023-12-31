import { Link } from "@inertiajs/react";
import React from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { CiCalculator2 } from "react-icons/ci";
import { IoServerOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export const SideBarLayout = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>

            <ul className="menu menu-compact p-4 w-72 bg-base-100 text-base-content">
                <li className="mb-8">
                    <a className="btn btn-ghost normal-case text-xl">
                        Decision Support Systems
                    </a>
                </li>
                <li>
                    <Link className="active">
                        <AiOutlineHome />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/user">
                        <AiOutlineUser />
                        User
                    </Link>
                </li>
                <li>
                    <Link href="/alternatif">
                        <IoServerOutline />
                        Alternatif
                    </Link>
                </li>
                <li>
                    <Link href="/kriteria">
                        <IoServerOutline />
                        Kriteria
                    </Link>
                </li>
                {/* <li>
                    <Link href="/sub-kriteria">
                        <IoServerOutline />
                        Sub Kriteria
                    </Link>
                </li>
                <li>
                    <Link href="/atribut-kriteria">
                        <IoServerOutline />
                        Atribut Kriteria
                    </Link>
                </li> */}
                <li>
                    <Link href="/projects">
                        <IoServerOutline />
                        Projects
                    </Link>
                </li>
                <li>
                    <Link href="/perhitungan-smarter">
                        <CiCalculator2 />
                        Perhitungan SMARTER
                    </Link>
                </li>
                <li>
                    <Link href="/laporan-hasil-perhitungan">
                        <HiOutlineClipboardDocumentList />
                        Laporan Hasil Perhitungan
                    </Link>
                </li>
            </ul>
        </div>
    );
};
