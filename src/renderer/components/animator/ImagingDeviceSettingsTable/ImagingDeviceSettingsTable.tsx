import { Table, Text } from "@mantine/core";
import { useContext } from "react";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import "./ImagingDeviceSettingsTable.css";
import { ImagingDeviceSettingsTr } from "./ImagingDeviceSettingsTr/ImagingDeviceSettingsTr";

export const ImagingDeviceSettingsTable = () => {
  const { deviceStatus } = useContext(ImagingDeviceContext);

  if (deviceStatus?.settings.length === 0) {
    return <Text>No settings available for this Capture Source.</Text>;
  }

  return (
    <Table classNames={{ tr: "settings-table-row" }}>
      <Table.Tbody>
        {deviceStatus?.settings.map((setting) => (
          <ImagingDeviceSettingsTr key={setting.name} setting={setting} />
        ))}
      </Table.Tbody>
    </Table>
  );
};