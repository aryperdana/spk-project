import React from "react";
import { Link } from "@inertiajs/react";

export const NavbarLayout = ({ title }) => {
    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="flex-none">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-square btn-ghost drawer-button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">{title}</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-6 rounded-full">
                            <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
