/* eslint-disable react/jsx-props-no-spreading */
import { Nav } from "react-bootstrap";
import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterEdit from "./components/CharacterEdit/CharacterEdit";
import CreateCharacterComponent from "./components/CreateCharacterComponents/CreateCharacterComponent";
import { HomeComponent, SiteHeaderComponent } from "./components/Home";
import { AboutSiteComponent, PathfinderCommunityUse, OGL } from "./components/SiteInfo";
import Login from "./components/AuthenticateUser/Login";
import Signup from "./components/AuthenticateUser/Signup";
import ForgotPassword from "./components/AuthenticateUser/ForgotPassword";
import CreateCharacterSkillsAndFeatsComponent from "./components/CreateCharacterComponents/SkillsAndFeats/CreateCharacterSkillsComponent";
import store from "./store/index";
import * as cssStyles from "./styles/Styles.css";

const App = () => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        store.getState().userReducer.loggedIn
          ? <Component {...props} />
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          ))}
    />
  );
  PrivateRoute.propTypes = {
    component: PropTypes.object.isRequired,
  };
  return (
    <div className={["card", cssStyles.Site].join(" ")}>
      <SiteHeaderComponent />
      <div className={["container-fluid", cssStyles.SiteContent].join(" ")} style={{ paddingLeft: 0, paddingRight: 0 }}>

        <Switch>
          <PrivateRoute
            exact
            path="/home"
            component={HomeComponent}
          />
          <PrivateRoute
            path="/createCharacter/skills"
            component={CreateCharacterSkillsAndFeatsComponent}
          />
          <PrivateRoute
            path="/createCharacter"
            component={CreateCharacterComponent}
          />
          <Route
            path={!(store.getState().userReducer.loggedIn) ? `/login` : `/home`}
            component={
              (!store.getState().userReducer.loggedIn) ? Login : HomeComponent
            }
          />
          <Route path="/OGL" component={OGL} />
          <Route
            path={(!store.getState().userReducer.loggedIn) ? `/signup` : `/home`}
            component={
              (store.getState().userReducer.loggedIn) ? HomeComponent : Signup
            }
          />
          <PrivateRoute path="/characters/:id" component={CharacterEdit} />
          <PrivateRoute path="/characters" component={CharacterList} />
          <Route path="/legal" component={PathfinderCommunityUse} />
          <Route
            path={(!store.getState().userReducer.loggedIn) ? `/forgotPassword` : `/home`}
            component={
              (store.getState().userReducer.loggedIn) ? HomeComponent : ForgotPassword
            }
          />
          <Route path="/about" component={AboutSiteComponent} />
          <Route
            exact
            path="/"
            component={
              (!store.getState().userReducer.loggedIn) ? Login : HomeComponent
            }
          />
          <Route
            path="*"
            component={
              (!store.getState().userReducer.loggedIn) ? Login : HomeComponent
            }
          />
        </Switch>

      </div>
      <div className={cssStyles.styleFooter}>
        <div> Hernan Rossi &#169; 2019</div>
        <LinkContainer to="/legal">
          <Nav.Item>
            Pathfinder content used under Open Gaming License, and Community
            Use Policy
          </Nav.Item>
        </LinkContainer>
      </div>
    </div>
  );
};

if (module.hot) {
  module.hot.accept();
}

const mapStateToProps = () => {
  return ({
    loggedIn: store.getState().userReducer.loggedIn,
    user: store.getState().userReducer.currentUserName,
  });
};

export default connect(mapStateToProps)(App);
