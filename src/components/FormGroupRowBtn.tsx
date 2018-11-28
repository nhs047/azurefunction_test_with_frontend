import * as React from 'react';

interface IProps {
  type?: string;
  text?: string;
  disabled?: boolean;
}

export const FormGroupRowBtn: React.SFC<IProps> = props => {
  const { type = 'submit', text = 'Save Changes', disabled = false } = props;
  return (
    <div className="form-group row">
      <div className="offset-2 col-sm-4">
        <button type={type} className="btn btn-primary" disabled={disabled}>
          {text}
        </button>
      </div>
    </div>
  );
};
