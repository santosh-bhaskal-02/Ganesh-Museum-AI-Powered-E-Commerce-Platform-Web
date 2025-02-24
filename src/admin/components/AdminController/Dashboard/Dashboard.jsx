import React, {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
} from "chart.js";
import {Pie, Line} from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import ErrorPage from "../../Error/ErrorPage";
import {
    FaUsers,
    FaBoxOpen,
    FaShoppingBag,
    FaShoppingCart,
    FaCoins,
    FaBoxes,
} from "react-icons/fa";

import DashboardCardSkelton from "../../Skeleton/DashboardCardSkeleton";
import DashboardChartSkelton from "../../Skeleton/DashBoardChartSkeleton";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
);

const Dashboard = () => {
    const [idolCount, setIdolCount] = useState(null);
    const [usersCount, setUsersCount] = useState(null);
    const [totalSales, setTotalSales] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);
    const [inventoryCount, setInventoryCount] = useState(null);
    const [totalOrderItems, setTotalOrderItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const authToken = Cookies.get("adminAuthToken");

    if (!authToken) return <ErrorPage />;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${apiUrl}/api/dashboard/fetch`, {
                    headers: {Authorization: `Bearer ${authToken}`},
                });

                setIdolCount(data.productsCount.productsCount);
                setUsersCount(data.usersCount.count);
                setTotalSales(data.totalSales.toFixed(2));
                setTotalOrders(data.totalOrders);
                setInventoryCount(data.inventoryCount);
                setTotalOrderItems(data.totalOrderItems);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const pieData = {
        labels: ["Sold", "Available"],
        datasets: [
            {
                data: [totalOrderItems, inventoryCount],
                backgroundColor: ["#f59e0b", "#fde68a"],
            },
        ],
    };

    const lineData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Sales",
                data: [12, 19, 10, 14, 22],
                backgroundColor: "rgba(251, 191, 36, 0.25)",
                borderColor: "#f59e0b",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-white p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
                                Admin dashboard
                            </p>
                            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                                Everything important in one place.
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                                Start with the overview cards, then jump straight to idols, users, orders,
                                or custom idol requests using the quick actions below.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <QuickAction to="/admin/dashboard/orders" label="Orders" />
                            <QuickAction to="/admin/dashboard/users" label="Users" />
                            <QuickAction to="/admin/dashboard/idols" label="Idols" />
                            <QuickAction to="/admin/dashboard/custom-idol" label="Custom Idol" />
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {loading ? (
                        Array.from({length: 6}).map((_, i) => <DashboardCardSkelton key={i} />)
                    ) : (
                        <>
                            <StatCard
                                icon={<FaBoxes />}
                                title="Total Inventory"
                                value={inventoryCount}
                                hint="Items currently available"
                            />
                            <StatCard
                                icon={<FaBoxOpen />}
                                title="Total Idols"
                                value={idolCount}
                                hint="Idol listings in the store"
                            />
                            <StatCard
                                icon={<FaUsers />}
                                title="Active Users"
                                value={usersCount}
                                hint="Registered customers"
                            />
                            <StatCard
                                icon={<FaShoppingCart />}
                                title="Total Orders"
                                value={totalOrders}
                                hint="Orders placed so far"
                            />
                            <StatCard
                                icon={<FaShoppingBag />}
                                title="Order Items"
                                value={totalOrderItems}
                                hint="Items processed in orders"
                            />
                            <StatCard
                                icon={<FaCoins />}
                                title="Total Sales"
                                value={`₹ ${totalSales}`}
                                hint="Gross revenue collected"
                            />
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {loading ? (
                        <>
                            <DashboardChartSkelton />
                            <DashboardChartSkelton />
                        </>
                    ) : (
                        <>
                            <ChartCard title="Inventory Status" ChartComponent={<Pie data={pieData} />} />
                            <ChartCard title="Sales Trend" ChartComponent={<Line data={lineData} />} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const QuickAction = ({to, label}) => (
    <Link
        to={to}
        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/15">
        {label}
    </Link>
);

const StatCard = ({title, value, icon, hint}) => (
    <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </div>
            <div className="rounded-2xl bg-amber-100 p-3 text-2xl text-amber-700">{icon}</div>
        </div>
        <p className="mt-4 text-sm text-slate-500">{hint}</p>
    </div>
);

const ChartCard = ({title, ChartComponent}) => (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-900">{title}</h3>
        {ChartComponent}
    </div>
);

export default Dashboard;
