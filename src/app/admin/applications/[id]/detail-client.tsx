"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  MailOpen,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Award,
  Languages,
  ShieldCheck,
  Clock,
  FileText,
  Trash2,
  ShieldOff,
  Archive,
  ArchiveRestore,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Application = {
  id: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  currentLocation: string;
  experience: string;
  certifications: string | null;
  languages: string;
  iqamaStatus: string;
  noticePeriod: string | null;
  message: string | null;
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

export function ApplicationDetailClient({ application }: { application: Application }) {
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
      const res = await fetch(`/admin/api/applications/${application.id}`, {
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
    if (!confirm("Delete this application permanently? This cannot be undone.")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/admin/api/applications/${application.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Deleted" });
        router.push("/admin/applications");
      }
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const fields = [
    { icon: Briefcase, label: "Position Applied For", value: application.jobTitle },
    { icon: Mail, label: "Email", value: application.email, href: `mailto:${application.email}` },
    { icon: Phone, label: "Phone / WhatsApp", value: application.phone, href: `tel:${application.phone.replace(/\s/g, "")}` },
    { icon: Globe, label: "Nationality", value: application.nationality },
    { icon: MapPin, label: "Current Location", value: application.currentLocation },
    { icon: Clock, label: "Years of Experience", value: application.experience },
    { icon: Languages, label: "Languages Spoken", value: application.languages },
    { icon: Award, label: "Certifications", value: application.certifications || "Not provided" },
    { icon: ShieldCheck, label: "Iqama / Visa Status", value: application.iqamaStatus },
    { icon: Clock, label: "Notice Period", value: application.noticePeriod || "Not provided" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border-2 border-border/70 bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-foreground">{application.name}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{application.jobTitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className={cn("inline-block px-2 py-0.5 rounded font-bold uppercase tracking-wider", statusBadge[application.status])}>
                {application.status}
              </span>
              <span>· Received {formatDate(application.createdAt)}</span>
              {application.spamScore > 0 && (
                <span className="text-amber-500 font-bold">· Spam score: {application.spamScore}/100</span>
              )}
            </div>
          </div>
          {actionLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-accent" />
          ) : (
            <div className="flex flex-wrap gap-2 shrink-0">
              {/* Status-aware primary action */}
              {application.status === "new" && (
                <button
                  onClick={() => updateStatus("read")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors"
                >
                  <MailOpen className="h-3.5 w-3.5" /> Mark as Read
                </button>
              )}
              {application.status === "read" && (
                <button
                  onClick={() => updateStatus("new")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Mark as Unread
                </button>
              )}
              {application.status === "archived" && (
                <button
                  onClick={() => updateStatus("read")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs font-bold hover:bg-secondary transition-colors"
                >
                  <ArchiveRestore className="h-3.5 w-3.5" /> Unarchive
                </button>
              )}
              {application.status === "spam" && (
                <button
                  onClick={() => updateStatus("read")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5" /> Not Spam
                </button>
              )}
              {application.status !== "spam" && (
                <button
                  onClick={() => updateStatus("spam")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500/20 transition-colors"
                >
                  <ShieldOff className="h-3.5 w-3.5" /> Spam
                </button>
              )}
              {application.status !== "archived" && (
                <button
                  onClick={() => updateStatus("archived")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs font-bold hover:bg-secondary transition-colors"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
              )}
              <a
                href={`mailto:${application.email}?subject=Re: Your application for ${encodeURIComponent(application.jobTitle)} at Landmark Inter Gulf&body=Dear ${encodeURIComponent(application.name)},`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 px-3 py-2 text-xs font-bold transition-colors"
              >
                <Mail className="h-3.5 w-3.5" /> Reply by Email
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
            <a href={f.href} className="text-accent hover:underline break-all">
              {f.value}
            </a>
          ) : (
            <span className="text-foreground/90 break-words">{f.value}</span>
          );
          return (
            <div key={f.label} className="rounded-lg border border-border/60 bg-card p-3 flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </p>
                <p className="text-sm mt-0.5">{content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message */}
      {application.message && (
        <div className="rounded-xl border-2 border-border/70 bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Applicant Message
            </h2>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {application.message}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="rounded-xl border border-border/60 bg-secondary/30 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Submission Metadata
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div>
            <p className="text-[10px] uppercase font-bold">Submission ID</p>
            <p className="font-mono text-foreground/80 mt-0.5 break-all">{application.id}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold">Submitted</p>
            <p className="text-foreground/80 mt-0.5">{formatDate(application.createdAt)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold">IP Address</p>
            <p className="font-mono text-foreground/80 mt-0.5">{application.ip || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
