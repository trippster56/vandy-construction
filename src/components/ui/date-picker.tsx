"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  /** ISO date string (yyyy-MM-dd) or empty */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  clearable?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  id,
  clearable = true,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const date = React.useMemo(() => {
    if (!value) return undefined;
    const parsed = parse(value, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      onChange?.(format(selected, "yyyy-MM-dd"));
    } else {
      onChange?.("");
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <button
          id={id}
          disabled={disabled}
          className={cn(
            "inline-flex w-full items-center justify-start rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm font-normal transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM d, yyyy") : <span>{placeholder}</span>}
          {clearable && date && (
            <div
              role="button"
              className="ml-auto cursor-pointer rounded-sm hover:bg-muted"
              onClick={handleClear}
              onPointerDown={e => e.stopPropagation()}
            >
              <X className="h-4 w-4 opacity-50 hover:opacity-100" />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
