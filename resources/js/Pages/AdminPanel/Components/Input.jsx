import React from "react";

export const Input = ({
    label,
    onChange,
    placeholder,
    type,
    name,
    value,
    errorText,
}) => {
    return (
        <div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className="input input-sm input-bordered w-full"
                    onChange={onChange}
                    value={value}
                />
                <p className={"text-sm text-red-600 mt-2"}>{errorText}</p>
            </div>
        </div>
    );
};
