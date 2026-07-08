import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import {
  Package, DollarSign, Users, TrendingUp, Search, Filter, MoreHorizontal,
  ArrowUpRight, Plus, Edit3, Trash2, Download,
} from "lucide-react";

const KPIS = [
  { label: "Total Revenue", value: "$1.24M", change: "+18%", icon: DollarSign },
  { label: "Active Orders", value: "342", change: "+24", icon: Package },
  { label: "Clients", value: "89", change: "+7", icon: Users },
  { label: "Avg Order Value", value: "$3.6K", change: "+5%", icon: TrendingUp },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 68000, orders: 210 },
  { month: "Feb", revenue: 82000, orders: 245 },
  { month: "Mar", revenue: 95000, orders: 280 },
  { month: "Apr", revenue: 88000, orders: 265 },
  { month: "May", revenue: 112000, orders: 310 },
  { month: "Jun", revenue: 124000, orders: 342 },
];

const MODE_DISTRIBUTION = [
  { name: "Ocean", value: 48, color: "#C8FF00" },
  { name: "Air", value: 28, color: "#3EE79F" },
  { name: "Warehousing", value: 14, color: "#FFB800" },
  { name: "Last Mile", value: 10, color: "#8E95A1" },
];

const ORDERS = [
  { id: "NVX-2847", client: "Acme Corp", route: "Shanghai → Rotterdam", mode: "Ocean", value: "$3,115", status: "In Transit" },
  { id: "NVX-2851", client: "Globex Inc", route: "Hong Kong → Hamburg", mode: "Ocean", value: "$2,890", status: "In Transit" },
  { id: "NVX-2855", client: "Initech", route: "Shenzhen → Chicago", mode: "Air", value: "$5,420", status: "Customs" },
  { id: "NVX-2860", client: "Umbrella Ltd", route: "Singapore → Dubai", mode: "Ocean", value: "$1,980", status: "Loading" },
  { id: "NVX-2863", client: "Stark Industries", route: "Tokyo → Los Angeles", mode: "Air", value: "$4,650", status: "Delivered" },
  { id: "NVX-2868", client: "Wayne Ent.", route: "Mumbai → London", mode: "Ocean", value: "$3,340", status: "In Transit" },
  { id: "NVX-2871", client: "Cyberdyne", route: "Seoul → San Francisco", mode: "Air", value: "$6,120", status: "Customs" },
];

const CLIENTS = [
  { name: "Acme Corp", orders: 47, revenue: "$182K", status: "Active" },
  { name: "Globex Inc", orders: 32, revenue: "$145K", status: "Active" },
  { name: "Stark Industries", orders: 28, revenue: "$210K", status: "Premium" },
  { name: "Initech", orders: 19, revenue: "$78K", status: "Active" },
  { name: "Umbrella Ltd", orders: 15, revenue: "$62K", status: "Active" },
  { name: "Wayne Ent.", orders: 12, revenue: "$95K", status: "Premium" },
];

const RATES = [
  { route: "Shanghai → Rotterdam", mode: "Ocean FCL", base: "$2,450", surcharge: "$180", status: "Active" },
  { route: "Hong Kong → Hamburg", mode: "Ocean FCL", base: "$2,320", surcharge: "$180", status: "Active" },
  { route: "Shenzhen → Chicago", mode: "Air Express", base: "$4,850", surcharge: "$420", status: "Active" },
  { route: "Singapore → Dubai", mode: "Ocean LCL", base: "$1,680", surcharge: "$120", status: "Active" },
  { route: "Tokyo → Los Angeles", mode: "Air Standard", base: "$3,920", surcharge: "$350", status: "Draft" },
];

