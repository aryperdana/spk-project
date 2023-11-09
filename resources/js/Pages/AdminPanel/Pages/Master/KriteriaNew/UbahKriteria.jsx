import { Input } from "@/Pages/AdminPanel/Components";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import MainLayout from "../../../Layouts";
import { IoAddOutline } from "react-icons/io5";
import { HiOutlineTrash, HiCheck, HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const FormTableSubKriteria = ({ setData, data }) => {
    const [formTableValue, setFormTableValue] = useState({
        kode: "-",
        nama_sub_kriteria: "",
        priority: "",
        is_header: 2,
    });
    const handleOnChange = (event) => {
        setFormTableValue({
            ...formTableValue,
            [event.target.name]: event.target.value,
        });
    };

    const submitFormTableSubKriteria = () => {
        setData({ ...data, detail: [...data?.detail, formTableValue] });
        setFormTableValue({
            kode: "",
            nama_sub_kriteria: "",
            priority: "",
            is_header: 2,
        });
    };

    return (
        <tr>
            <td>
                <Input
                    type="text"
                    name="nama_sub_kriteria"
                    placeholder="Masukan Sub Kriteria"
                    onChange={handleOnChange}
                    value={formTableValue?.nama_sub_kriteria}
                />
            </td>
            <td colSpan="2">
                <Input
                    type="number"
                    name="priority"
                    placeholder="Masukan Priority"
                    onChange={handleOnChange}
                    value={formTableValue?.priority}
                />
            </td>
            <td className="w-3">
                <div className="form-control items-center">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        name="is_header"
                        checked={formTableValue?.is_header === 1 ? true : false}
                        onChange={() =>
                            setFormTableValue({
                                ...formTableValue,
                                is_header:
                                    formTableValue?.is_header === 1 ? 2 : 1,
                            })
                        }
                    />
                </div>
            </td>
            <td className="text-center">
                <div
                    className="btn btn-primary btn-sm p-0 w-full"
                    onClick={submitFormTableSubKriteria}
                >
                    <IoAddOutline className="text-xl" />
                </div>
            </td>
        </tr>
    );
};

const FormTableSubAtribut = ({ setData, data }) => {
    const [formTableValue, setFormTableValue] = useState({
        kode: "-",
        nama_atribut_kriteria: "",
        priority: "",
        score: "",
    });
    const handleOnChange = (event) => {
        setFormTableValue({
            ...formTableValue,
            [event.target.name]: event.target.value,
        });
    };

    const submitFormTableSubKriteria = () => {
        setData({
            ...data,
            data: {
                ...data?.data,
                sub_atribut:
                    data?.data?.sub_atribut?.length > 0
                        ? [...data?.data?.sub_atribut, formTableValue]
                        : [formTableValue],
            },
        });
        setFormTableValue({
            kode: "",
            nama_atribut_kriteria: "",
            priority: "",
            score: "",
        });
    };

    return (
        <tr>
            <td>
                <Input
                    type="text"
                    name="nama_atribut_kriteria"
                    placeholder="Masukan Atribut Kriteria"
                    onChange={handleOnChange}
                    value={formTableValue?.nama_atribut_kriteria}
                />
            </td>
            <td colSpan="2">
                <Input
                    type="number"
                    name="priority"
                    placeholder="Masukan Priority"
                    onChange={handleOnChange}
                    value={formTableValue?.priority}
                />
            </td>
            <td className="w-3">
                <Input
                    type="text"
                    name="score"
                    placeholder="Masukan Scoring"
                    onChange={handleOnChange}
                    value={formTableValue?.score}
                />
            </td>
            <td className="text-center">
                <div
                    className="btn btn-primary btn-sm p-0 mt-2 w-full"
                    onClick={submitFormTableSubKriteria}
                >
                    <IoAddOutline className="text-xl" />
                </div>
            </td>
        </tr>
    );
};

const UbahKriteria = ({ singleData }) => {
    const [modalConfig, setModalConfig] = useState({
        type: "",
        show: false,
        data: {},
        ind: "",
    });

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        id: singleData?.id,
        kode: singleData?.kode,
        nama_kriteria: singleData?.nama_kriteria,
        priority: singleData?.priority,
        detail: singleData?.sub_kriteria.map((val) => ({
            ...val,
            sub_atribut: val?.atribut_kriteria,
        })),
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("kriteria.update"), {
            onSuccess: () => {
                // setModalConfig({ ...modalConfig, show: false, type: "" });
                // setAlertConfig({
                //     ...alertConfig,
                //     show: true,
                //     type: "success",
                //     text: "Ubah Data Berhasil",
                // });
                reset();
            },
            onError: () => {},
            onFinish: () => {},
        });
    };

    const calculateSum = (arr, priority) => {
        if (priority < 1) {
            return 0;
        }

        return arr.reduce((accumulator, currentNumber) => {
            if (currentNumber?.priority >= priority) {
                return accumulator + 1 / currentNumber?.priority;
            }
            return accumulator;
        }, 0);
    };

    const deleteSubmit = (ind) => {
        const deletedData = data.detail.filter((val, i) => i !== ind);
        setData({ ...data, detail: deletedData });
    };
    const deleteSubAtributSubmit = (ind) => {
        const deletedData = modalConfig?.data?.sub_atribut?.filter(
            (val, i) => i !== ind
        );

        setModalConfig({
            ...modalConfig,
            data: {
                ...modalConfig.data,
                sub_atribut: deletedData,
            },
        });

        setData({
            ...data,
            detail: data?.detail?.map((val, ind) =>
                modalConfig?.ind === ind
                    ? { ...val, sub_atribut: deletedData }
                    : val
            ),
        });
    };

    return (
        <MainLayout title="Kriteria" navbarTitle="Ubah Kriteria">
            <form onSubmit={submit}>
                <div className="flex justify-between mb-3">
                    <div className="font-bold">Ubah Kriteria</div>
                    <Link className="btn btn-outline btn-sm" href="/kriteria">
                        Kembali
                    </Link>
                </div>
                <div className="card w-full bg-base-100 shadow-sm">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-rows-1">
                                <Input
                                    type="text"
                                    label="Kode"
                                    name="kode"
                                    placeholder="Masukan Kriteria"
                                    onChange={handleOnChange}
                                    value={data?.kode}
                                    errorText={errors.kode}
                                />
                                <Input
                                    type="text"
                                    label="Kriteria"
                                    name="nama_kriteria"
                                    placeholder="Masukan Kriteria"
                                    onChange={handleOnChange}
                                    value={data?.nama_kriteria}
                                    errorText={errors.nama_kriteria}
                                />
                                <Input
                                    type="number"
                                    label="Priority"
                                    name="priority"
                                    placeholder="Masukan Priority"
                                    onChange={handleOnChange}
                                    value={data?.priority}
                                    errorText={errors?.priority}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="font-bold mt-4">Ubah Sub Kriteria</div>
                <div className="card w-full bg-base-100 shadow-sm ">
                    <div className="card-body">
                        <div className="overflow-x-auto">
                            <table className="table table-compact table-auto w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-center">
                                            Sub Kriteria
                                        </th>
                                        <th className="text-center">
                                            Priority
                                        </th>
                                        <th className="text-center">Bobot</th>
                                        <th className="text-center">Header</th>
                                        <th className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <FormTableSubKriteria
                                        setData={setData}
                                        data={data}
                                    />
                                    {data?.detail?.length > 0 ? (
                                        data?.detail
                                            ?.sort(
                                                (a, b) =>
                                                    a.priority - b.priority
                                            )
                                            .map((val, ind) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    val?.nama_sub_kriteria
                                                                }
                                                            </td>
                                                            <td>
                                                                {val?.priority}
                                                            </td>
                                                            <td>
                                                                {(1 /
                                                                    data.detail
                                                                        .length) *
                                                                    calculateSum(
                                                                        data.detail,
                                                                        parseFloat(
                                                                            val.priority
                                                                        )
                                                                    )}
                                                            </td>
                                                            <td className="text-center">
                                                                <div>
                                                                    {val?.is_header ===
                                                                    1 ? (
                                                                        <HiCheck className="text-lg" />
                                                                    ) : (
                                                                        <AiOutlineClose className="text-lg" />
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="w-10">
                                                                <div className="btn-group">
                                                                    <div
                                                                        className="btn btn-outline btn-primary btn-sm"
                                                                        onClick={() => {
                                                                            setModalConfig(
                                                                                {
                                                                                    show: true,
                                                                                    data: val,
                                                                                    ind: ind,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        Atribut
                                                                    </div>
                                                                    <div
                                                                        className="btn btn-outline btn-error btn-sm"
                                                                        onClick={() => {
                                                                            deleteSubmit(
                                                                                ind
                                                                            );
                                                                        }}
                                                                    >
                                                                        <HiOutlineTrash />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center font-bold text-xl"
                                            >
                                                Tidak Ada Data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="btn btn-primary btn-sm"
                                disabled={processing}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <input
                type="checkbox"
                className="modal-toggle"
                checked={modalConfig.show}
            />
            <div className="modal">
                <div className="modal-box w-12/12 max-w-7xl">
                    <div className="font-bold mb-3">Ubah Data Sub Atribut</div>
                    <hr />
                    <div className="grid grid-cols-4 gap-3 my-3"></div>
                    <div className="overflow-x-auto">
                        <table className="table table-compact table-auto w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        Sub Atirubut
                                    </th>
                                    <th className="text-center">Priority</th>
                                    <th className="text-center">Bobot</th>
                                    <th className="text-center">Scoring</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <FormTableSubAtribut
                                    setData={setModalConfig}
                                    data={modalConfig}
                                />
                                {modalConfig?.data?.sub_atribut?.length > 0 ? (
                                    modalConfig?.data?.sub_atribut
                                        ?.sort(
                                            (a, b) => a.priority - b.priority
                                        )
                                        ?.map((val, ind) => {
                                            return (
                                                <>
                                                    <tr key={ind}>
                                                        <td>
                                                            {
                                                                val?.nama_atribut_kriteria
                                                            }
                                                        </td>
                                                        <td>{val?.priority}</td>
                                                        <td>
                                                            {(1 /
                                                                modalConfig
                                                                    ?.data
                                                                    ?.sub_atribut
                                                                    ?.length) *
                                                                calculateSum(
                                                                    modalConfig
                                                                        ?.data
                                                                        ?.sub_atribut,
                                                                    parseFloat(
                                                                        val.priority
                                                                    )
                                                                )}
                                                        </td>
                                                        <td>{val?.score}</td>
                                                        <td className="w-10">
                                                            <div className="btn-group">
                                                                <div
                                                                    className="btn btn-outline btn-error btn-sm"
                                                                    onClick={() => {
                                                                        deleteSubAtributSubmit(
                                                                            ind
                                                                        );
                                                                    }}
                                                                >
                                                                    <HiOutlineTrash />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center font-bold text-xl"
                                        >
                                            Tidak Ada Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-middle mt-3">
                        <div className="modal-action">
                            <button
                                className="btn btn-sm"
                                type="reset"
                                onClick={() => {
                                    setModalConfig({
                                        ...modalConfig,
                                        show: false,
                                        type: "",
                                        data: {},
                                        ind: "",
                                    });
                                }}
                            >
                                Tutup
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    setData({
                                        ...data,
                                        detail: data?.detail?.map((val, ind) =>
                                            modalConfig?.ind === ind
                                                ? modalConfig?.data
                                                : val
                                        ),
                                    });
                                    setModalConfig({
                                        ...modalConfig,
                                        show: false,
                                        type: "",
                                        data: {},
                                        ind: "",
                                    });
                                }}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default UbahKriteria;
