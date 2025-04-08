import { Separator } from "../../../components/ui/separator";
import { AppearanceForm } from "../../../components/AppearanceForm/AppearanceForm";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>

        <div className="mt-4 rounded-md bg-muted p-3 border border-border">
          <p className="text-sm text-muted-foreground">
            This feature will be available soon as part of an upcoming update.
          </p>
        </div>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
