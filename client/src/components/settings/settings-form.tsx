import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from '@/lib/types';
import { Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsFormProps {
  settings: Settings;
  onSubmit: (settings: Partial<Settings>) => Promise<void>;
  isSaving?: boolean;
}

export function SettingsForm({ settings, onSubmit, isSaving = false }: SettingsFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({
      default_hourly_rate: settings.default_hourly_rate,
      round_to_nearest: settings.round_to_nearest,
      tax_percentage: settings.tax_percentage,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <style>
        {`
          /* Remove number input spinners */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="defaultRate">Default Hourly Rate ($)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="defaultRate"
              type="number"
              min="0"
              step="0.01"
              value={settings.default_hourly_rate}
              onChange={(e) =>
                onSubmit({
                  ...settings,
                  default_hourly_rate: parseFloat(e.target.value) || 0,
                })
              }
              disabled={isSaving}
              className={cn(
                "w-[120px] text-right",
                isSaving && "opacity-50"
              )}
            />
            <span className="text-muted-foreground">/hour</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roundToNearest">Round to Nearest (minutes)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="roundToNearest"
              type="number"
              min="1"
              value={settings.round_to_nearest}
              onChange={(e) =>
                onSubmit({
                  ...settings,
                  round_to_nearest: parseInt(e.target.value) || 1,
                })
              }
              disabled={isSaving}
              className={cn(
                "w-[100px] text-right",
                isSaving && "opacity-50"
              )}
            />
            <span className="text-muted-foreground">minutes</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxPercentage">Tax Percentage</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="taxPercentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={settings.tax_percentage}
              onChange={(e) =>
                onSubmit({
                  ...settings,
                  tax_percentage: parseFloat(e.target.value) || 0,
                })
              }
              disabled={isSaving}
              className={cn(
                "w-[100px] text-right",
                isSaving && "opacity-50"
              )}
            />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </>
        )}
      </Button>
    </form>
  );
} 