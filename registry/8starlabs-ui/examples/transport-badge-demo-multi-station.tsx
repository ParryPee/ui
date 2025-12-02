import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoMultiStation() {
  return (
    <div className="flex flex-col gap-3">
      <TransportBadge system="SMRT" stationCode={["NS1", "EW24"]} />
      <TransportBadge system="SMRT" stationCode={["NS27", "CC15"]} />
      <TransportBadge system="SMRT" stationCode={["DT14", "CC10"]} />
      <TransportBadge system="SMRT" stationCode={["NS1", "DT24", "TE12"]} />
    </div>
  );
}
