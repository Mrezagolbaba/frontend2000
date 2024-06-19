import NoData from "assets/img/icons/depositIcon.svg";
import { ReactElement } from "react";
import { Row } from "@tanstack/react-table";
import {
  body,
  clickable,
  desktop,
  hasMobile,
  mobile,
  td,
  tr,
} from "assets/scss/components/Table/index.module.scss";

type Props = {
  rows: Row<any>[];
  noDataText: string;
  colLength: number;
  rowClickFn?: (id: string) => void;
  mobileView?: (row: Row<any>) => ReactElement;
};

export default function TBody({
  rows,
  noDataText,
  colLength,
  rowClickFn,
  mobileView,
}: Props) {
  return (
    <tbody className={body}>
      {rows.length > 0 ? (
        rows.map((row) => (
          <>
            {mobileView && (
              <tr className={`${tr} ${mobile}`}>
                <td>{mobileView(row)}</td>
              </tr>
            )}
            <tr
              key={row.id}
              className={`${tr} ${rowClickFn ? clickable : ""} ${mobileView ? desktop : ""}`}
              onClick={() => rowClickFn?.(row?.original?.id)}
            >
              {row.getAllCells().map((cell: any, index: number) => (
                <td
                  data-th={cell.column.columnDef.header}
                  className={`${td} ${cell.column.columnDef?.meta?.hasMobile ? hasMobile : ""}`}
                  key={index}
                >
                  {cell.getValue() as any}
                </td>
              ))}
            </tr>
          </>
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
