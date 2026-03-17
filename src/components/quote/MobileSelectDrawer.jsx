import React from "react";
import { useMediaQuery } from "@/components/useMediaQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ChevronDown, Check } from "lucide-react";

export default function MobileSelectDrawer({ placeholder, value, onChange, options, label }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = React.useState(false);

  const selectedLabel = value ? options.find(o => o.value === value)?.label : null;

  if (!isMobile) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={`${label}: ${selectedLabel || placeholder}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selectedLabel || placeholder}`}
        className="w-full min-h-[44px] px-3 py-2.5 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <span className={selectedLabel ? "text-gray-900" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{label}</DrawerTitle>
          </DrawerHeader>
          <div
            role="listbox"
            aria-label={label}
            className="px-4 pb-8 space-y-2"
          >
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full min-h-[44px] text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isSelected
                      ? "bg-sky-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}