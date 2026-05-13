"use client";

import * as React from "react";
import { Search, ListFilter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typeahead } from "@/components/ui/typeahead";
import { DatePicker } from "@/components/ui/date-picker";

// ---------------------------------------------------------------------------
// Filter definition types
// ---------------------------------------------------------------------------

export interface SelectFilterDef {
  type: "select";
  key: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export interface MultiSelectFilterDef {
  type: "multi-select";
  key: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export interface DateRangeFilterDef {
  type: "date-range";
  key: string;
  label: string;
}

export interface RangeFilterDef {
  type: "range";
  key: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export type FilterDef =
  | SelectFilterDef
  | MultiSelectFilterDef
  | DateRangeFilterDef
  | RangeFilterDef;

export type DateRangeValue = { from: string; to: string };
export type RangeValue = { min: string; max: string };

export type FilterValues = Record<
  string,
  string | string[] | DateRangeValue | RangeValue
>;

// ---------------------------------------------------------------------------
// Hook — manages filter state so consumers don't repeat boilerplate
// ---------------------------------------------------------------------------

export function useFilterState(initial: FilterValues) {
  const [filterValues, setFilterValues] = React.useState(initial);

  const handleChange = React.useCallback(
    (key: string, value: FilterValues[string]) => {
      setFilterValues(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  // Intentionally empty deps — `initial` is the reset snapshot captured on
  // first render, mirroring how useState(initial) only reads its argument once.
  const handleClear = React.useCallback(() => {
    setFilterValues(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filterValues,
    onFilterChange: handleChange,
    onFilterClear: handleClear,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isDateRange(v: FilterValues[string]): v is DateRangeValue {
  return typeof v === "object" && !Array.isArray(v) && "from" in v;
}

function isRange(v: FilterValues[string]): v is RangeValue {
  return typeof v === "object" && !Array.isArray(v) && "min" in v;
}

function countActiveFilters(
  filters: FilterDef[],
  values: FilterValues
): number {
  return filters.reduce((count, f) => {
    const v = values[f.key];
    if (v == null) return count;
    switch (f.type) {
      case "select":
        return count + (typeof v === "string" && v !== "" ? 1 : 0);
      case "multi-select":
        return count + (Array.isArray(v) && v.length > 0 ? 1 : 0);
      case "date-range":
        return count + (isDateRange(v) && (v.from || v.to) ? 1 : 0);
      case "range":
        return count + (isRange(v) && (v.min || v.max) ? 1 : 0);
      default:
        return count;
    }
  }, 0);
}

/** ISO date string for today + N days */
function isoOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const today = () => isoOffset(0);

// ---------------------------------------------------------------------------
// Toolbar props
// ---------------------------------------------------------------------------

interface DataTableToolbarProps {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  /** Called when Enter is pressed in the search input. */
  onSearchSubmit?: () => void;
  filters?: FilterDef[];
  filterValues?: FilterValues;
  onFilterChange?: (key: string, value: FilterValues[string]) => void;
  onFilterClear?: () => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Main toolbar
// ---------------------------------------------------------------------------

export function DataTableToolbar({
  search,
  onSearchSubmit,
  filters = [],
  filterValues = {},
  onFilterChange,
  onFilterClear,
  className,
}: DataTableToolbarProps) {
  const activeCount = countActiveFilters(filters, filterValues);
  const hasFilters = filters.length > 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {search && (
        <div className="relative min-w-0 flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            placeholder={search.placeholder ?? "Search..."}
            value={search.value}
            onChange={e => search.onChange(e.target.value)}
            onKeyDown={
              onSearchSubmit
                ? e => {
                    if (e.key === "Enter") onSearchSubmit();
                  }
                : undefined
            }
            className="pl-8"
          />
        </div>
      )}

      {hasFilters && (
        <Popover>
          <PopoverTrigger>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 shrink-0 gap-1.5"
              >
                <ListFilter className="size-4" />
                Filter
                {activeCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="size-5 rounded-full px-0 text-[10px]"
                  >
                    {activeCount}
                  </Badge>
                )}
              </Button>
              {activeCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation();
                    onFilterClear?.();
                  }}
                  className="text-muted-foreground h-9 shrink-0 gap-1"
                >
                  <X className="size-4" />
                  Clear
                </Button>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="relative w-96 p-4" align="end">
            <PopoverClose className="text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-sm p-1 transition-colors">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </PopoverClose>
            <div className="space-y-4">
              {filters.map(def => (
                <div key={def.key} className="space-y-1.5">
                  <Label className="text-xs font-medium">{def.label}</Label>
                  {def.type === "select" && (
                    <SelectFilter
                      def={def}
                      value={(filterValues[def.key] as string) ?? ""}
                      onChange={v => onFilterChange?.(def.key, v)}
                    />
                  )}
                  {def.type === "multi-select" && (
                    <MultiSelectFilter
                      def={def}
                      value={(filterValues[def.key] as string[]) ?? []}
                      onChange={v => onFilterChange?.(def.key, v)}
                    />
                  )}
                  {def.type === "date-range" && (
                    <DateRangeFilter
                      value={
                        (filterValues[def.key] as DateRangeValue) ?? {
                          from: "",
                          to: "",
                        }
                      }
                      onChange={v => onFilterChange?.(def.key, v)}
                    />
                  )}
                  {def.type === "range" && (
                    <RangeFilter
                      def={def}
                      value={
                        (filterValues[def.key] as RangeValue) ?? {
                          min: "",
                          max: "",
                        }
                      }
                      onChange={v => onFilterChange?.(def.key, v)}
                    />
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Select filter (single value)
// ---------------------------------------------------------------------------

function SelectFilter({
  def,
  value,
  onChange,
}: {
  def: SelectFilterDef;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={v => onChange(v === "__all__" || v === null ? "" : v)}
    >
      <SelectTrigger className="h-8 w-full text-xs">
        <SelectValue placeholder={def.placeholder ?? "All"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">All</SelectItem>
        {def.options.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ---------------------------------------------------------------------------
// Multi-select filter (typeahead with search)
// ---------------------------------------------------------------------------

function MultiSelectFilter({
  def,
  value,
  onChange,
}: {
  def: MultiSelectFilterDef;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Typeahead
      multiSelect
      values={value}
      onValuesChange={onChange}
      options={def.options}
      placeholder={def.placeholder ?? "All"}
      searchPlaceholder="Search..."
      emptyText="No results."
      buttonClassName="h-8 text-xs"
    />
  );
}

// ---------------------------------------------------------------------------
// Date range filter (from / to + quick presets)
// ---------------------------------------------------------------------------

function buildDatePresets(): { label: string; from: string; to: string }[] {
  return [
    { label: "Next 30 days", from: today(), to: isoOffset(30) },
    { label: "Next quarter", from: today(), to: isoOffset(90) },
    { label: "Next 6 months", from: today(), to: isoOffset(180) },
    { label: "Next year", from: today(), to: isoOffset(365) },
    { label: "Past 30 days", from: isoOffset(-30), to: today() },
    { label: "Past quarter", from: isoOffset(-90), to: today() },
  ];
}

function DateRangeFilter({
  value,
  onChange,
}: {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
}) {
  const presets = React.useMemo(() => buildDatePresets(), []);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {presets.map(p => (
          <button
            key={p.label}
            type="button"
            onClick={() =>
              value.from === p.from && value.to === p.to
                ? onChange({ from: "", to: "" })
                : onChange({ from: p.from, to: p.to })
            }
            className={cn(
              "rounded-md border px-2 py-0.5 text-[11px] transition-colors",
              value.from === p.from && value.to === p.to
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DatePicker
          value={value.from}
          onChange={v => onChange({ ...value, from: v })}
          placeholder="From"
          clearable
        />
        <DatePicker
          value={value.to}
          onChange={v => onChange({ ...value, to: v })}
          placeholder="To"
          clearable
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Range filter (min / max numeric between)
// ---------------------------------------------------------------------------

function RangeFilter({
  def,
  value,
  onChange,
}: {
  def: RangeFilterDef;
  value: RangeValue;
  onChange: (value: RangeValue) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={value.min}
        onChange={e => onChange({ ...value, min: e.target.value })}
        placeholder={def.min != null ? String(def.min) : "Min"}
        min={def.min}
        max={def.max}
        step={def.step}
        className="h-8 text-xs"
      />
      <span className="text-muted-foreground shrink-0 text-xs">to</span>
      <Input
        type="number"
        value={value.max}
        onChange={e => onChange({ ...value, max: e.target.value })}
        placeholder={def.max != null ? String(def.max) : "Max"}
        min={def.min}
        max={def.max}
        step={def.step}
        className="h-8 text-xs"
      />
      {def.unit && (
        <span className="text-muted-foreground shrink-0 text-xs">
          {def.unit}
        </span>
      )}
    </div>
  );
}
