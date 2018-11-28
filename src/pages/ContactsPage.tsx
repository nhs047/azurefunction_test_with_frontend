import * as React from 'react';
import * as momemt from 'moment';
import { NavLink } from 'react-router-dom';
import { http } from '../helpers/ApiConfig';
import { IPoc } from '../models/IPoc';

interface IState {
  contacts: IPoc[];
}

export class ContactsPage extends React.Component<{}, IState> {
  state = {
    contacts: [] as IPoc[]
  };

  async componentDidMount() {
    try {
      const response = await http.get<IPoc[]>(`/users`);
      if (response.status === 200) {
        this.setState({ contacts: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleDelete = (id?: string | number) => async () => {
    try {
      if (window.confirm('Are you want to delete the information?')) {
        const response = await http.delete(`/users/${id}`);
        if (response.status === 200) {
          const { contacts } = this.state;
          const index = contacts.findIndex(item => item.id === id);
          if (index > -1) {
            contacts.splice(index, 1);
            this.setState({ contacts });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className="card border-success mb-3">
        <div className="card-header d-flex justify-content-between">
          POC List
          <NavLink to="/contacts/add" className="btn btn-sm btn-success">
            Add new
          </NavLink>
        </div>
        <div className="card-body" style={{ minHeight: '400px' }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL#</th>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Passport</th>
                <th>NID</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.dateOfBirth && momemt(item.dateOfBirth).format('YYYY-MM-DD')}</td>
                  <td>{item.passportId}</td>
                  <td>{item.nId}</td>
                  <td>{item.createdAt && momemt(item.createdAt).format('YYYY-MM-DD')}</td>
                  <td>
                    <NavLink
                      to={`/contacts/edit/${item.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      to={`/contacts/details/${item.id}`}
                      className="btn btn-sm btn-info ml-1"
                    >
                      Details
                    </NavLink>
                    <button
                      className="btn btn-sm btn-danger ml-1"
                      onClick={this.handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
