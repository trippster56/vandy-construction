"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface TypeaheadOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface TypeaheadProps {
  options: TypeaheadOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  buttonClassName?: string;
  contentClassName?: string;
  multiSelect?: boolean;
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  maxSelections?: number;
  filterFunction?: (option: TypeaheadOption, search: string) => boolean;
  isLoading?: boolean;
}

const defaultFilterFunction = (
  option: TypeaheadOption,
  search: string
): boolean => {
  const searchLower = search.toLowerCase();
  return (
    option.label.toLowerCase().includes(searchLower) ||
    option.value.toLowerCase().includes(searchLower) ||
    (option.description?.toLowerCase().includes(searchLower) ?? false)
  );
};

export const Typeahead = React.forwardRef<
  HTMLButtonElement,
  TypeaheadProps
>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select option...",
      emptyText = "No options found.",
      searchPlaceholder = "Search...",
      disabled = false,
      clearable = false,
      buttonClassName,
      contentClassName,
      multiSelect = false,
      values = [],
      onValuesChange,
      maxSelections,
      filterFunction = defaultFilterFunction,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const filteredOptions = React.useMemo(() => {
      if (!search) return options;
      return options.filter(option => filterFunction(option, search));
    }, [options, search, filterFunction]);

    const selectedOption = React.useMemo(() => {
      if (multiSelect) return null;
      return options.find(option => option.value === value);
    }, [options, value, multiSelect]);

    const selectedOptions = React.useMemo(() => {
      if (!multiSelect) return [];
      return options.filter(option => values.includes(option.value));
    }, [options, values, multiSelect]);

    const handleSelect = (optionValue: string) => {
      if (multiSelect) {
        if (!onValuesChange) return;
        const newValues = values.includes(optionValue)
          ? values.filter(v => v !== optionValue)
          : [...values, optionValue];
        if (
          maxSelections &&
          !values.includes(optionValue) &&
          newValues.length > maxSelections
        ) {
          return;
        }
        onValuesChange(newValues);
      } else {
        const newValue = optionValue === value ? "" : optionValue;
        onValueChange?.(newValue);
        setOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent | React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (multiSelect) {
        onValuesChange?.([]);
      } else {
        onValueChange?.("");
      }
    };

    const getDisplayText = () => {
      if (multiSelect) {
        if (selectedOptions.length === 0) return placeholder;
        if (selectedOptions.length === 1) return selectedOptions[0].label;
        return `${selectedOptions.length} selected`;
      }
      return selectedOption?.label || placeholder;
    };

    const showClearButton =
      clearable &&
      ((multiSelect && selectedOptions.length > 0) ||
        (!multiSelect && selectedOption && value !== ""));

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <button
            ref={buttonRef}
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "inline-flex w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm font-normal transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
              !selectedOption &&
                !selectedOptions.length &&
                "text-muted-foreground",
              buttonClassName
            )}
            {...props}
          >
            <span className="truncate">{getDisplayText()}</span>
            <div className="flex items-center gap-1">
              {showClearButton && (
                <div
                  role="button"
                  className="mr-1 cursor-pointer rounded-sm hover:bg-muted"
                  onClick={handleClear}
                  onPointerDown={e => e.stopPropagation()}
                >
                  <X className="h-4 w-4 opacity-50 hover:opacity-100" />
                </div>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0",
            "max-h-[--radix-popover-content-available-height]",
            contentClassName
          )}
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="max-h-[min(300px,calc(var(--radix-popover-content-available-height,300px)-44px))]">
              {isLoading ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.map(option => {
                      const isSelected = multiSelect
                        ? values.includes(option.value)
                        : value === option.value;

                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          onSelect={() => handleSelect(option.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            {option.description && (
                              <span className="text-xs text-muted-foreground">
                                {option.description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Typeahead.displayName = "Typeahead";
