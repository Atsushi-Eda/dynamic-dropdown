import React from 'react';
import {Table, Dropdown, Button} from '@kintone/kintone-ui-component';
import ChoiceCombinations from "./ChoiceCombinations";
import selectItemManager from './selectItemManager';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.savedValue.length ? props.savedValue : [{}],
    }
  }

  save = () => {
    kintone.plugin.app.setConfig({
      dynamicDropdowns: JSON.stringify(this.state.value)
    });
  }
  render() {
    const columns = [{
      header: 'space',
      cell: ({rowIndex, onCellChange}) =>
        <Dropdown
          items={selectItemManager.createItems(this.props.spaceIds)}
          value={selectItemManager.getValue(this.props.spaceIds, this.state.value[rowIndex].space)}
          onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, 'space')}
        />
    }, {
      header: 'majorChoiceField',
      cell: ({rowIndex, onCellChange}) =>
        <Dropdown
          items={selectItemManager.createItemsForFields(this.props.fields)}
          value={selectItemManager.getValueForFields(this.props.fields, this.state.value[rowIndex].majorChoiceField)}
          onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, 'majorChoiceField')}
        />
    }, {
      header: 'minorChoiceField',
      cell: ({rowIndex, onCellChange}) =>
        <Dropdown
          items={selectItemManager.createItemsForFields(this.props.fields.filter(({type}) => type !== 'RADIO_BUTTON'))}
          value={selectItemManager.getValueForFields(this.props.fields, this.state.value[rowIndex].minorChoiceField)}
          onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, 'minorChoiceField')}
        />
    }, {
      header: 'choiceCombinations',
      cell: ({rowIndex, onCellChange}) =>
        <ChoiceCombinations
          value={this.state.value[rowIndex].choiceCombinations}
          majorChoiceOptions={
            this.props.fields.find(
              ({code}) => code === this.state.value[rowIndex].majorChoiceField
            )?.options
          }
          onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, 'choiceCombinations')}
        />
    }];
    return (
      <div>
        <Table
          columns={columns}
          data={this.state.value}
          defaultRowData={{}}
          onRowAdd={({data}) => this.setState({value: data})}
          onRowRemove={({data}) => this.setState({value: data})}
          onCellChange={({data}) => this.setState({value: data})}
        />
        <Button text='save' type='submit' onClick={this.save} />
      </div>
    );
  }
}
