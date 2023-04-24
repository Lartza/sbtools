import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Alert, Col, Row, Table,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetSponsortimesByUUIDQuery } from '../slices/sponsortimeApiSlice';
import { UUIDColumns } from '../columns';

function UUIDTable() {
  const params = useParams();
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSponsortimesByUUIDQuery(params.UUID);

  let segment = [];
  if (isSuccess) {
    segment = [data];
  }

  const table = useReactTable({
    data: segment,
    columns: UUIDColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (<Row><Col><Alert variant="info">Loading...</Alert></Col></Row>);
  }
  if (isError) {
    return (<div>{error.error}</div>);
  }

  return (
    <>
      {isFetching ? <Row><Col><Alert variant="info">Loading...</Alert></Col></Row> : null}
      <Row>
        <Col>
          <Table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default UUIDTable;
