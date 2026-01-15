"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { Item, ItemType, DependencyMode, CategoryConfig } from "@/app/data";
import { ItemNode } from "./item-node";

interface CategoryNodeProps {
  items: Item[];
  category: ItemType;
  categoryConfig: CategoryConfig;
  categoryItems: Item[];
  openCategories: Record<string, boolean>;
  requiredDependencies: Set<string>;
  keepDependencies: boolean;
  dependencyMode: DependencyMode;
  onCategorySelectionChange: (category: ItemType, checked: boolean | 'indeterminate') => void;
  onItemSelectionChange: (itemName: string, checked: boolean) => void;
  onCategoryOpenChange: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}

export function CategoryNode({
  items,
  category,
  categoryConfig,
  categoryItems,
  openCategories,
  requiredDependencies,
  keepDependencies,
  dependencyMode,
  onCategorySelectionChange,
  onItemSelectionChange,
  onCategoryOpenChange,
}: CategoryNodeProps) {
  const Icon = categoryConfig?.icon;
  const selectedInCategory = categoryItems.filter(item => item.selected).length;
  const categorySelectedState = selectedInCategory === 0 ? false : selectedInCategory === categoryItems.length ? true : 'indeterminate';
  const isCategoryOpen = openCategories[category];

  return (
    <div className="relative">
      <div className="absolute -left-[22px] top-1/2 h-px w-3 bg-gray-200"></div>
      <Collapsible
        open={isCategoryOpen}
        onOpenChange={(isOpen) => onCategoryOpenChange(prev => ({ ...prev, [category]: isOpen }))}
      >
        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
          <CollapsibleTrigger asChild>
            <button className="flex items-center text-sm">
              {isCategoryOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </CollapsibleTrigger>
          <Checkbox
            id={`select-${category}`}
            checked={categorySelectedState}
            onCheckedChange={(checked) => onCategorySelectionChange(category, checked)}
          />
          <Label htmlFor={`select-${category}`} className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 font-semibold">
              {Icon && <Icon className="h-5 w-5 text-gray-600" />}
              {categoryConfig?.title || category}
            </div>
          </Label>
        </div>
        <CollapsibleContent>
          <div className="pl-8 pt-1">
            <div className="relative">
              <div className="absolute -left-3.5 top-0 h-full w-px bg-gray-200"></div>
              <div className="space-y-1">
                {categoryItems.map((item) => (
                  <ItemNode
                    key={item.name}
                    item={item}
                    isRequired={requiredDependencies.has(item.name)}
                    isDisabled={keepDependencies && dependencyMode === 'force' && requiredDependencies.has(item.name)}
                    isInvalid={keepDependencies && dependencyMode === 'warn' && requiredDependencies.has(item.name) && !item.selected}
                    onSelectionChange={onItemSelectionChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
