import { statusObject } from "../constants/statusObject.constant";
import type { Status } from "../types/status.enum";

export default function StatusDropDown({
  defaulValue,
  handleChange,
}: {
  defaulValue: string;
  handleChange: (value: string) => void;
}) {
  return (
    <>
      Status:
      <select
        name="status"
        id="status"
        value={defaulValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {Object.keys(statusObject).map((key) => {
          const status = statusObject[key as Status];
          return status ? (
            <option key={key} value={status}>
              {status}
            </option>
          ) : null;
        })}
      </select>
    </>
  );
}
