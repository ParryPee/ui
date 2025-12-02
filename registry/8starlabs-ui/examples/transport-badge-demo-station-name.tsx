import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoStationName() {
  return (
    <div className="flex flex-col gap-3">
      <TransportBadge
        system="SMRT"
        stationCode="NS1"
        stationName="Jurong East"
        showStationName
      />
      <TransportBadge
        system="SMRT"
        stationCode="NE12"
        stationName="Serangoon"
        showStationName
      />
      <TransportBadge
        system="SMRT"
        stationCode={["NS27", "CC15"]}
        stationName="Marina Bay"
        showStationName
      />
      <TransportBadge
        system="SMRT"
        stationCode="DT1"
        stationName="Bukit Panjang"
        showStationName
      />
    </div>
  );
}
