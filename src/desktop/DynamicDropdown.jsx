import React from 'react';
import {Label, Dropdown} from '@kintone/kintone-ui-component';

export default class DynamicDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.getMinorChoices(props.savedMajorChoice).includes(props.savedMinorChoice) ? props.savedMinorChoice : '',
      items: this.getItems(props.savedMajorChoice)
    }
    this.addMajorChoiceChangeEventHandler();
  }
  addMajorChoiceChangeEventHandler() {
    kintone.events.on([
      `app.record.create.change.${this.props.majorChoiceField}`,
      `app.record.edit.change.${this.props.majorChoiceField}`,
    ], event => this.majorChoiceChangeEventHandler(event));
  }
  majorChoiceChangeEventHandler(event) {
    this.setState({value: ''});
    this.setState({items: this.getItems(event.record[this.props.majorChoiceField].value)});
    event.record[this.props.minorChoiceField].value = '';
    return event;
  }
  minorChoiceChangeEventHandler(value) {
    const record = kintone.app.record.get();
    record.record[this.props.minorChoiceField].value = value;
    kintone.app.record.set(record);
    this.setState({value});
  }
  getMinorChoices(majorChoice) {
    return this.props.choiceCombinations.find(
      choiceCombination => choiceCombination.majorChoice === majorChoice
    )?.minorChoices.map(
      ({minorChoice}) => minorChoice
    ) || [];
  }
  getItems(majorChoice) {
    return [{label: '-----', value: ''}].concat(this.getMinorChoices(majorChoice).map(choice => ({label: choice, value: choice})));
  }
  render() {
    return <div>
      <Label text={this.props.label} />
      <Dropdown
        items={this.state.items}
        value={this.state.value}
        onChange={value => this.minorChoiceChangeEventHandler(value)}
      />
    </div>
  }
}