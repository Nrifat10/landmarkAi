"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Briefcase,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Eye,
  ShieldOff,
  Trash2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  iqamaStatus: string;
  experience: string;
  status: string;
  spamScore: number;
  createdAt: string;
};

type Props = {
  items: Item[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  filters: { status: string; search: string; newCount: number; spamCount: number; allCount: number };
};

const statusTabs = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "spam", label: "Spam" },
  { key: "archived", label: "Archived" },
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

const statusBadge: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-500",
  read: "bg-muted text-muted-foreground",
  spam: "bg-amber-500/15 text-amber-500",
  archived: "bg-muted text-muted-foreground",
};

export function ApplicationsTable({ items, pagination, filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState(filters.search);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "all") {
        sp.delete(key);
      } else {
        sp.set(key, value);
      }
    });
    sp.delete("page"); // reset to page 1 on filter change
    router.push(`/admin/applications?${sp.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuery({ search: searchValue });
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/admin/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: `Marked as ${newStatus}` });
        router.refresh();
      } else {
        toast({ title: "Failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application permanently? This cannot be undone.")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/admin/api/applications/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Deleted" });
        router.refresh();
      } else {
        toast({ title: "Delete failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const goToPage = (newPage: number) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("page", String(newPage));
    router.push(`/admin/applications?${sp.toString()}`);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Job Applications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pagination.total} total · {filters.newCount} new · {filters.spamCount} spam
          </p>
        </div>
        <Link
          href="/admin/export?type=applications"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold hover:border-accent/40 transition-colors"
        >
          Export CSV
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => {
          const count = tab.key === "all" ? filters.allCount : tab.key === "new" ? filters.newCount : tab.key === "spam" ? filters.spamCount : 0;
          const isActive = filters.status === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => updateQuery({ status: tab.key })}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border hover:border-accent/40"
              )}
            >
              {tab.label}
              {count > 0 && <span className="opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search name, email, job title, nationality…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 h-10"
        />
      </form>

      {/* Table */}
      <div className="rounded-xl border-2 border-border/70 bg-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase className="h-10 w-10 mx-auto text-muted-foreground/40" />
            <p className="mt-3 text-sm font-bold text-foreground">No applications found</p>
            <p className="text-xs text-muted-foreground mt-1">
              {filters.search ? "Try a different search term." : "Submissions will appear here once they arrive."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/60 border-b border-border">
                  <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="text-left p-3 font-bold">Name</th>
                    <th className="text-left p-3 font-bold">Position</th>
                    <th className="text-left p-3 font-bold">Contact</th>
                    <th className="text-left p-3 font-bold">Iqama</th>
                    <th className="text-left p-3 font-bold">Date</th>
                    <th className="text-left p-3 font-bold">Status</th>
                    <th className="text-right p-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {items.map((app) => (
                    <tr key={app.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3">
                        <Link href={`/admin/applications/${app.id}`} className="block">
                          <p className="font-bold text-foreground text-sm">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.nationality}</p>
                        </Link>
                      </td>
                      <td className="p-3 text-sm text-foreground/90 max-w-[200px]">
                        <Link href={`/admin/applications/${app.id}`} className="block truncate">
                          {app.jobTitle}
                        </Link>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">
                        <p className="truncate">{app.email}</p>
                        <p>{app.phone}</p>
                      </td>
                      <td className="p-3 text-xs text-foreground/80">{app.iqamaStatus}</td>
                      <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="p-3">
                        <span className={cn("inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", statusBadge[app.status])}>
                          {app.status}
                        </span>
                        {app.spamScore >= 50 && (
                          <span className="block mt-1 text-[9px] text-amber-500 font-bold">Spam score: {app.spamScore}</span>
                        )}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/admin/applications/${app.id}`}
                            className="inline-flex items-center justify-center h-7 w-7 rounded text-muted-foreground hover:bg-accent/10 hover:text-accent"
                            title="View"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => handleStatusChange(app.id, app.status === "spam" ? "read" : "spam")}
                            disabled={actionLoading === app.id}
                            className="inline-flex items-center justify-center h-7 w-7 rounded text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500 disabled:opacity-50"
                            title={app.status === "spam" ? "Mark as read" : "Mark as spam"}
                          >
                            {actionLoading === app.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldOff className="h-3.5 w-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            disabled={actionLoading === app.id}
                            className="inline-flex items-center justify-center h-7 w-7 rounded text-muted-foreground hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="md:hidden divide-y divide-border/60">
              {items.map((app) => (
                <li key={app.id} className="p-3">
                  <Link href={`/admin/applications/${app.id}`} className="block">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">{app.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{app.jobTitle}</p>
                      </div>
                      <span className={cn("inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0", statusBadge[app.status])}>
                        {app.status}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
                      <span className="truncate"><Mail className="inline h-3 w-3 mr-1" />{app.email}</span>
                      <span className="truncate"><Phone className="inline h-3 w-3 mr-1" />{app.phone}</span>
                      <span className="truncate"><MapPin className="inline h-3 w-3 mr-1" />{app.nationality}</span>
                      <span className="truncate"><Clock className="inline h-3 w-3 mr-1" />{formatDate(app.createdAt)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} · Showing {items.length} of {pagination.total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold disabled:opacity-50"
            >
              <ChevronLeft className="h-3 w-3" /> Prev
            </button>
            <button
              onClick={() => goToPage(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold disabled:opacity-50"
            >
              Next <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
