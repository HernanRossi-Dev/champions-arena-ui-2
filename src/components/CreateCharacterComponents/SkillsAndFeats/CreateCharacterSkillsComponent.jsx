import React from "react";
import {
  Col,
  FormGroup,
  Button,
  Card,
  ButtonToolbar, Form
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import * as cssStyles from "../../../styles/Styles.css";

class CreateCharacterSkillsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Card className={cssStyles.createHeroPanelParent}>
        <Card.Heading className={cssStyles.createHeroPanelHeaderStyle}>
          <Card.Title toggle className={cssStyles.createHeroPanelHeaderStyleText}>
            Create Character
          </Card.Title>
        </Card.Heading>
        <Form horizontal>
          <div>This is a placeholder for the seconds creation section</div>
          <hr className={cssStyles.hr} />
          <FormGroup>
            <Col sm={3} />
            <Col sm={3}>
              <ButtonToolbar>
                <Button bsStyle="primary">
                  Create
                </Button>
                <LinkContainer to="/home">
                  <Button bsStyle="link">Discard Character</Button>
                </LinkContainer>
              </ButtonToolbar>
            </Col>
            <Col sm={3} />
          </FormGroup>
        </Form>
      </Card>
    );
  }
}

export default withRouter(CreateCharacterSkillsComponent);