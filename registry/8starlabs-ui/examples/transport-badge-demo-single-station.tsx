import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoSingleStation() {
  return (
    <div className="flex flex-wrap gap-3">
      <TransportBadge system="SMRT" stationCode="NS1" />
      <TransportBadge system="SMRT" stationCode="EW12" />
      <TransportBadge system="SMRT" stationCode="NE6" />
      <TransportBadge system="SMRT" stationCode="CC4" />
      <TransportBadge system="SMRT" stationCode="DT15" />
      <TransportBadge system="SMRT" stationCode="TE9" />
    </div>
  );
}
