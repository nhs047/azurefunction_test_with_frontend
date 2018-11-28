import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactsPage } from './pages/ContactsPage';
import { AddContactPage } from './pages/AddContactPage';
import { EditContactPage } from './pages/EditContactPage';
import { DetailsContactPage } from './pages/DetailsContactPage';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/contacts" component={ContactsPage} exact={true} />
            <Route
              path="/contacts/add"
              component={AddContactPage}
              exact={true}
            />
            <Route
              path="/contacts/edit/:id"
              component={EditContactPage}
              exact={true}
            />
            <Route
              path="/contacts/details/:id"
              component={DetailsContactPage}
              exact={true}
            />
            <Redirect to="/contacts" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
