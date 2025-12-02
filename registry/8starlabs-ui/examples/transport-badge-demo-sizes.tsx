import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoSizes() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <TransportBadge system="SMRT" stationCode="NS1" size="xs" />
        <TransportBadge system="SMRT" stationCode={["NS1", "DT24"]} size="xs" />
      </div>
      <div className="flex items-center gap-3">
        <TransportBadge system="SMRT" stationCode="EW12" size="sm" />
        <TransportBadge
          system="SMRT"
          stationCode={["EW12", "DT14"]}
          size="sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <TransportBadge system="SMRT" stationCode="CC4" size="md" />
        <TransportBadge system="SMRT" stationCode={["CC4", "NE6"]} size="md" />
      </div>
      <div className="flex items-center gap-3">
        <TransportBadge system="SMRT" stationCode="DT15" size="lg" />
        <TransportBadge
          system="SMRT"
          stationCode={["DT15", "TE17"]}
          size="lg"
        />
      </div>
    </div>
  );
}
