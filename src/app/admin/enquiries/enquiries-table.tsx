"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
  Building2,
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
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
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

export function EnquiriesTable({ items, pagination, filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState(filters.search);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "all") sp.delete(key);
      else sp.set(key, value);
    });
    sp.delete("page");
    router.push(`/admin/enquiries?${sp.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuery({ search: searchValue });
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/admin/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: `Marked as ${newStatus}` });
        router.refresh();
      }
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/admin/api/enquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Deleted" });
        router.refresh();
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
    router.push(`/admin/enquiries?${sp.toString()}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Contact Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pagination.total} total · {filters.newCount} new · {filters.spamCount} spam
          </p>
        </div>
        <Link
          href="/admin/export?type=enquiries"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold hover:border-accent/40 transition-colors"
        >
          Export CSV
        </Link>
      </div>

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

      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search name, email, company, service…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 h-10"
        />
      </form>

      <div className="rounded-xl border-2 border-border/70 bg-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="h-10 w-10 mx-auto text-muted-foreground/40" />
            <p className="mt-3 text-sm font-bold text-foreground">No enquiries found</p>
            <p className="text-xs text-muted-foreground mt-1">Enquiries will appear here once they arrive.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {items.map((enq) => (
              <li key={enq.id}>
                <Link
                  href={`/admin/enquiries/${enq.id}`}
                  className="flex items-start justify-between p-3 sm:p-4 hover:bg-secondary/30 transition-colors gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <p className="font-bold text-foreground text-sm">{enq.name}</p>
                      {enq.company && (
                        <span className="text-xs text-muted-foreground">· {enq.company}</span>
                      )}
                    </div>
                    <div className="mt-1 grid sm:grid-cols-2 gap-0.5 sm:gap-1 text-xs text-muted-foreground">
                      <span className="truncate flex items-center gap-1"><Mail className="h-3 w-3 shrink-0" />{enq.email}</span>
                      <span className="truncate flex items-center gap-1"><Phone className="h-3 w-3 shrink-0" />{enq.phone || "—"}</span>
                      {enq.service && (
                        <span className="truncate flex items-center gap-1"><Building2 className="h-3 w-3 shrink-0" />{enq.service}</span>
                      )}
                      <span className="truncate flex items-center gap-1"><Clock className="h-3 w-3 shrink-0" />{formatDate(enq.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", statusBadge[enq.status])}>
                      {enq.status}
                    </span>
                    <button
                      onClick={(e) => { e.preventDefault(); handleStatusChange(enq.id, enq.status === "spam" ? "read" : "spam"); }}
                      disabled={actionLoading === enq.id}
                      className="inline-flex items-center justify-center h-7 w-7 rounded text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500 disabled:opacity-50"
                      title={enq.status === "spam" ? "Restore" : "Mark as spam"}
                    >
                      {actionLoading === enq.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldOff className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); handleDelete(enq.id); }}
                      disabled={actionLoading === enq.id}
                      className="inline-flex items-center justify-center h-7 w-7 rounded text-muted-foreground hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

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
