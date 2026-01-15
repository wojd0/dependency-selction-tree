"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { DataSet, DependencyMode } from "@/app/data";

interface DependencySettingsProps {
  dataSet: DataSet;
  keepDependencies: boolean;
  onKeepDependenciesChange: (checked: boolean) => void;
  dependencyMode: DependencyMode;
  onDependencyModeChange: (mode: DependencyMode) => void;
}

export function DependencySettings({
  dataSet,
  keepDependencies,
  onKeepDependenciesChange,
  dependencyMode,
  onDependencyModeChange,
}: DependencySettingsProps) {
  return (
    <div className="mb-4 space-y-4 rounded-lg border bg-background p-4">
      <div className="flex items-start">
        <div className="flex items-start gap-3">
          <Switch
            id="keep-dependencies"
            checked={keepDependencies}
            onCheckedChange={onKeepDependenciesChange}
            className="mt-1"
          />
          <div>
            <Label htmlFor="keep-dependencies" className="text-base font-medium">
              Keep Dependencies
            </Label>
            <p className="text-sm text-muted-foreground">
              {dataSet === 'pantry'
                ? 'Automatically select all ingredients and utensils for a recipe.'
                : 'Automatically include all dependencies of a model.'}
            </p>
          </div>
        </div>
      </div>
      {keepDependencies && (
        <>
          <Separator />
          <div className="space-y-2 pt-2">
            <Label className="text-base font-medium">Dependency Rule</Label>
            <RadioGroup
              value={dependencyMode}
              onValueChange={(value) => onDependencyModeChange(value as DependencyMode)}
              className="flex gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="force" id="force" />
                <Label htmlFor="force">Force (Disable deselect)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="warn" id="warn" />
                <Label htmlFor="warn">Warn (Show error)</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
}
