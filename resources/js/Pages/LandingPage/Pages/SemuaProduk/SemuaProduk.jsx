import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { router } from "@inertiajs/react";
import { FooterLayout, NavbarLayout } from "../../Layouts";

const SemuaProduk = ({ barang_data }) => {
    console.log(barang_data);
    const [isLoading, setIsLoading] = useState(false);
    const handleSearch = (query) => {
        router.get(
            "/semua-produk",
            { key: query },
            {
                preserveState: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            }
        );
    };
    return (
        <div className="w-full py-8">
            <NavbarLayout />
            <div className="max-w-7xl my-4 mx-auto">
                <div className="mx-6">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Cari Produk"
                            className="input input-bordered w-full"
                            name="key"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 mt-4 mx-6">
                    {isLoading ? (
                        <div className="text-center">
                            <ImSpinner8 className="animate-spin text-7xl" />
                        </div>
                    ) : (
                        barang_data.data.map((val, ind) => (
                            <div
                                className="card card-compact w-full lg:w-72 bg-base-100 shadow-xl"
                                key={ind}
                            >
                                <figure>
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${val.foto_barang}`}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {val.nama_barang}
                                    </h2>
                                    <p>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(val.harga)}
                                    </p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline badge-primary">
                                            {val.kategori.nama_kategori_barang}
                                        </div>
                                    </div>
                                    <div className="card-actions justify-center">
                                        <button className="btn w-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <FooterLayout />
        </div>
    );
};

export default SemuaProduk;
