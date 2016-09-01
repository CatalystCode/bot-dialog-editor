import React from 'react';
import Form from 'react-json-editor';
import {Link} from 'react-router';
import {first, without, findWhere} from 'underscore';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    var jsonContainer = document.getElementById('jsonContainer');

    var filePath = '/dialogs/';
    var version = this.props.params.version;
    if (typeof version === 'undefined' || version === null || version === 'active') {
      filePath = filePath + 'active/';
    } else {
      filePath = filePath + 'versions/' + version + '/';
    }

    var starting_value = {
      name: "John Smith",
      age: 35,
      gender: "male",
      location: {
        city: "San Francisco",
        state: "California"
      },
      pets: [
        {
          name: "Spot",
          type: "dog",
          fixed: true
        },
        {
          name: "Whiskers",
          type: "cat",
          fixed: false
        }
      ]
    };

    var options = {
      theme: "bootstrap3",
      iconlib: "bootstrap3",
      ajax: true,

      required_by_default: true,
      disable_edit_json: true,
      disable_properties: true,
      disable_collapse: true,
      no_additional_properties: true,
      disable_array_delete_all_rows: true,
      disable_array_delete_last_row: true,

      // The schema for the editor
      schema: {
        $ref: "/dialogs/schema/dialog.json"
      },
      startval: {
        $ref: filePath + this.props.params.dialog
      }
    };

    JSONEditor.plugins.selectize.enable = true;
    JSONEditor.defaults.options.template = "underscore";
    JSONEditor.defaults.templates.underscore = function() {
      if(!window._) return false;

      return {
        compile: function(template) {
          return function(context) {
            return window._.template(template)(context);
          };
        }
      };
    };

    var editor = null;
    $.when($.getJSON(options.schema["$ref"]), $.getJSON(options.startval["$ref"]))
      .done(function(schema, startval) {
        options.schema = schema[0];
        options.startval = startval[0];

        editor = new JSONEditor(jsonContainer, options);
      });

  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  onSubmit(dialog) {
  }

  getSchema() {
    var schema = {
      type      : "object",
      properties: {
        comment: { title: "Comment", description: 'ho ho ho' },
        email  : { title: "Email" },
        name   : { title: "Name" }
      },
      "x-ordering": ["name", "email", "comment"]
    };

    return schema;
  }

  render() {

    return (
      <div id='jsonContainer' className='container json-editor'></div>
    );
  }
}

export default Edit;