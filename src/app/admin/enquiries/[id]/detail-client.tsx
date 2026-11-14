"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  MailOpen,
  Phone,
  Building2,
  FileText,
  Trash2,
  ShieldOff,
  ShieldCheck,
  Archive,
  ArchiveRestore,
  Loader2,
  Reply,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  ip: string | null;
  status: string;
  spamScore: number;
  createdAt: string;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(iso));
}

const statusBadge: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-500",
  read: "bg-muted text-muted-foreground",
  spam: "bg-amber-500/15 text-amber-500",
  archived: "bg-muted text-muted-foreground",
};

export function EnquiryDetailClient({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const { toast } = useToast();
  const [actionLoading, setActionLoading] = useState(false);

  // Friendly toast labels per status transition
  const statusToast: Record<string, string> = {
    new: "Marked as unread",
    read: "Marked as read",
    spam: "Moved to spam folder",
    archived: "Archived",
  };

  const updateStatus = async (newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/admin/api/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: statusToast[newStatus] || `Marked as ${newStatus}` });
        router.refresh();
      } else {
        toast({ title: "Failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this enquiry permanently?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/admin/api/enquiries/${enquiry.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Deleted" });
        router.push("/admin/enquiries");
      }
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const fields = [
    { icon: Mail, label: "Email", value: enquiry.email, href: `mailto:${enquiry.email}` },
    { icon: Phone, label: "Phone", value: enquiry.phone || "Not provided", href: enquiry.phone ? `tel:${enquiry.phone.replace(/\s/g, "")}` : undefined },
    { icon: Building2, label: "Company", value: enquiry.company || "Not provided" },
    { icon: FileText, label: "Service Interest", value: enquiry.service || "Not specified" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border-2 border-border/70 bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-foreground">{enquiry.name}</h1>
            {enquiry.company && <p className="text-sm text-muted-foreground mt-0.5">{enquiry.company}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className={cn("inline-block px-2 py-0.5 rounded font-bold uppercase tracking-wider", statusBadge[enquiry.status])}>
                {enquiry.status}
              </span>
              <span>· Received {formatDate(enquiry.createdAt)}</span>
              {enquiry.spamScore > 0 && (
                <span className="text-amber-500 font-bold">· Spam score: {enquiry.spamScore}/100</span>
              )}
            </div>
          </div>
          {actionLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-accent" />
          ) : (
            <div className="flex flex-wrap gap-2 shrink-0">
              {/* Status-aware primary action */}
              {enquiry.status === "new" && (
                <button
                  onClick={() => updateStatus("read")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors"
                >
                  <MailOpen className="h-3.5 w-3.5" /> Mark as Read
                </button>
              )}
              {enquiry.status === "read" && (
                <button
                  onClick={() => updateStatus("new")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Mark as Unread
                </button>
              )}
              {enquiry.status === "archived" && (
                <button
                  onClick={() => updateStatus("read")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs font-bold hover:bg-secondary transition-colors"
                >
                  <ArchiveRestore className="h-3.5 w-3.5" /> Unarchive
                </button>
              )}
              {enquiry.status === "spam" && (
                <button
                  onClick={() => updateStatus("read")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5" /> Not Spam
                </button>
              )}
              {enquiry.status !== "spam" && (
                <button
                  onClick={() => updateStatus("spam")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500/20 transition-colors"
                >
                  <ShieldOff className="h-3.5 w-3.5" /> Spam
                </button>
              )}
              {enquiry.status !== "archived" && (
                <button
                  onClick={() => updateStatus("archived")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs font-bold hover:bg-secondary transition-colors"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
              )}
              <a
                href={`mailto:${enquiry.email}?subject=Re: Your enquiry to Landmark Inter Gulf LLC&body=Dear ${encodeURIComponent(enquiry.name)},%0D%0A%0D%0AThank you for contacting Landmark Inter Gulf LLC.%0D%0A%0D%0A`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 px-3 py-2 text-xs font-bold transition-colors"
              >
                <Reply className="h-3.5 w-3.5" /> Reply
              </a>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info grid */}
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map((f) => {
          const Icon = f.icon;
          const content = f.href ? (
            <a href={f.href} className="text-accent hover:underline break-all">{f.value}</a>
          ) : (
            <span className="text-foreground/90 break-words">{f.value}</span>
          );
          return (
            <div key={f.label} className="rounded-lg border border-border/60 bg-card p-3 flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</p>
                <p className="text-sm mt-0.5">{content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message */}
      <div className="rounded-xl border-2 border-border/70 bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Message</h2>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
      </div>

      {/* Metadata */}
      <div className="rounded-xl border border-border/60 bg-secondary/30 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Submission Metadata</p>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div>
            <p className="text-[10px] uppercase font-bold">Enquiry ID</p>
            <p className="font-mono text-foreground/80 mt-0.5 break-all">{enquiry.id}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold">Submitted</p>
            <p className="text-foreground/80 mt-0.5">{formatDate(enquiry.createdAt)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold">IP Address</p>
            <p className="font-mono text-foreground/80 mt-0.5">{enquiry.ip || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
