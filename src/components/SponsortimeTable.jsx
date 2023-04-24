import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Alert, Col, Pagination, Row, Table,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useGetSponsortimesQuery } from '../slices/sponsortimeApiSlice';
import Filter from './Filter';
import FrontpageNavigation from './FrontpageNavigation';
import { columns } from '../columns';

function SponsortimeTable() {
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState([{ id: 'timeSubmitted', desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState(
    [],
  );

  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSponsortimesQuery({
    pageIndex, pageSize, sorting, columnFilters,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  let sponsortimes = [];
  let pageCount = -1;

  if (isSuccess) {
    sponsortimes = data.items;
    pageCount = data.pages;
  }

  const table = useReactTable({
    data: sponsortimes,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  if (isLoading) {
    return (<Row><Col><Alert variant="info">Loading...</Alert></Col></Row>);
  }
  if (isError) {
    return (<div>{error.error}</div>);
  }

  return (
    <>
      <FrontpageNavigation />
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
                        <>
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
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
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
      <Row>
        <Col>
          <Pagination>
            <Pagination.First
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />
            <Pagination.Prev
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
            <Pagination.Next
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
            <Pagination.Last
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled="true"
            />
          </Pagination>
        </Col>
        <Col>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}
            {' '}
            of
            {' '}
            {table.getPageCount()}
          </strong>
        </Col>
        <Col>
          Go to page:
          <Form.Control
            type="number"
            min="1"
            max={pageCount === -1 ? null : pageCount}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </Col>
        <Col>
          <Form.Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show
                {' '}
                {size}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
}

export default SponsortimeTable;
