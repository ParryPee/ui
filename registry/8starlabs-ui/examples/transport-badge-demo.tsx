import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <TransportBadge system="SMRT" stationCode="NS1" />
      <TransportBadge system="SMRT" stationCode={["NS1", "DT24", "TE12"]} />
      <TransportBadge system="SMRT" stationCode="CC12" />
      <TransportBadge
        system="SMRT"
        stationCode="NE12"
        stationName="Serangoon"
        showStationName
      />
      <TransportBadge system="SMRT" stationCode="TE12" size="xs" />
      <TransportBadge system="SMRT" stationCode="DT1" size="lg" />
    </div>
  );
}
