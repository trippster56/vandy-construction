"use client";

import * as React from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
  /** Provide to make the column sortable. Returns the value used for comparison. */
  sortValue?: (row: T) => string | number;
}

// Uncontrolled (client-side) mode: pass `data`, omit `totalCount`/`onPageChange`/`currentPage`
// Controlled (server-side) mode: pass `totalCount`, `currentPage`, `onPageChange`; `data` is the current page only
interface BaseProps<T> {
  columns: ColumnDef<T>[];
  keyExtractor: (row: T) => string | number;
  pageSize?: number;
  emptyState?: React.ReactNode;
  className?: string;
}

interface UncontrolledProps<T> extends BaseProps<T> {
  data: T[];
  totalCount?: never;
  currentPage?: never;
  onPageChange?: never;
}

interface ControlledProps<T> extends BaseProps<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

type PaginatedTableProps<T> = UncontrolledProps<T> | ControlledProps<T>;

interface SortState {
  key: string;
  dir: "asc" | "desc";
}

const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_BUTTONS = 5;

function getPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= MAX_PAGE_BUTTONS) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const delta = 1;

  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(total - 1, current + delta);

  pages.push(1);
  if (rangeStart > 2) pages.push("ellipsis");
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

export function PaginatedTable<T>({
  data,
  columns,
  keyExtractor,
  pageSize = DEFAULT_PAGE_SIZE,
  emptyState,
  className,
  totalCount,
  currentPage: controlledPage,
  onPageChange,
}: PaginatedTableProps<T>) {
  const isControlled = totalCount !== undefined;

  const [internalPage, setInternalPage] = React.useState(1);
  const [sort, setSort] = React.useState<SortState | null>(null);

  const currentPage = isControlled ? controlledPage : internalPage;

  const handleSort = (col: ColumnDef<T>) => {
    if (!col.sortValue) return;
    setSort(prev =>
      prev?.key === col.key
        ? { key: col.key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key: col.key, dir: "asc" }
    );
    setInternalPage(1);
  };

  const sortedData = React.useMemo(() => {
    if (!sort || isControlled) return data;
    const col = columns.find(c => c.key === sort.key);
    if (!col?.sortValue) return data;
    const getValue = col.sortValue;
    return [...data].sort((a, b) => {
      const av = getValue(a);
      const bv = getValue(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [data, sort, columns, isControlled]);

  const total = isControlled ? totalCount : sortedData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const visibleData = isControlled
    ? sortedData
    : sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (isControlled) {
      onPageChange(page);
    } else {
      setInternalPage(page);
    }
  };

  const pageItems = getPageRange(currentPage, totalPages);

  if (data.length === 0) {
    return (
      emptyState ?? (
        <div className="flex items-center justify-center rounded-lg border border-dashed py-16">
          <p className="text-muted-foreground text-sm">No results.</p>
        </div>
      )
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map(col => {
                const isSortable = !!col.sortValue;
                const isActive = sort?.key === col.key;
                const Icon = isActive
                  ? sort!.dir === "asc"
                    ? ArrowUp
                    : ArrowDown
                  : ArrowUpDown;
                return (
                  <TableHead key={col.key} className={col.className}>
                    {isSortable ? (
                      <button
                        onClick={() => handleSort(col)}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        {col.header}
                        <Icon
                          className={cn(
                            "size-3.5",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground/50"
                          )}
                        />
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleData.map(row => (
              <TableRow key={keyExtractor(row)}>
                {columns.map(col => (
                  <TableCell key={col.key} className={col.className}>
                    <div className="overflow-hidden">{col.cell(row)}</div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-muted-foreground text-xs">
            {isControlled
              ? `${total} result${total === 1 ? "" : "s"}`
              : `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, total)} of ${total}`}
          </p>
          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                  className={cn(
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {pageItems.map((item, i) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === currentPage}
                      onClick={e => {
                        e.preventDefault();
                        handlePageChange(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={cn(
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
