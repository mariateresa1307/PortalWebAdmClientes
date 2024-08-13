import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ReactNode } from "react";

interface CustomTable {
  columns: Array<{
    title: string;
    field: string | null;
    render?: (row: any) => ReactNode;
  }>;
  data: Array<any>;
  pagination: {
    count: number;
    page: number;
    itemsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number
    ) => void;
  };
}
export const CustomTable = (props: CustomTable) => {
  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <TableHead>
            <TableRow>
              {props.columns.map((headCell) => (
                <TableCell
                  key={headCell.title}
                  align={"center"}
                  padding={"normal"}
                >
                  {headCell.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => {
              return (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                >
                  {props.columns.map((headCell) => {
                    let value = null;

                    if (headCell.field) {
                      value = row[headCell.field];
                    } else {
                      if (headCell.render) {
                        value = headCell.render(row);
                      }
                    }

                    return (
                      <TableCell key={headCell.field + row.id} align={"center"}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={props.pagination.count}
        rowsPerPage={props.pagination.itemsPerPage}
        page={props.pagination.page}
        onPageChange={props.pagination.onPageChange}
      />
    </>
  );
};
