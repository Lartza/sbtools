import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Alert,
  Col, Pagination, Row, Table,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';
import { useGetSponsortimesByUsernameQuery } from '../slices/sponsortimeApiSlice';
import { actionTypeElements, clipButtonStyle, formatDuration } from '../utils';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('timeSubmitted', {
    header: 'Submitted',
    cell: (info) => new Date(info.getValue()).toISOString().slice(0, -3).replace('T', ' '),
  }),
  columnHelper.accessor('videoID', {
    header: 'VideoID',
    cell: (info) => (
      <span>
        <Link to={`/video/${info.getValue()}`}>{info.getValue()}</Link>
        <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
        <a href="https://youtu.be/fnsXQ16_3R4">YT</a>
      </span>
    ),
  }),
  columnHelper.accessor('startTime', {
    header: 'Start',
    cell: (info) => formatDuration(info.getValue()),
  }),
  columnHelper.accessor('endTime', {
    header: 'End',
    cell: (info) => formatDuration(info.getValue()),
  }),
  columnHelper.accessor((row) => row.endTime - row.startTime, {
    header: 'Length',
    cell: (info) => formatDuration(info.getValue()),
    enableSorting: false,
  }),
  columnHelper.accessor('votes', {
    header: 'Votes',
  }),
  columnHelper.accessor('views', {
    header: 'Views',
  }),
  columnHelper.accessor('category', {
    header: 'Category',
  }),
  columnHelper.accessor('actionType', {
    header: 'Action',
    cell: (info) => actionTypeElements[info.getValue()],
  }),
  columnHelper.accessor('hidden', {
    header: 'Hidden',
    cell: (info) => (info.getValue() ? <span title="This segment is hidden due to video duration change.">❌</span> : '—'),
  }),
  columnHelper.accessor('shadowHidden', {
    header: 'S.hidden',
    cell: (info) => (info.getValue() ? <span title="This segment has been shadowhidden.">🥷</span> : '—'),
  }),
  columnHelper.accessor('UUID', {
    header: 'UUID',
    cell: (info) => (
      <div>
        <Form.Control as="textarea" style={{ maxWidth: 150 }} value={info.getValue()} readOnly />
        <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
        <Link to={`/uuid/${info.getValue()}`} style={{ textDecoration: 'none' }}>🔗</Link>
      </div>
    ),
  }),
  columnHelper.accessor('userID', {
    header: 'UserID',
    cell: (info) => (
      <div>
        <Form.Control as="textarea" style={{ maxWidth: 200 }} value={info.getValue()} readOnly />
        <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
        <Link to={`/userid/${info.getValue()}`} style={{ textDecoration: 'none' }}>🔗</Link>
      </div>
    ),
  }),
];

function SponsortimeTable() {
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState([{ id: 'timeSubmitted', desc: true }]);

  const params = useParams();
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSponsortimesByUsernameQuery({
    userName: params.userName, pageIndex, pageSize, sorting,
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
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    manualPagination: true,
    manualSorting: true,
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
