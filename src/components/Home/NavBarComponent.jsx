import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Nav, NavDropdown, Button, Dropdown
} from "react-bootstrap";
import { Navbar, NavItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as cssStyles from "../../styles/Styles.css";
import store from "../../store";
import * as UserActionCreators from "../../actions/UserActionCreators";

export const NavBarComponent = (props) => {
  const {
    dispatch, currentUserName, isGuest, history
  } = props;
  const [showCreate, setShowCreate] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleOpen = (action) => {
    action(true);
  };

  const handleClose = (action) => {
    action(false);
  };

  const toggleSelection = (current, action) => {
    action(!current);
  };

  const logout = async () => {
    let action;
    const user = currentUserName;
    if (isGuest) {
      action = UserActionCreators.logoutGuestUser(user);
      await dispatch(action);
    } else {
      action = UserActionCreators.logoutRegisteredUser();
      await dispatch(action);
    }
    history.push("/login");
  };

  return (
    <Navbar
      sticky="top"
      fixed="top"
      className={cssStyles.navbarStyle}
    >
      <Nav bsStyle="tabs" justified className={cssStyles.navBarFont}>
        <NavItem>
          <NavLink to="/home" active="true">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/characters" active="true">Characters</NavLink>
        </NavItem>
        <NavDropdown
          eventKey={3}
          onMouseEnter={() => handleOpen(setShowCreate)}
          onMouseLeave={() => handleClose(setShowCreate)}
          open={showCreate}
          onToggle={() => toggleSelection(showCreate, setShowCreate)}
          title="Create New Character"
          id="basic-nav-dropdown"
          className={cssStyles.navDropDown}
        >
          <LinkContainer to="/createCharacter">
            <Dropdown.Item eventKey={3.1} className={cssStyles.navBarMenuItem}>
              New Player Character
            </Dropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown
          eventKey={3}
          onMouseEnter={() => handleOpen(setShowOptions)}
          onMouseLeave={() => handleClose(setShowOptions)}
          open={showOptions}
          onToggle={() => toggleSelection(showOptions, setShowOptions)}
          title={<i className="fas fa-bars" />}
          id="basic-nav-dropdown"
          noCaret
          className={cssStyles.navDropDown}
        >
          <Dropdown.Item eventKey={3.1} className={cssStyles.navBarMenuItem}>
            {(store.getState().userReducer.loggedIn)
              ? <p>Logged in as {store.getState().userReducer.currentUserName}</p>
              : <p>Please Log in</p>}
          </Dropdown.Item>
          <LinkContainer to="/about">
            <Dropdown.Item eventKey={3.2} className={cssStyles.navBarMenuItem}>
              About Site
            </Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/OGL">
            <Dropdown.Item eventKey={3.3} className={cssStyles.navBarMenuItem}>
              About OGL
            </Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/logout">
            <Dropdown.Item eventKey={3.3} className={cssStyles.navBarMenuItem}>
              {(store.getState().userReducer.loggedIn)
                ? <Button onClick={logout}>log out</Button> : <p>Not logged in</p>}
            </Dropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

NavBarComponent.defaultProps = {
  history: () => { },
  dispatch: () => { },
  currentUserName: "",
  isGuest: false,
};

NavBarComponent.propTypes = {
  dispatch: PropTypes.object,
  history: PropTypes.object,
  currentUserName: PropTypes.object,
  isGuest: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    currentUserName: state.userReducer.currentUserName,
    isGuest: state.userReducer.currentUser.isGuest,
    Auth: state.userReducer.authToken,
  };
};

export default withRouter(connect(mapStateToProps, null, null, { pure: false })(NavBarComponent));
