import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from '@/lib/types';

interface SettingsFormProps {
  settings: Settings;
  onSubmit: (settings: Partial<Settings>) => Promise<void>;
}

export function SettingsForm({ settings, onSubmit }: SettingsFormProps) {
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
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="defaultRate">Default Hourly Rate ($)</Label>
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roundToNearest">Round to Nearest (minutes)</Label>
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxPercentage">Tax Percentage (%)</Label>
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
          />
        </div>
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  );
} 