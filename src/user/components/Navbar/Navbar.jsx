import React, {useState, useContext, useEffect, useRef} from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import DiamondIcon from "@mui/icons-material/Diamond";
import {AuthContext} from "../ContextApi/AuthContext";
import AccountDropdown from "./AccountDropdown";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useContext(AuthContext);
    const isLoginPage = location.pathname === "/login";
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRefDesktop = useRef(null);
    const dropdownRefMobile = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRefDesktop.current &&
                !dropdownRefDesktop.current.contains(event.target) &&
                dropdownRefMobile.current &&
                !dropdownRefMobile.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isActive = (to) => location.pathname === to;
    const closeMobileMenu = () => setMobileMenuOpen(false);
    const NavLink = ({to, icon: Icon, label, onClick}) => (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
                isActive(to)
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}>
            <Icon fontSize="small"/>
            {label}
        </Link>
    );

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    <button
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label="Toggle navigation menu"
                        className="rounded-full p-2 transition hover:bg-white/10 md:hidden">
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                    <div
                        className="flex cursor-pointer items-center gap-3"
                        onClick={() => navigate("/explore")}>
                        <img className="h-12 w-auto" src="new2.png" alt="Logo"/>
                        <div className="hidden sm:block">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
                                Ganesh Idol
                            </p>
                            <p className="text-sm font-semibold text-white">Booking Portal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => navigate("/cart")}
                            className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                            aria-label="Open cart">
                            <ShoppingCartIcon />
                        </button>
                        {!signIn ? (
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                                <LoginIcon fontSize="small" />
                                Login
                            </Link>
                        ) : (
                            <div ref={dropdownRefMobile} className="relative">
                                <AccountCircleOutlinedIcon
                                    className="cursor-pointer transition hover:text-amber-300"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white text-black shadow-lg">
                                        <AccountDropdown />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="hidden items-center gap-2 md:flex">
                        <NavLink to="/" icon={HomeIcon} label="Home"/>
                        <NavLink to="/about_us" icon={InfoIcon} label="About Us"/>
                        <NavLink to="/contact_us" icon={PhoneIcon} label="Contact"/>
                        <Link
                            to="/custom_form"
                            className="flex items-center gap-2 rounded-full px-4 py-2 text-white/75 transition hover:bg-white/10 hover:text-white">
                            <DiamondIcon className="h-5 w-5"/>
                            Custom Idol
                        </Link>
                        <button
                            onClick={() => navigate("/cart")}
                            className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                            aria-label="Open cart">
                            <ShoppingCartIcon />
                        </button>
                        {!signIn ? (
                            <Link
                                to={isLoginPage ? "/signup" : "/login"}
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-400">
                                {isLoginPage ? (
                                    <>
                                        <HowToRegIcon fontSize="small"/>
                                        Sign Up
                                    </>
                                ) : (
                                    <>
                                        <LoginIcon fontSize="small"/>
                                        Login
                                    </>
                                )}
                            </Link>
                        ) : (
                            <div ref={dropdownRefDesktop} className="relative">
                                <AccountCircleOutlinedIcon
                                    className="cursor-pointer transition hover:text-amber-300"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white text-black shadow-lg">
                                        <AccountDropdown />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="border-t border-white/10 bg-slate-900 px-4 py-4 md:hidden">
                    <div className="space-y-2">
                        <NavLink to="/" icon={HomeIcon} label="Home" onClick={closeMobileMenu}/>
                        <NavLink to="/about_us" icon={InfoIcon} label="About Us" onClick={closeMobileMenu}/>
                        <NavLink to="/contact_us" icon={PhoneIcon} label="Contact" onClick={closeMobileMenu}/>
                        <Link
                            to="/custom_form"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white">
                            <DiamondIcon className="h-5 w-5"/>
                            Custom Idol
                        </Link>
                    </div>
                    {!signIn && (
                        <Link
                            to="/login"
                            onClick={closeMobileMenu}
                            className="mt-4 block rounded-full bg-amber-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-400">
                            <LoginIcon fontSize="small" className="mr-1 inline"/>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
