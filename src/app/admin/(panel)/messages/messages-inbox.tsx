"use client";

import * as React from "react";
import { Mail, Phone, MessageSquareText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaginatedTable, type ColumnDef } from "@/components/ui/paginated-table";
import {
  DataTableToolbar,
  useFilterState,
  type FilterDef,
} from "@/components/ui/data-table-toolbar";
import { cn } from "@/lib/utils";
import type { ContactMessage } from "@/db/schema";
import { markMessageRead } from "../actions";

// Pinned to the business's timezone so server and browser render the same text.
const TZ = "America/New_York";
const shortDate = new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short", day: "numeric" });
const fullDate = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  dateStyle: "medium",
  timeStyle: "short",
});

const FILTERS: FilterDef[] = [
  {
    type: "select",
    key: "type",
    label: "Type",
    options: [
      { label: "Estimate requests", value: "estimate" },
      { label: "Subcontractors", value: "subcontractor" },
    ],
  },
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [
      { label: "Unread", value: "unread" },
      { label: "Read", value: "read" },
    ],
  },
];

function TypeBadge({ type }: { type: string }) {
  return type === "subcontractor" ? (
    <Badge variant="outline">Subcontractor</Badge>
  ) : (
    <Badge>Estimate</Badge>
  );
}

/** One-line preview: subs lead with their trade, customers with their message. */
function summary(m: ContactMessage) {
  if (m.type === "subcontractor") {
    return [m.trade, m.message].filter(Boolean).join(" — ");
  }
  return m.message ?? "";
}

export default function MessagesInbox({ messages }: { messages: ContactMessage[] }) {
  const [search, setSearch] = React.useState("");
  const { filterValues, onFilterChange, onFilterClear } = useFilterState({ type: "", status: "" });
  const [openId, setOpenId] = React.useState<number | null>(null);
  // Read state flips instantly in the UI; the server action catches up behind it.
  const [readOverrides, setReadOverrides] = React.useState<Record<number, boolean>>({});

  const isRead = (m: ContactMessage) => readOverrides[m.id] ?? m.read;

  const setRead = (m: ContactMessage, read: boolean) => {
    if (isRead(m) === read) return;
    setReadOverrides((prev) => ({ ...prev, [m.id]: read }));
    markMessageRead(m.id, read).catch(() =>
      setReadOverrides((prev) => ({ ...prev, [m.id]: !read }))
    );
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return messages.filter((m) => {
      if (filterValues.type && m.type !== filterValues.type) return false;
      const read = readOverrides[m.id] ?? m.read;
      if (filterValues.status === "unread" && read) return false;
      if (filterValues.status === "read" && !read) return false;
      if (!q) return true;
      return [m.name, m.email, m.phone, m.company, m.trade, m.message].some((v) =>
        v?.toLowerCase().includes(q)
      );
    });
  }, [messages, search, filterValues, readOverrides]);

  const open = messages.find((m) => m.id === openId) ?? null;

  const columns: ColumnDef<ContactMessage>[] = [
    {
      key: "from",
      header: "From",
      sortValue: (m) => m.name.toLowerCase(),
      cell: (m) => (
        <div className="flex items-start gap-2">
          <span
            aria-label={isRead(m) ? undefined : "Unread"}
            className={cn(
              "mt-1.5 size-2 shrink-0 rounded-full",
              isRead(m) ? "bg-transparent" : "bg-primary"
            )}
          />
          <div className="min-w-0">
            <p className={cn("truncate text-foreground", !isRead(m) && "font-semibold")}>
              {m.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{m.company || m.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      className: "hidden w-32 sm:table-cell",
      cell: (m) => <TypeBadge type={m.type} />,
    },
    {
      key: "summary",
      header: "Details",
      className: "hidden md:table-cell",
      cell: (m) => <p className="truncate text-muted-foreground">{summary(m)}</p>,
    },
    {
      key: "received",
      header: "Received",
      className: "w-24 text-right sm:w-28",
      sortValue: (m) => new Date(m.createdAt).getTime(),
      cell: (m) => (
        <span className="text-xs text-muted-foreground">{shortDate.format(new Date(m.createdAt))}</span>
      ),
    },
  ];

  return (
    <div className="max-w-6xl space-y-4">
      <DataTableToolbar
        search={{ value: search, onChange: setSearch, placeholder: "Search name, email, trade, message…" }}
        filters={FILTERS}
        filterValues={filterValues}
        onFilterChange={onFilterChange}
        onFilterClear={onFilterClear}
      />

      <PaginatedTable
        data={filtered}
        columns={columns}
        keyExtractor={(m) => m.id}
        pageSize={20}
        onRowClick={(m) => {
          setOpenId(m.id);
          setRead(m, true);
        }}
        emptyState={
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed py-16 text-center">
            <p className="text-sm font-medium text-foreground">
              {messages.length === 0 ? "No messages yet" : "No messages match"}
            </p>
            <p className="text-sm text-muted-foreground">
              {messages.length === 0
                ? "Submissions from the contact form will show up here."
                : "Try a different search or clear the filters."}
            </p>
          </div>
        }
      />

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpenId(null)}>
        {open && <MessageDetail message={open} onMarkUnread={() => { setRead(open, false); setOpenId(null); }} />}
      </Dialog>
    </div>
  );
}

function MessageDetail({
  message: m,
  onMarkUnread,
}: {
  message: ContactMessage;
  onMarkUnread: () => void;
}) {
  const fields: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${m.email}`} className="text-primary hover:underline">{m.email}</a>],
    ["Phone", m.phone && <a key="p" href={`tel:${m.phone}`} className="text-primary hover:underline">{m.phone}</a>],
    ["Prefers", m.preferredContact],
    ["Company", m.company],
    ["Trade", m.trade],
    ["Licensed & insured", m.licensedInsured],
  ];
  const subject =
    m.type === "subcontractor" ? "Vandy Construction — subcontractor follow-up" : "Re: your estimate request";

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <TypeBadge type={m.type} />
          <DialogDescription>{fullDate.format(new Date(m.createdAt))}</DialogDescription>
        </div>
        <DialogTitle className="text-lg">{m.name}</DialogTitle>
      </DialogHeader>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        {fields
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <React.Fragment key={label}>
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="min-w-0 break-words">{value}</dd>
            </React.Fragment>
          ))}
      </dl>

      {m.message && (
        <div className="rounded-lg bg-muted p-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            {m.type === "subcontractor" ? "Notes" : "Message"}
          </p>
          <p className="max-h-64 overflow-y-auto whitespace-pre-wrap text-foreground">{m.message}</p>
        </div>
      )}

      <DialogFooter>
        <Button variant="ghost" onClick={onMarkUnread} className="sm:mr-auto">
          Mark as unread
        </Button>
        {m.phone && (
          <a href={`sms:${m.phone}`} className={buttonVariants({ variant: "outline" })}>
            <MessageSquareText />
            Text
          </a>
        )}
        {m.phone && (
          <a href={`tel:${m.phone}`} className={buttonVariants({ variant: "outline" })}>
            <Phone />
            Call
          </a>
        )}
        <a
          href={`mailto:${m.email}?subject=${encodeURIComponent(subject)}`}
          className={buttonVariants()}
        >
          <Mail />
          Reply by email
        </a>
      </DialogFooter>
    </DialogContent>
  );
}
