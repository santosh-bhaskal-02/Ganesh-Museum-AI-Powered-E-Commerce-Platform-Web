import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {Menu, X} from "lucide-react";
import {AuthContext} from "../Context/AuthContext";
import AccountDropdown from "./AccountDropdown";
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Login as LoginIcon,
    HowToReg as HowToRegIcon,
    AccountCircleOutlined as AccountIcon,
    Inventory2Outlined as InventoryIcon,
    PeopleAltOutlined as UsersIcon,
} from "@mui/icons-material";

const Navbar = () => {
    const {signIn, setSignIn} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRefDesktop = useRef(null);
    const dropdownRefMobile = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === "/admin/login";

    const handleLogout = () => {
        Cookies.remove("adminAuthToken");
        Cookies.remove("adminId");
        setSignIn(false);
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRefDesktop.current &&
                !dropdownRefDesktop.current.contains(e.target) &&
                dropdownRefMobile.current &&
                !dropdownRefMobile.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const NavLink = ({to, icon: Icon, label, onClick}) => (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
                location.pathname === to
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}>
            <Icon fontSize="small" />
            {label}
        </Link>
    );

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    <div className="flex cursor-pointer items-center gap-3" onClick={() => navigate("/admin")}>
                        <img className="h-12 w-auto" src="Ganesh-logo.png" alt="Logo" />
                        <div className="hidden sm:block">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">Admin</p>
                            <p className="text-sm font-semibold text-white">Control Center</p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-2 md:flex">
                        <NavLink to="/admin" icon={HomeIcon} label="Home" />
                        <NavLink to="/admin/dashboard" icon={DashboardIcon} label="Dashboard" />
                        <NavLink to="/admin/dashboard/idols" icon={InventoryIcon} label="Idols" />
                        <NavLink to="/admin/dashboard/users" icon={UsersIcon} label="Users" />

                        {!signIn ? (
                            <Link
                                to={isLoginPage ? "/admin/signup" : "/admin/login"}
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-400">
                                {isLoginPage ? (
                                    <>
                                        <HowToRegIcon fontSize="small" />
                                        Sign Up
                                    </>
                                ) : (
                                    <>
                                        <LoginIcon fontSize="small" />
                                        Login
                                    </>
                                )}
                            </Link>
                        ) : (
                            <div ref={dropdownRefDesktop} className="relative">
                                <AccountIcon
                                    onClick={() => setDropdownOpen((open) => !open)}
                                    className="cursor-pointer transition hover:text-amber-300"
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white text-black shadow-lg">
                                        <AccountDropdown onLogout={handleLogout} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        {!signIn ? (
                            <Link
                                to="/admin/login"
                                className="inline-flex items-center rounded-full bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                                <LoginIcon fontSize="small" className="mr-1" />
                                Login
                            </Link>
                        ) : (
                            <div ref={dropdownRefMobile} className="relative">
                                <AccountIcon
                                    onClick={() => setDropdownOpen((open) => !open)}
                                    className="cursor-pointer transition hover:text-amber-300"
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white text-black shadow-lg">
                                        <AccountDropdown onLogout={handleLogout} />
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            onClick={() => setIsOpen((open) => !open)}
                            aria-label="Toggle admin menu"
                            className="rounded-full p-2 transition hover:bg-white/10">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="space-y-2 border-t border-white/10 bg-slate-900 px-4 py-4 md:hidden">
                        <NavLink to="/admin" icon={HomeIcon} label="Home" onClick={() => setIsOpen(false)} />
                        <NavLink
                            to="/admin/dashboard"
                            icon={DashboardIcon}
                            label="Dashboard"
                            onClick={() => setIsOpen(false)}
                        />
                        <NavLink
                            to="/admin/dashboard/idols"
                            icon={InventoryIcon}
                            label="Idols"
                            onClick={() => setIsOpen(false)}
                        />
                        <NavLink
                            to="/admin/dashboard/users"
                            icon={UsersIcon}
                            label="Users"
                            onClick={() => setIsOpen(false)}
                        />
                        {!signIn && (
                            <Link
                                to="/admin/login"
                                onClick={() => setIsOpen(false)}
                                className="mt-3 block rounded-full bg-amber-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-400">
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
