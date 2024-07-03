import React, { ReactNode } from 'react';

function Header({ children }: { children: ReactNode }) {
    return (
        <div className="w-full navbar bg-gray-100 p-2 px-4 shadow-2xl justify-between">
            <a className="text-2xl text-black" href={'/'}>
                Pixel<span className="font-extrabold text-cyan-500 ml-1">Hunter</span>
            </a>
            {children}
        </div>
    )
}

export default Header