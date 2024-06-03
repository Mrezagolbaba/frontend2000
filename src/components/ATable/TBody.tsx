import { Row } from "@tanstack/react-table";
import { body, td, tr } from "assets/scss/components/Table/index.module.scss";
import NoData from "assets/img/icons/depositIcon.svg";

type Props = {
  rows: Row<any>[];
  noDataText: string;
  colLength: number;
};

export default function TBody({ rows, noDataText, colLength }: Props) {

  return (
    <tbody className={body}>
      {rows.length > 0 ? (
        rows.map((row) => (
          <tr key={row.id} className={tr}>
            {row.getAllCells().map((cell: any, index: number) => (
              <td className={td} key={index}>
                {cell.getValue() as any}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={colLength}
            className="text-center"
            style={{ boxShadow: "none" }}
          >
            <img
              src={NoData}
              style={{
                height: "50px",
                width: "50px",
                margin: "20px 0",
              }}
            />
            <p>{noDataText}</p>
          </td>
        </tr>
      )}
    </tbody>
  );
}
