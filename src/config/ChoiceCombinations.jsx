import React from 'react';
import {Table, Text} from '@kintone/kintone-ui-component';
import MajorChoice from "./MajorChoise";
import MinorChoices from "./MinorChoises";

const ChoiceCombinations = props => {
  const value = props.value || [{}];
  const columns = [{
    header: 'majorChoice',
    cell: ({rowIndex, onCellChange}) =>
      <MajorChoice
        options={props.majorChoiceOptions}
        value={value[rowIndex].majorChoice}
        onChange={newValue => onCellChange(newValue, value, rowIndex, 'majorChoice')}
      />
  }, {
    header: 'minorChoices',
    cell: ({rowIndex, onCellChange}) =>
      <MinorChoices
        value={value[rowIndex].minorChoices}
        onChange={newValue => onCellChange(newValue, value, rowIndex, 'minorChoices')}
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
export default ChoiceCombinations;
