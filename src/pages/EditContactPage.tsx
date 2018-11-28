import * as React from 'react';
import * as momemt from 'moment';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { FormGroupRow } from '../components/FormGroupRow';
import { FormGroupRowBtn } from '../components/FormGroupRowBtn';
import { http } from '../helpers/ApiConfig';
import { IPoc } from '../models/IPoc';

interface IProps extends RouteComponentProps {}

interface IState {
  pristine: boolean;
  invalidForm: boolean;
  poc: IPoc;
}

const emptyPoc: IPoc = {
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  passportId: '',
  nId: ''
};

export class EditContactPage extends React.Component<IProps, IState> {
  state = {
    pristine: true,
    invalidForm: false,
    poc: emptyPoc
  };

  async componentDidMount() {
    const { params } = this.props.match as any;
    if (params && params.id) {
      const response = await http.get<IPoc>(`/users/${params.id}`);
      if (response.data) {
        this.setState({ poc: response.data || emptyPoc });
      }
    } else {
      this.props.history.goBack();
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState(prevState => ({
      pristine: false,
      poc: {
        ...prevState.poc,
        [name]: value
      }
    }));
  };

  handleCheckIsRequired = (prop: any) => {
    const { pristine } = this.state;
    if (!pristine && !prop) return true;
    return false;
  };

  handleCheckInvalidForm = () => {
    const { id, dateOfBirth, firstName, lastName } = this.state.poc;
    let isInvalid = true;

    if (!id) isInvalid = true;
    else if (!firstName) isInvalid = true;
    else if (!lastName) isInvalid = true;
    else if (!dateOfBirth) isInvalid = true;
    else isInvalid = false;
    return isInvalid;
  };

  handleSaveChanges = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ pristine: false });
    const isInvalid = this.handleCheckInvalidForm();
    if (!isInvalid) {
      // todo check
      const response = await http.put(
        `/users/${this.state.poc.id}`,
        this.state.poc
      );
      if (response.status === 200) {
        this.props.history.push('/contacts');
      }
    }
  };

  render() {
    const {
      poc: {
        firstName,
        lastName,
        dateOfBirth,
        passportId,
        nId
      }
    } = this.state;
    return (
      <div className="card border-success mb-3">
        <div className="card-header d-flex justify-content-between">
          POC | Update
          <NavLink to="/contacts" className="btn btn-sm btn-info">
            Go Back
          </NavLink>
        </div>
        <div className="card-body" style={{ minHeight: '400px' }}>
          <form onSubmit={this.handleSaveChanges}>
            <FormGroupRow
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              required={this.handleCheckIsRequired(firstName)}
            />
            <FormGroupRow
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              required={this.handleCheckIsRequired(lastName)}
            />
            <FormGroupRow
              label="Birth Date"
              name="dateOfBirth"
              type="date"
              value={dateOfBirth && momemt(dateOfBirth).format('YYYY-MM-DD')}
              onChange={this.handleChange}
              required={this.handleCheckIsRequired(dateOfBirth)}
            />
            <FormGroupRow
              label="Passport ID"
              name="passportId"
              value={passportId || ''}
              onChange={this.handleChange}
            />
            <FormGroupRow
              label="NID"
              name="nId"
              type="number"
              value={nId || ''}
              onChange={this.handleChange}
            />
            <FormGroupRowBtn text="Update" />
          </form>
        </div>
      </div>
    );
  }
}
