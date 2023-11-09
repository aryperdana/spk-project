import React, { useState } from "react";
import { Input } from "@/Pages/AdminPanel/Components";

const TableNilaiStudiKasus = ({
    dataKriteria,
    setTableNilaiStudiKasusConfig,
    tableNilaiStudiKasusConfig,
    hasilTableStudiKasus,
    atributKriteria,
}) => {
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

    const checkScoreAtributKriteria = (data) => {
        const getAtributById = atributKriteria.filter((val) =>
            data?.id_sub_kriteria
                ? val.id_sub_kriteria === data.id_sub_kriteria
                : val.id_kriteria === data.id
        );

        const scoreMatchesCondition = (item, value) => {
            const range = item?.score?.split(" – ");

            if (range.length === 2 && value !== 0) {
                const lower = parseInt(range[0]);
                const upper = parseInt(range[1]);
                return value >= lower && value <= upper;
            } else if (item?.score?.startsWith(">") && value !== 0) {
                const threshold = parseInt(item?.score?.substring(1));
                return value > threshold;
            } else if (item?.score?.startsWith("<") && value !== 0) {
                const threshold = parseInt(item?.score?.substring(1));
                return value < threshold;
            } else if (value === 0) {
                return parseInt(item?.score) === value;
            }

            return item;
        };

        const filteredData = getAtributById.find((item) =>
            scoreMatchesCondition(item, parseInt(data?.value))
        );

        return data?.atribut_kriteria?.length === 0 &&
            data?.sub_kriteria?.length === 0
            ? data?.value
            : typeof data?.value === "string"
            ? data?.value
            : filteredData?.nama_atribut_kriteria ?? "-";
    };

    const alternatifRows = hasilTableStudiKasus.map((alternatif, i) => {
        const calInd = parseInt(i - 1);
        return (
            <tr key={alternatif.id}>
                <td>
                    {alternatif.nama_alternatif ===
                        hasilTableStudiKasus[calInd]?.nama_alternatif && i > 0
                        ? "-"
                        : alternatif?.nama_alternatif}
                </td>
                <td>
                    {alternatif.nama_alternatif ===
                        hasilTableStudiKasus[calInd]?.nama_alternatif && i > 0
                        ? "-"
                        : alternatif.kategori}
                </td>

                <td>{alternatif.jumlah_jenis_bahan}</td>
                <td>{alternatif.nama_bagian_bangunan}</td>

                {alternatif?.kriteria?.map((val, ind) => (
                    <td>{checkScoreAtributKriteria(val)}</td>
                ))}
            </tr>
        );
    });

    return (
        <>
            <div className="overflow-x-auto">
                <div className="font-bold text-center">
                    TABEL NILAI STUDI KASUS
                </div>
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
        </>
    );
};

export default TableNilaiStudiKasus;
