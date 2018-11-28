import * as React from 'react';

interface IProps {
  value?: string;
  name: string;
  type?: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FormGroupRow: React.SFC<IProps> = props => {
  const { type = 'text', required, ...restProps } = props;
  return (
    <div className="form-group row">
      <label htmlFor={restProps.name} className="col-sm-2 col-form-label">
        {restProps.label}
      </label>
      <div className="col-sm-4">
        <input
          type={type}
          id={restProps.name}
          className="form-control"
          placeholder={restProps.label}
          name={restProps.name}
          value={restProps.value}
          onChange={restProps.onChange}
        />
        {required && (
          <span className="text-danger">{props.label} field is required</span>
        )}
      </div>
    </div>
  );
};
