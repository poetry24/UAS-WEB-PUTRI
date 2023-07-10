import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link href="/" className="navbar-link">
                        Home
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link href="/FormKaryawan" className="navbar-link">
                        Input Cuti
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link href="/card" className="navbar-link">
                        Card Cuti
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link href="/about" className="navbar-link">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