const STATUS_COLORS = {
  "In Transit": "text-[#C8FF00] bg-[#C8FF00]/10",
  "Customs": "text-[#FFB800] bg-[#FFB800]/10",
  "Loading": "text-[#8E95A1] bg-[#2a2d35]",
  "Delivered": "text-[#3EE79F] bg-[#3EE79F]/10",
  "Active": "text-[#3EE79F] bg-[#3EE79F]/10",
  "Premium": "text-[#C8FF00] bg-[#C8FF00]/10",
  "Draft": "text-[#8E95A1] bg-[#2a2d35]",
};

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-heading font-bold text-base uppercase tracking-[0.02em] text-[#F2F4F7]">{title}</h2>
      {action}
    </div>
  );
}

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-[-0.04em] text-[#F2F4F7]">Admin Console</h1>
        <p className="text-sm text-[#8E95A1] mt-1">Operations overview and business intelligence.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-manifest rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded border border-[#2a2d35] flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-[#C8FF00]" />
              </div>
              <span className="text-[10px] font-heading font-bold text-[#3EE79F] flex items-center gap-0.5">{kpi.change} <TrendingUp className="w-3 h-3" /></span>
            </div>
            <div className="text-2xl font-heading font-black text-[#F2F4F7] tracking-[-0.02em]">{kpi.value}</div>
            <div className="text-[10px] uppercase tracking-[0.1em] text-[#8E95A1] mt-1">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Revenue chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-manifest rounded-lg p-5 lg:col-span-2">
          <SectionHeader title="Revenue & Orders" action={
            <button className="text-[10px] uppercase tracking-[0.1em] text-[#C8FF00] font-heading font-medium flex items-center gap-1">
              Export <Download className="w-3 h-3" />
            </button>
          } />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8FF00" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#C8FF00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
              <XAxis dataKey="month" stroke="#8E95A1" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#8E95A1" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ background: "#16181D", border: "1px solid #2a2d35", borderRadius: "8px", fontSize: "12px" }} labelStyle={{ color: "#8E95A1" }} />
              <Area type="monotone" dataKey="revenue" stroke="#C8FF00" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Mode distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-manifest rounded-lg p-5">
          <SectionHeader title="Mode Distribution" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={MODE_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3}>
                {MODE_DISTRIBUTION.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ background: "#16181D", border: "1px solid #2a2d35", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {MODE_DISTRIBUTION.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                <span className="text-[10px] text-[#8E95A1]">{m.name}</span>
                <span className="text-[10px] text-[#F2F4F7] font-heading font-semibold ml-auto">{m.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function OrdersTable() {
  const [search, setSearch] = useState("");
  const filtered = ORDERS.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.client.toLowerCase().includes(search.toLowerCase()) ||
    o.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8">
      <SectionHeader title="Recent Orders" action={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E95A1]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..."
              className="h-9 pl-9 pr-3 bg-[#0A0B0D]/60 border border-[#2a2d35] rounded text-xs text-[#F2F4F7] placeholder:text-[#8E95A1]/50 focus:border-[#C8FF00]/40 focus:outline-none w-40 md:w-56" />
          </div>
          <button className="h-9 px-3 bg-[#C8FF00] text-[#0A0B0D] rounded text-[10px] font-heading font-bold uppercase tracking-[0.08em] flex items-center gap-1 hover:bg-[#d4ff33] transition-colors">
            <Plus className="w-3 h-3" /> New
          </button>
        </div>
      } />

      <div className="glass-manifest rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d35]">
                {["Order ID", "Client", "Route", "Mode", "Value", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-[0.1em] text-[#8E95A1] font-heading font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-[#2a2d35]/50 hover:bg-[#16181D]/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-[#F2F4F7] font-heading font-bold">{order.id}</td>
                  <td className="px-4 py-3 text-xs text-[#F2F4F7]">{order.client}</td>
                  <td className="px-4 py-3 text-xs text-[#8E95A1]">{order.route}</td>
                  <td className="px-4 py-3 text-xs text-[#8E95A1]">{order.mode}</td>
                  <td className="px-4 py-3 text-xs text-[#F2F4F7] font-heading font-semibold">{order.value}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] uppercase tracking-[0.08em] font-heading font-bold px-2 py-1 rounded ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#2a2d35] transition-colors" aria-label="More options">
                      <MoreHorizontal className="w-3.5 h-3.5 text-[#8E95A1]" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ClientsList() {
  return (
    <div className="mt-8">
      <SectionHeader title="Top Clients" action={
        <button className="text-[10px] uppercase tracking-[0.1em] text-[#C8FF00] font-heading font-medium flex items-center gap-1">
          View All <ArrowUpRight className="w-3 h-3" />
        </button>
      } />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CLIENTS.map((client, i) => (
          <motion.div key={client.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="glass-manifest rounded-lg p-4 hover:border-[#C8FF00]/20 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-center">
                  <span className="text-xs font-heading font-bold text-[#C8FF00]">{client.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm text-[#F2F4F7] font-heading font-semibold">{client.name}</div>
                  <span className={`text-[9px] uppercase tracking-[0.08em] font-heading font-bold px-1.5 py-0.5 rounded ${STATUS_COLORS[client.status]}`}>{client.status}</span>
                </div>
              </div>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#2a2d35] transition-colors" aria-label="Edit client">
                <Edit3 className="w-3.5 h-3.5 text-[#8E95A1]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#2a2d35]">
              <div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-[#8E95A1]">Orders</div>
                <div className="text-sm text-[#F2F4F7] font-heading font-bold mt-0.5">{client.orders}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-[#8E95A1]">Revenue</div>
                <div className="text-sm text-[#C8FF00] font-heading font-bold mt-0.5">{client.revenue}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RatesManager() {
  return (
    <div className="mt-8">
      <SectionHeader title="Rate Management" action={
        <button className="h-9 px-3 bg-[#C8FF00] text-[#0A0B0D] rounded text-[10px] font-heading font-bold uppercase tracking-[0.08em] flex items-center gap-1 hover:bg-[#d4ff33] transition-colors">
          <Plus className="w-3 h-3" /> Add Rate
        </button>
      } />
      <div className="glass-manifest rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d35]">
                {["Route", "Mode", "Base Rate", "Surcharge", "Status", ""].map(h => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-[0.1em] text-[#8E95A1] font-heading font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RATES.map((rate, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-[#2a2d35]/50 hover:bg-[#16181D]/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-[#F2F4F7] font-heading font-semibold">{rate.route}</td>
                  <td className="px-4 py-3 text-xs text-[#8E95A1]">{rate.mode}</td>
                  <td className="px-4 py-3 text-xs text-[#F2F4F7] font-heading font-bold">{rate.base}</td>
                  <td className="px-4 py-3 text-xs text-[#8E95A1]">{rate.surcharge}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] uppercase tracking-[0.08em] font-heading font-bold px-2 py-1 rounded ${STATUS_COLORS[rate.status]}`}>{rate.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#2a2d35] transition-colors" aria-label="Edit rate">
                        <Edit3 className="w-3.5 h-3.5 text-[#8E95A1]" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#FFB800]/10 transition-colors" aria-label="Delete rate">
                        <Trash2 className="w-3.5 h-3.5 text-[#8E95A1]" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ReportsCharts() {
  return (
    <div className="mt-8">
      <SectionHeader title="Performance Reports" action={
        <button className="text-[10px] uppercase tracking-[0.1em] text-[#C8FF00] font-heading font-medium flex items-center gap-1">
          Export <Download className="w-3 h-3" />
        </button>
      } />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-manifest rounded-lg p-5">
          <h3 className="text-[10px] uppercase tracking-[0.12em] text-[#8E95A1] mb-4">Orders by Month</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
              <XAxis dataKey="month" stroke="#8E95A1" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#8E95A1" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#16181D", border: "1px solid #2a2d35", borderRadius: "8px", fontSize: "12px" }} cursor={{ fill: "#16181D" }} />
              <Bar dataKey="orders" fill="#C8FF00" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-manifest rounded-lg p-5">
          <h3 className="text-[10px] uppercase tracking-[0.12em] text-[#8E95A1] mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3EE79F" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3EE79F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
              <XAxis dataKey="month" stroke="#8E95A1" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#8E95A1" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ background: "#16181D", border: "1px solid #2a2d35", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="revenue" stroke="#3EE79F" strokeWidth={2} fill="url(#revGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}