import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { router, useForm } from "@inertiajs/react";
import { FooterLayout, NavbarLayout } from "../../Layouts";
import { Alert, Input, Textarea } from "@/Pages/AdminPanel/Components";

const SemuaProduk = ({ barang_data, user, keranjang }) => {
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
        data: {},
    });
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        type: "error",
        text: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [qty, setQty] = useState(0);

    const { data, setData, post, put, processing, errors, reset, progress } =
        useForm({
            nama_pemesan: user?.name,
            alamat_pengiriman: "",
            keterangan: "-",
            detail: [],
        });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/pesanan", {
            onSuccess: () => {
                setAlertConfig({
                    ...alertConfig,
                    show: true,
                    type: "success",
                    text: "Barang dipesan",
                });
                setModalConfig({ show: false });
                reset();
            },
            onError: () => {},
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    const handleAddToChart = () => {
        const finalValues = {
            id_barang: modalConfig?.data?.id,
            id_customer: user?.id,
            qty: qty,
        };

        router.post("/admin/keranjang", finalValues, {
            onSuccess: () => {
                setAlertConfig({
                    ...alertConfig,
                    show: true,
                    type: "success",
                    text: "Barang ditambah ke keranjang",
                });
                setModalConfig({ show: false });
                reset();
            },
            onError: () => {},
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

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
            <NavbarLayout
                user={user}
                dataKeranjang={keranjang}
                setAlertConfig={setAlertConfig}
                alertConfig={alertConfig}
            />
            <div className="max-w-7xl my-4 mx-auto">
                <div className="mx-6">
                    {alertConfig.show && (
                        <Alert
                            type={alertConfig.type}
                            text={alertConfig.text}
                        />
                    )}
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
                                    <div className="flex justify-end gap-2">
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline badge-primary">
                                                {
                                                    val.kategori
                                                        .nama_kategori_barang
                                                }
                                            </div>
                                        </div>
                                        {val.diskon > 0 ? (
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-outline badge-error">
                                                    {val.diskon} %
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="card-actions justify-center">
                                        <button
                                            className="btn w-full"
                                            onClick={() => {
                                                setModalConfig({
                                                    show: true,
                                                    data: val,
                                                });
                                                setData({
                                                    ...data,
                                                    detail: [val],
                                                });
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <input
                type="checkbox"
                className="modal-toggle"
                checked={modalConfig.show}
            />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="modal-middle mt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-3">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${modalConfig?.data?.foto_barang}`}
                                />
                                <div>
                                    <div className="text-lg">
                                        <b>{modalConfig?.data?.nama_barang}</b>
                                    </div>
                                    <div className="mb-2">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(modalConfig?.data?.harga)}
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline badge-primary">
                                                {
                                                    modalConfig?.data?.kategori
                                                        ?.nama_kategori_barang
                                                }
                                            </div>
                                        </div>
                                        {modalConfig?.data?.diskon > 0 ? (
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-outline badge-error">
                                                    {modalConfig?.data?.diskon}%
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="flex">
                                        <Input
                                            type="number"
                                            placeholder="Masukan jumlah barang"
                                            onChange={(val) => {
                                                setData({
                                                    ...data,
                                                    detail: data.detail.map(
                                                        (res) => ({
                                                            ...res,
                                                            qty: val.target
                                                                .value,
                                                        })
                                                    ),
                                                });
                                                setQty(val?.target?.value);
                                            }}
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Masukan alamat pengiriman"
                                        name="alamat_pengiriman"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <div
                                    className="btn btn-secondary btn-outline btn-sm"
                                    onClick={() =>
                                        setModalConfig({
                                            ...modalConfig,
                                            show: false,
                                        })
                                    }
                                >
                                    Batal
                                </div>
                                <div
                                    className="btn btn-success btn-outline btn-sm"
                                    onClick={() =>
                                        handleAddToChart(data?.detail)
                                    }
                                >
                                    Tambah Ke Keranjang
                                </div>
                                <button className="btn btn-primary btn-sm">
                                    Check Out
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterLayout />
        </div>
    );
};

export default SemuaProduk;
