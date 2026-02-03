"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, Wallet, Users, LogOut, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Pedidos PIX", icon: ShoppingBag },
    { href: "/admin/withdrawals", label: "Saques", icon: Wallet },
    { href: "/admin/sellers", label: "Parceiros", icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Check if logged in
        const isAdmin = localStorage.getItem("admin_logged_in")
        if (!isAdmin && pathname !== "/admin/login") {
            router.push("/admin/login")
        }
    }, [router, pathname])

    const handleLogout = () => {
        localStorage.removeItem("admin_logged_in")
        router.push("/admin/login")
    }

    // Don't show layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 p-4 flex flex-col">
                <div className="flex items-center gap-2 px-2 mb-8">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                        <h1 className="font-bold text-lg">ZelloPartners</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Painel Admin</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="border-t border-slate-200 dark:border-zinc-800 pt-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sair
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    )
}
