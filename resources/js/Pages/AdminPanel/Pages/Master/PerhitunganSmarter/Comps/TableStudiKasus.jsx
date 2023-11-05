import React, { useState } from "react";
import { Input } from "@/Pages/AdminPanel/Components";

const TableStudiKasus = ({
    dataAlternatif,
    dataKriteria,
    subKriteriaDropdown,
    setTableNilaiStudiKasusConfig,
    tableNilaiStudiKasusConfig,
}) => {
    const transformedAtributArray = subKriteriaDropdown.flatMap((item) => {
        if (item.atribut_kriteria && item.atribut_kriteria.length > 0) {
            return item.atribut_kriteria.map((atribut) => ({
                id: item.id,
                id_kriteria: item.id_kriteria,
                nama_sub_kriteria: item.nama_sub_kriteria,
                kode: item.kode,
                priority: item.priority,
                created_at: item.created_at,
                updated_at: item.updated_at,
                is_header: item.is_header,
                id_atribut_kriteria: atribut.id,
                nama_atribut_kriteria: atribut.nama_atribut_kriteria,
                kode_atribut_kriteria: atribut.kode,
                priority_atribut_kriteria: atribut.priority,
                score: atribut.score,
                atribut_kriteria: item?.atribut_kriteria,
                sub_kriteria: item?.sub_kriteria,
            }));
        } else {
            return item;
        }
    });

    const [dataTransformed, setDataTransformed] = useState(
        dataAlternatif.map((val) => ({
            ...val,
            kriteria: dataKriteria.flatMap((item) => {
                if (
                    item.sub_kriteria.filter((val) => val.is_header === 1)
                        .length > 0
                ) {
                    return item.sub_kriteria.map((subItem) => ({
                        id: item.id,
                        nama_kriteria: item.nama_kriteria,
                        kode: item.kode,
                        priority: item.priority,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        id_sub_kriteria: subItem.id,
                        nama_sub_kriteria: subItem.nama_sub_kriteria,
                        kode_sub_kriteria: subItem.kode,
                        priority_sub_kriteria: subItem.priority,
                        is_header: subItem.is_header,
                        atribut_kriteria: item?.atribut_kriteria,
                        sub_kriteria: item?.sub_kriteria,
                    }));
                } else {
                    return item;
                }
            }),
        }))
    );
    const kriteriaHeaders = dataKriteria.map((kriteria) => {
        const colspan = kriteria.sub_kriteria.filter(
            (val) => val.is_header === 1
        ).length;
        const rowspan = colspan === 0 ? 2 : 1;
        return (
            <th
                className="text-center"
                key={kriteria.id}
                colSpan={colspan}
                rowSpan={rowspan}
            >
                {kriteria.nama_kriteria}
            </th>
        );
    });

    const subKriteriaHeaders = dataKriteria.reduce((result, kriteria) => {
        const subKriteriaCells = kriteria.sub_kriteria
            .filter((val) => val.is_header === 1)
            .map((subKriteria) => (
                <th className="text-center" key={subKriteria.id}>
                    {subKriteria.nama_sub_kriteria} (%)
                </th>
            ));
        return result.concat(subKriteriaCells);
    }, []);

    const alternatifRows = dataTransformed.map((alternatif, i) => {
        const calInd = parseInt(i - 1);
        return (
            <tr key={alternatif.id}>
                <td>
                    {alternatif.nama_alternatif ===
                        dataTransformed[calInd]?.nama_alternatif && i > 0
                        ? "-"
                        : alternatif?.nama_alternatif}
                </td>
                <td>
                    {alternatif.nama_alternatif ===
                        dataTransformed[calInd]?.nama_alternatif && i > 0
                        ? "-"
                        : alternatif.kategori}
                </td>
                <td></td>
                <td>{alternatif.nama_bagian_bangunan}</td>
                {alternatif?.kriteria?.map((val, ind) =>
                    val?.id === 6 ? (
                        <td>
                            <div className="form-control w-full">
                                <select
                                    className="select select-sm select-bordered py-0"
                                    name="id_alternatif"
                                    onChange={(val) => {
                                        setDataTransformed([
                                            ...dataTransformed.map(
                                                (item, index) =>
                                                    index === i
                                                        ? {
                                                              ...item,
                                                              kriteria:
                                                                  item?.kriteria?.map(
                                                                      (
                                                                          res,
                                                                          idx
                                                                      ) =>
                                                                          idx ===
                                                                          ind
                                                                              ? {
                                                                                    ...res,
                                                                                    value: val
                                                                                        .target
                                                                                        .value,
                                                                                }
                                                                              : res
                                                                  ),
                                                          }
                                                        : item
                                            ),
                                        ]);
                                    }}
                                    // defaultValue={data.id}
                                >
                                    <option>Pilih Salah Satu</option>
                                    {transformedAtributArray?.map((val) => (
                                        <option
                                            value={
                                                val.nama_atribut_kriteria ??
                                                val.nama_sub_kriteria
                                            }
                                        >
                                            {val.nama_atribut_kriteria ??
                                                val.nama_sub_kriteria}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </td>
                    ) : (
                        <td>
                            <Input
                                type="number"
                                name={val?.id_sub_kriteria ?? val?.id_kriteria}
                                onChange={(e) => {
                                    setDataTransformed([
                                        ...dataTransformed.map((item, index) =>
                                            index === i
                                                ? {
                                                      ...item,
                                                      kriteria:
                                                          item?.kriteria?.map(
                                                              (res, idx) =>
                                                                  idx === ind
                                                                      ? {
                                                                            ...res,
                                                                            value: parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                        }
                                                                      : res
                                                          ),
                                                  }
                                                : item
                                        ),
                                    ]);
                                }}
                                // value={data?.kode}
                                // errorText={errors.kode}
                            />
                        </td>
                    )
                )}
            </tr>
        );
    });

    return (
        <>
            <div className="overflow-x-auto">
                <div className="font-bold text-center">TABEL STUDI KASUS</div>
                <table className="table table-compact table-auto w-full">
                    <thead>
                        <tr>
                            <th className="text-center" rowSpan="2">
                                Alternatif
                            </th>
                            <th className="text-center" rowSpan="2">
                                Kategori
                            </th>
                            <th className="text-center" rowSpan="2">
                                Jumlah Jenis Bahan
                            </th>
                            <th className="text-center" rowSpan="2">
                                Bagian Bangunan
                            </th>
                            {kriteriaHeaders}
                        </tr>
                        <tr>{subKriteriaHeaders}</tr>
                    </thead>
                    <tbody>{alternatifRows}</tbody>
                </table>
            </div>
            <div>
                <button
                    className="btn btn-primary btn-sm my-4"
                    onClick={() =>
                        setTableNilaiStudiKasusConfig({
                            ...tableNilaiStudiKasusConfig,
                            show: true,
                            data: dataTransformed,
                        })
                    }
                >
                    Proses Table Studi Kasus
                </button>
            </div>
        </>
    );
};

export default TableStudiKasus;
