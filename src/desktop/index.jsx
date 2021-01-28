import React from 'react';
import ReactDOM from 'react-dom';
import DynamicDropdown from "./DynamicDropdown";
import {Connection, App} from '@kintone/kintone-js-sdk';
const kintoneApp = new App(new Connection);

(PLUGIN_ID => {
  kintone.events.on([
    'app.record.create.show',
    'app.record.edit.show',
  ], event => {
    kintoneApp.getFormFields({
      app: kintone.app.getId()
    }).then(({properties}) => {
      const dynamicDropdowns = JSON.parse(kintone.plugin.app.getConfig(PLUGIN_ID).dynamicDropdowns);
      dynamicDropdowns.forEach(dynamicDropdown => {
        kintone.app.record.setFieldShown(dynamicDropdown.minorChoiceField, false);
        ReactDOM.render(
          <DynamicDropdown
            label={properties[dynamicDropdown.minorChoiceField].label}
            choiceCombinations={dynamicDropdown.choiceCombinations}
            majorChoiceField={dynamicDropdown.majorChoiceField}
            minorChoiceField={dynamicDropdown.minorChoiceField}
            savedMinorChoice={event.record[dynamicDropdown.minorChoiceField].value}
            savedMajorChoice={event.record[dynamicDropdown.majorChoiceField].value}
          />,
          kintone.app.record.getSpaceElement(dynamicDropdown.space)
        );
      });
    });
  });
})(kintone.$PLUGIN_ID);
