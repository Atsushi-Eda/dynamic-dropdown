import React from 'react';
import {Table, Text} from '@kintone/kintone-ui-component';

const MinorChoices = props => {
  const value = props.value || [{}];
  const columns = [{
    header: 'minorChoice',
    cell: ({rowIndex, onCellChange}) =>
      <Text
        value={value[rowIndex].minorChoice || ''}
        onChange={newValue => onCellChange(newValue, value, rowIndex, 'minorChoice')}
      />
  }];
  return (
    <Table
      columns={columns}
      data={value}
      defaultRowData={{}}
      onRowAdd={({data}) => props.onChange(data)}
      onRowRemove={({data}) => props.onChange(data)}
      onCellChange={({data}) => props.onChange(data)}
    />
  );
};
export default MinorChoices;
