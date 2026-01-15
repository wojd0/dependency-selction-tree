"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Item } from "@/app/data";

interface ItemNodeProps {
  item: Item;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  onSelectionChange: (itemName: string, checked: boolean) => void;
}

export function ItemNode({ item, isDisabled, isInvalid, onSelectionChange }: ItemNodeProps) {
  return (
    <div key={item.name} className="relative flex items-center space-x-3 p-2 rounded-md">
      <div className="absolute -left-[22px] top-1/2 h-px w-3 bg-gray-200"></div>
      <Checkbox
        id={item.name}
        checked={item.selected}
        onCheckedChange={(checked) => onSelectionChange(item.name, checked as boolean)}
        disabled={isDisabled}
        aria-label={`Select ${item.name}`}
      />
      <Label
        htmlFor={item.name}
        className={cn(
          "w-full cursor-pointer text-sm font-normal",
          isDisabled ? "cursor-not-allowed text-gray-400" : "text-gray-800",
          isInvalid && "text-red-600 font-medium"
        )}
      >
        {item.name}
        {isInvalid && <span className="ml-2 text-xs">(Required by another item)</span>}
      </Label>
    </div>
  );
}
