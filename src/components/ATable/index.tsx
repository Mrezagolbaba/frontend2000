import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import THeder from "./THeder";
import TBody from "./TBody";
import TFilter from "./TFilter";
import TLoading from "./TLoading";

import {
  wrapper,
  table,
  small__view,
} from "assets/scss/components/Table/index.module.scss";

type Props = {
  data: any[];
  columns: ColumnDef<any, any>[];
  hasFilter?: boolean;
  isLoading?: boolean;
  noDataText?: string;
  size?: "small" | "large";
  rowClickFn?: (id: string) => void;
};

export default function ATable({
  columns,
  data,
  hasFilter = false,
  isLoading = false,
  noDataText = "دیتایی وجود ندارد.",
  size = "large",
  rowClickFn,
}: Props) {
  const { _getColumnDefs, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.uuid,
  });

  return (
    <div className={wrapper}>
      {hasFilter && <TFilter columns={columns} />}
      <table className={`${table} ${size === "small" ? small__view : ""}`}>
        <THeder columns={_getColumnDefs()} />
        {isLoading ? (
          <TLoading columns={_getColumnDefs()} />
        ) : (
          <TBody
            colLength={_getColumnDefs().length}
            noDataText={noDataText}
            rowClickFn={rowClickFn}
            rows={data?.length > 0 ? getRowModel().rows : []}
          />
        )}
      </table>
    </div>
  );
}
