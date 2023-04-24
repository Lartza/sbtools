import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { actionTypeElements, clipButtonStyle, formatDuration } from './utils';

const columnHelper = createColumnHelper();

const timeSubmittedColumn = columnHelper.accessor('timeSubmitted', {
  header: 'Submitted',
  cell: (info) => new Date(info.getValue()).toISOString().slice(0, -3).replace('T', ' '),
  enableColumnFilter: false,
});
const videoIDColumn = columnHelper.accessor('videoID', {
  header: 'VideoID',
  cell: (info) => (
    <span>
      <Link to={`/video/${info.getValue()}`}>{info.getValue()}</Link>
      <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
      <a href="https://youtu.be/fnsXQ16_3R4">YT</a>
    </span>
  ),
  enableColumnFilter: false,
});
const startTimeColumn = columnHelper.accessor('startTime', {
  header: 'Start',
  cell: (info) => formatDuration(info.getValue()),
  enableColumnFilter: false,
});
const endTimeColumn = columnHelper.accessor('endTime', {
  header: 'End',
  cell: (info) => formatDuration(info.getValue()),
  enableColumnFilter: false,
});
const lengthColumn = columnHelper.accessor('length', {
  header: 'Length',
  cell: (info) => formatDuration(info.getValue()),
});
const votesColumn = columnHelper.accessor('votes', {
  header: 'Votes',
});
const viewsColumn = columnHelper.accessor('views', {
  header: 'Views',
});
const categoryColumn = columnHelper.accessor('category', {
  header: 'Category',
  enableColumnFilter: false,
});
const actionTypeColumn = columnHelper.accessor('actionType', {
  header: 'Action',
  cell: (info) => actionTypeElements[info.getValue()],
  enableColumnFilter: false,
});
const hiddenColumn = columnHelper.accessor('hidden', {
  header: 'Hidden',
  cell: (info) => (info.getValue() ? <span title="This segment is hidden due to video duration change.">❌</span> : '—'),
  enableColumnFilter: false,
});
const shadowHiddenColumn = columnHelper.accessor('shadowHidden', {
  header: 'S.hidden',
  cell: (info) => (info.getValue() ? <span title="This segment has been shadowhidden.">🥷</span> : '—'),
  enableColumnFilter: false,
});
const UUIDColumn = columnHelper.accessor('UUID', {
  header: 'UUID',
  cell: (info) => (
    <div>
      <Form.Control as="textarea" style={{ maxWidth: 150 }} value={info.getValue()} readOnly />
      <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
      <Link to={`/uuid/${info.getValue()}`} style={{ textDecoration: 'none' }}>🔗</Link>
    </div>
  ),
  enableColumnFilter: false,
});
const userNameColumn = columnHelper.accessor('userName', {
  header: 'Username',
  cell: (info) => (info.getValue() ? (
    <div>
      <Form.Control as="textarea" value={info.getValue()} readOnly />
      <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
      <Link to={`/username/${info.getValue()}`} style={{ textDecoration: 'none' }}>🔗</Link>
    </div>
  ) : '—'),
  enableColumnFilter: false,
});
const userIDColumn = columnHelper.accessor('userID', {
  header: 'UserID',
  cell: (info) => (
    <div>
      <Form.Control as="textarea" style={{ maxWidth: 200 }} value={info.getValue()} readOnly />
      <button type="button" style={clipButtonStyle} onClick={() => { navigator.clipboard.writeText(info.getValue()); }}>✂</button>
      <Link to={`/userid/${info.getValue()}`} style={{ textDecoration: 'none' }}>🔗</Link>
    </div>
  ),
  enableColumnFilter: false,
});

const columns = [
  timeSubmittedColumn,
  videoIDColumn,
  startTimeColumn,
  endTimeColumn,
  lengthColumn,
  votesColumn,
  viewsColumn,
  categoryColumn,
  actionTypeColumn,
  hiddenColumn,
  shadowHiddenColumn,
  UUIDColumn,
  userNameColumn,
  userIDColumn,
];
const videoColumns = [
  timeSubmittedColumn,
  startTimeColumn,
  endTimeColumn,
  lengthColumn,
  votesColumn,
  viewsColumn,
  categoryColumn,
  actionTypeColumn,
  hiddenColumn,
  shadowHiddenColumn,
  UUIDColumn,
  userNameColumn,
  userIDColumn,
];
const usernameColumns = [
  timeSubmittedColumn,
  videoIDColumn,
  startTimeColumn,
  endTimeColumn,
  lengthColumn,
  votesColumn,
  viewsColumn,
  categoryColumn,
  actionTypeColumn,
  hiddenColumn,
  shadowHiddenColumn,
  UUIDColumn,
  userIDColumn,
];

const userColumns = [
  timeSubmittedColumn,
  videoIDColumn,
  startTimeColumn,
  endTimeColumn,
  lengthColumn,
  votesColumn,
  viewsColumn,
  categoryColumn,
  actionTypeColumn,
  hiddenColumn,
  shadowHiddenColumn,
  UUIDColumn,
];

const UUIDColumns = [
  timeSubmittedColumn,
  videoIDColumn,
  startTimeColumn,
  endTimeColumn,
  lengthColumn,
  votesColumn,
  viewsColumn,
  categoryColumn,
  actionTypeColumn,
  hiddenColumn,
  shadowHiddenColumn,
  userNameColumn,
  userIDColumn,
];

export {
  columns, videoColumns, usernameColumns, userColumns, UUIDColumns,
};
