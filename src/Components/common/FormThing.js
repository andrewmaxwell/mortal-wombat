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
    {options.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

const inputs = {
  text: TextField,
  number: NumberField,
  checkbox: Checkbox,
  select: Select,
};

export const FormThing = ({fields, data, onChange}) =>
  fields.map(({prop, label, type, info, show, options}) => {
    if (show && !show(data)) return null;
    const Field = inputs[type];
    return (
      <div key={prop} title={info}>
        <label>{label}</label>
        <Field
          value={data?.[prop]}
          onChange={(val) => onChange(val, prop)}
          options={options}
        />
      </div>
    );
  });
