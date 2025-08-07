import React from "react";

interface InPutProps{
    label:string;
    name: string;
    value:string;
    type?:string;
    placeholder?:string;
    error?:string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=> void;
    className?:string;
}

const InPut: React.FC<InPutProps> =({
    label,
    name,
    value,
    type= 'text',
    placeholder,
    error,
    onChange,
    className=''
})=>{
    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange} 
                aria-invalid={!!error}
                className="block w-full px-3 py-2 mt-2 mb-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm"
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
}
    
export default InPut