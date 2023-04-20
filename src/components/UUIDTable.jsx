import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Alert, Col, Row, Table,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';
import { useGetSponsortimesByUUIDQuery } from '../slices/sponsortimeApiSlice';
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
  columnHelper.accessor('userName', {
    header: 'Username',
    cell: (info) => (info.getValue() ? (
      <div>
        <Form.Control as="textarea" value={info.getValue()} readOnly />
        <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
        <Link to={`/username/${info.getValue()}`} style={{ textDecoration: 'none' }}>🔗</Link>
      </div>
    ) : '—'),
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
    columns,
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
