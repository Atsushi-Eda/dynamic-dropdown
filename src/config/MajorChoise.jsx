import React from 'react';
import {Dropdown, Text} from '@kintone/kintone-ui-component';
import selectItemManager from './selectItemManager';

const MajorChoice = props => {
  const value = props.value || '';
  if(!props.options) return (
    <Text
      value={value}
      onChange={props.onChange}
    />
  )
  const items = Object.values(props.options).sort((a, b) => {
    if(a.index > b.index) return 1;
    if(a.index < b.index) return -1;
    return 0;
  }).map(({label}) => label);
  return (
    <Dropdown
      items={selectItemManager.createItems(items)}
      value={selectItemManager.getValue(items, value)}
      onChange={props.onChange}
    />
  );
};
export default MajorChoice;
