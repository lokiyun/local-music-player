import React, { FC } from 'react'
import classnames from 'classnames'
import { TableHeadProps, TableBodyProps, TableRowProps, TableProps } from '../../interface';

export const TableHead: FC<TableHeadProps> = (props) => {
  const {
    children
  } = props
  
  return (
    <thead>
      <tr>
        { children }
      </tr>
    </thead>
  )
}

export const TableBody: FC<TableBodyProps> = (props) => {
  const {
    children
  } = props
  return (
    <tbody>
      { children }
    </tbody>
  )
}

export const TableRow: FC<TableRowProps> = (props) => {
  const {
    children,
    ...restProps
  } = props
  return (
    <tr {...restProps} className="table-row">
      { children }
    </tr>
  )
}

export const Table: FC<TableProps> = (props) => {
  const {
    children,
    border,
    striped,
  } = props
  const classes = classnames('pure-table', {
    'pure-table-bordered': border,
    'pure-table-striped': striped
  })
  return (
    <table className={classes}>
      { children }
    </table>
  )
}