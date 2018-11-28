import * as React from 'react';
import * as momemt from 'moment';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { http } from '../helpers/ApiConfig';
import { IPoc } from '../models/IPoc';

interface IState {
  poc: IPoc;
}

interface IProps extends RouteComponentProps {}

export class DetailsContactPage extends React.Component<IProps, IState> {
  state = {
    poc: {
      id: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      nId: '',
      passportId: '',
      createdAt: '',
    }
  };

  async componentDidMount() {
    const { params } = this.props.match as any;
    if (params && params.id) {
      const response = await http.get<IPoc>(`/users/${params.id}`);
      if (response.data) {
        this.setState({ poc: response.data });
      }
    } else {
      this.props.history.goBack();
    }
  }

  render() {
    const { poc } = this.state;
    return (
      <div className="card border-success mb-3">
        <div className="card-header d-flex justify-content-between">
          POC Details
          <NavLink to="/contacts" className="btn btn-sm btn-info">
            Go Back
          </NavLink>
        </div>
        <div className="card-body" style={{ minHeight: '400px' }}>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th style={{ width: 120 }}>Name</th>
                <td>
                  {poc.firstName} {poc.lastName}
                </td>
              </tr>
              <tr>
                <th>Birth Date</th>
                <td>{poc.dateOfBirth && momemt(poc.dateOfBirth).format('YYYY-MM-DD')}</td>
              </tr>
              <tr>
                <th>Passport</th>
                <td>{poc.passportId}</td>
              </tr>
              <tr>
                <th>NID</th>
                <td>{poc.nId}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{poc.createdAt && momemt(poc.createdAt).format('YYYY-MM-DD')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
