import {lazy, Suspense} from 'react';

const Editor = lazy(() => import('@monaco-editor/react'));

const TextField = ({value = '', onChange}) => (
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
);

const NumberField = ({value = '', onChange}) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Checkbox = ({value = false, onChange}) => (
  <input
    type="checkbox"
    checked={value}
    onChange={(e) => onChange(e.target.checked)}
  />
);

const Select = ({value, onChange, options}) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    <option></option>
    {options.map(({label, value}) => (
      <option key={label} value={value}>
        {label}
      </option>
    ))}
  </select>
);

// TODO: add code validation
const editorOptions = {minimap: {enabled: false}};
export const Code = ({value, onChange}) => (
  <Suspense fallback="Loading...">
    <Editor
      height={200}
      width={800}
      theme="vs-dark"
      defaultLanguage="javascript"
      value={value}
      onChange={onChange}
      options={editorOptions}
    />
  </Suspense>
);

const inputs = {
  text: TextField,
  number: NumberField,
  checkbox: Checkbox,
  select: Select,
  code: Code,
};

export const FormThing = ({fields, data, defaults, onChange}) =>
  fields.map(({prop, label, type, info, show, options}) => {
    if (show && !show(data)) return null;
    const Field = inputs[type];
    const value = data?.[prop] === undefined ? defaults?.[prop] : data?.[prop];
    return (
      <div key={prop} title={info}>
        <label>{label}</label>
        <Field
          value={value}
          onChange={(val) => onChange(val, prop)}
          options={options}
        />

        {defaults && value !== defaults?.[prop] && (
          <button
            onClick={() => onChange(null, prop)}
            title={`Click to reset ${label} to ${JSON.stringify(
              defaults?.[prop],
            )}`}
          >
            Reset
          </button>
        )}
      </div>
    );
  });
