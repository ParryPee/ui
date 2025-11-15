import StatusIndicator from "@/registry/8starlabs-ui/blocks/status-indicator";
import { Card } from "@/registry/8starlabs-ui/ui/card";

type Props = {};

const StatusIndicatorCard = (props: Props) => {
  return (
    <Card className="flex justify-center items-center w-full">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">System Indicators</h3>
          <p className="text-muted-foreground text-sm">
            Different states of the Status Indicator component.
          </p>
        </div>

        <StatusIndicator state="active" label="All systems operational" />
        <StatusIndicator state="down" label="Systems down" />
        <StatusIndicator state="idle" label="Systems idle" />
        <StatusIndicator state="fixing" label="Diagnosing issue, fixing" />
      </div>
    </Card>
  );
};

export default StatusIndicatorCard;
