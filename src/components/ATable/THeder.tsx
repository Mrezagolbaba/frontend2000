import { ColumnDef } from "@tanstack/react-table";
import {
  hasMobile,
  head,
  th,
  tr,
} from "assets/scss/components/Table/index.module.scss";

interface THeaderProps {
  columns: ColumnDef<any, any>[];
}

export default function THeder({ columns }: THeaderProps) {
  return (
    <thead className={head}>
      <tr className={tr}>
        {columns.map((col) => (
          <th
            className={`${th} ${(col?.meta as any)?.hasMobile ? hasMobile : ""}`}
            key={col.id}
          >
            {col.header as any}
          </th>
        ))}
      </tr>
    </thead>
  );
}
