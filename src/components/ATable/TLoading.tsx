import { ColumnDef } from "@tanstack/react-table";
import { body, td, tr } from "assets/scss/components/Table/index.module.scss";

interface TLoadingProps {
  columns: ColumnDef<any, any>[];
}
export default function TLoading({ columns }: TLoadingProps) {
  return (
    <tbody className={body}>
      {["", "", ""].map((row, rowIndex) => (
        <tr key={rowIndex} className={tr}>
          {columns.map((col, colIndex) => (
            <td className={`${td} placeholder-glow`} key={colIndex}>
              <div className="placeholder col-12 rounded" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
