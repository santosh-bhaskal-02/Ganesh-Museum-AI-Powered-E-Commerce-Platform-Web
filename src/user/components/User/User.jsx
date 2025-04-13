import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, Outlet, useLocation} from "react-router-dom";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import {Menu, User, Package, MapPin, CircleUserRound} from "lucide-react";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userId = Cookies.get("userId");
    const authToken = Cookies.get("authToken");
    const location = useLocation();

    useEffect(() => {
        if (!userId || !authToken) {
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/users/login/userlist/${userId}`, {
                    headers: {Authorization: `Bearer ${authToken}`},
                });
                if (response.status === 200) {
                    setProfile(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId, authToken]);

    if (!userId || !authToken) {
        return <SignInErrorPage />;
    }

    const isActive = (path) =>
        path === "/profile" ? location.pathname === "/profile" || location.pathname === "/profile/" : location.pathname.startsWith(`/profile/${path}`);

    return (
        <div className="min-h-screen bg-slate-50">
            {loading ? (
                <div className="flex h-screen items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 md:flex-row md:px-6 md:py-6">
                    <aside className="md:sticky md:top-24 md:h-[calc(100vh-7rem)] md:w-80">
                        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:hidden">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">My account</p>
                                    <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen((open) => !open)}
                                    className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100">
                                    <Menu className="h-5 w-5" />
                                </button>
                            </div>

                            <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
                                <div className="border-b border-slate-100 px-5 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                                            <CircleUserRound className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                                                Welcome back
                                            </p>
                                            <h1 className="text-lg font-bold text-slate-900">
                                                {profile.firstName + " " + profile.lastName}
                                            </h1>
                                        </div>
                                    </div>
                                </div>

                                <nav className="space-y-1 p-3">
                                    <SidebarLink
                                        to="/profile"
                                        icon={<User className="h-4 w-4" />}
                                        label="Profile Overview"
                                        active={isActive("")}
                                    />
                                    <SidebarLink
                                        to="/orders"
                                        icon={<Package className="h-4 w-4" />}
                                        label="My Orders"
                                        active={location.pathname === "/orders"}
                                    />
                                    <SidebarLink
                                        to="saved_addresses"
                                        icon={<MapPin className="h-4 w-4" />}
                                        label="Saved Addresses"
                                        active={isActive("saved_addresses")}
                                    />
                                </nav>
                            </div>
                        </div>
                    </aside>

                    <main className="min-w-0 flex-1">
                        <div className="mb-4 rounded-3xl bg-gradient-to-r from-slate-900 to-amber-900 px-6 py-6 text-white shadow-lg">
                            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80">
                                Account area
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">Manage your details without hunting around.</h2>
                            <p className="mt-2 max-w-2xl text-sm text-white/75">
                                Use the left panel for orders, profile info, and saved addresses. The main area
                                updates based on the section you choose.
                            </p>
                        </div>
                        <Outlet context={{profile}} />
                    </main>
                </div>
            )}
        </div>
    );
}

const SidebarLink = ({to, icon, label, active}) => (
    <Link
        to={to}
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
            active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}>
        <span className={active ? "text-amber-300" : "text-slate-400"}>{icon}</span>
        {label}
    </Link>
);

export default UserProfile;
