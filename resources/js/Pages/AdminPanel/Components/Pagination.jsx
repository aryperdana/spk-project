import React from "react";
import { Link } from "@inertiajs/react";

export const Pagination = ({ next, prev, curr }) => {
    return (
        <div className="btn-group">
            <Link className="btn btn-sm btn-outline" href={prev}>
                «
            </Link>
            <button className="btn btn-sm btn-outline">Page {curr}</button>
            <Link className="btn btn-sm btn-outline" href={next}>
                »
            </Link>
        </div>
    );
};
