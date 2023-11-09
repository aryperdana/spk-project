import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import MainLayout from "../../../Layouts";
import {
    TableNilaiStudiKasus,
    TableNilaiTerbobot,
    TableNormalisasiTerbobot,
    TableOutput,
    TableStudiKasus,
} from "./Comps";
import TableNilaiUtility from "./Comps/TableNilaiUtility";
import TableNilaiAkhir from "./Comps/TableNilaiAkhir";

const PerhitunganSmarter = ({
    kriteria_data,
    alternatif_data,
    project_dropdown,
    sub_kriteria_dropdown,
    atribut_kriteria_all,
    sub_kriteria_all,
    id_project,
}) => {
    const [dataAlternatifSelected, setDataAlternatifSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableNilaiStudiKasusConfig, setTableNilaiStudiKasusConfig] =
        useState({ show: false, data: [] });

    const dataBagianBangunanLebihDariSatu = [
        { label: "Atap" },
        { label: "Tengah" },
        { label: "Bawah" },
    ];

    const dataBagianBangunanHanyaSatu = [{ label: "Seluruh Bagian" }];

    const transformDataAlternatif = (data) => {
        const value = data.flatMap((item) => {
            const rowSpan =
                item?.jumlah_jenis_bahan === "Lebih dari Satu" ? 3 : 0;
            return rowSpan > 0
                ? dataBagianBangunanLebihDariSatu?.map((subItem) => ({
                      id_project: item.id,
                      id_alternatif: item?.alternatif?.id,
                      nama_alternatif: item?.alternatif?.nama_alternatif,
                      kategori: item?.alternatif?.kategori,
                      nama_bagian_bangunan: subItem.label,
                      row_span: rowSpan,
                      jumlah_jenis_bahan: item?.jumlah_jenis_bahan,
                  }))
                : dataBagianBangunanHanyaSatu?.map((subItem) => ({
                      id_project: item.id,
                      id_alternatif: item?.alternatif?.id,
                      nama_alternatif: item?.alternatif?.nama_alternatif,
                      kategori: item?.alternatif?.kategori,
                      nama_bagian_bangunan: subItem.label,
                      jumlah_jenis_bahan: item?.jumlah_jenis_bahan,
                      row_span: rowSpan,
                  }));
        });

        return value;
    };

    useEffect(() => {
        if (id_project) {
            const value = project_dropdown.find(
                (res) => res.id === parseInt(id_project)
            );

            setDataAlternatifSelected(value?.detail_alternatif);
        }
        return () => {};
    }, []);

    return (
        <MainLayout title="Perhitungan" navbarTitle="Perhitungan">
            <div className="card w-full bg-base-100 shadow-sm">
                <div className="card-body">
                    <div className="flex justify-between mb-3">
                        <div className="form-control w-full max-w-xs">
                            <select
                                className="select select-sm select-bordered py-0"
                                name="id_alternatif"
                                onChange={(val) => {
                                    const value = project_dropdown.find(
                                        (res) =>
                                            res.id ===
                                            parseInt(val.target.value)
                                    );

                                    setDataAlternatifSelected(
                                        value?.detail_alternatif
                                    );
                                }}
                            >
                                <option>Pilih Salah Satu</option>
                                {project_dropdown.map((val) => (
                                    <option
                                        value={val.id}
                                        selected={
                                            val.id === parseInt(id_project)
                                                ? true
                                                : false
                                        }
                                    >
                                        {val.nama_project}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {dataAlternatifSelected.length > 0 && (
                        <TableStudiKasus
                            dataAlternatif={transformDataAlternatif(
                                dataAlternatifSelected
                            )}
                            dataKriteria={kriteria_data}
                            setTableNilaiStudiKasusConfig={
                                setTableNilaiStudiKasusConfig
                            }
                            tableNilaiStudiKasusConfig={
                                tableNilaiStudiKasusConfig
                            }
                            subKriteriaDropdown={sub_kriteria_dropdown}
                        />
                    )}

                    <hr />

                    {tableNilaiStudiKasusConfig.show &&
                        tableNilaiStudiKasusConfig?.data?.length > 0 && (
                            <>
                                <TableNilaiStudiKasus
                                    dataAlternatif={transformDataAlternatif(
                                        dataAlternatifSelected
                                    )}
                                    dataKriteria={kriteria_data}
                                    subKriteriaDropdown={sub_kriteria_dropdown}
                                    hasilTableStudiKasus={
                                        tableNilaiStudiKasusConfig.data
                                    }
                                    atributKriteria={atribut_kriteria_all}
                                />

                                <hr />
                                <TableNilaiTerbobot
                                    dataAlternatif={transformDataAlternatif(
                                        dataAlternatifSelected
                                    )}
                                    dataKriteria={kriteria_data}
                                    subKriteriaDropdown={sub_kriteria_dropdown}
                                    subKriteriaAll={sub_kriteria_all}
                                    hasilTableStudiKasus={
                                        tableNilaiStudiKasusConfig.data
                                    }
                                    atributKriteria={atribut_kriteria_all}
                                />

                                <hr />
                                <TableNormalisasiTerbobot
                                    dataAlternatif={transformDataAlternatif(
                                        dataAlternatifSelected
                                    )}
                                    dataKriteria={kriteria_data}
                                    subKriteriaDropdown={sub_kriteria_dropdown}
                                    subKriteriaAll={sub_kriteria_all}
                                    hasilTableStudiKasus={
                                        tableNilaiStudiKasusConfig.data
                                    }
                                    atributKriteria={atribut_kriteria_all}
                                />

                                <hr />
                                <TableNilaiUtility
                                    dataAlternatif={transformDataAlternatif(
                                        dataAlternatifSelected
                                    )}
                                    dataKriteria={kriteria_data}
                                    subKriteriaDropdown={sub_kriteria_dropdown}
                                    subKriteriaAll={sub_kriteria_all}
                                    hasilTableStudiKasus={
                                        tableNilaiStudiKasusConfig.data
                                    }
                                    atributKriteria={atribut_kriteria_all}
                                />

                                <hr />
                                <TableNilaiAkhir
                                    dataAlternatif={transformDataAlternatif(
                                        dataAlternatifSelected
                                    )}
                                    dataKriteria={kriteria_data}
                                    subKriteriaDropdown={sub_kriteria_dropdown}
                                    subKriteriaAll={sub_kriteria_all}
                                    hasilTableStudiKasus={
                                        tableNilaiStudiKasusConfig.data
                                    }
                                    atributKriteria={atribut_kriteria_all}
                                />

                                <hr />
                                <TableOutput
                                    dataAlternatif={transformDataAlternatif(
                                        dataAlternatifSelected
                                    )}
                                    dataKriteria={kriteria_data}
                                    subKriteriaDropdown={sub_kriteria_dropdown}
                                    subKriteriaAll={sub_kriteria_all}
                                    hasilTableStudiKasus={
                                        tableNilaiStudiKasusConfig.data
                                    }
                                    atributKriteria={atribut_kriteria_all}
                                />
                                <div className="flex justify-end gap-2 mt-3">
                                    <div
                                        className="btn btn-warning btn-sm"
                                        onClick={() => window.location.reload()}
                                    >
                                        Hitung Ulang
                                    </div>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </MainLayout>
    );
};

export default PerhitunganSmarter;
