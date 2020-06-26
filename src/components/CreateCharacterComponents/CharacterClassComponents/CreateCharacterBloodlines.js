import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Col,
  FormLabel,
  FormGroup,
  Collapse,
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar
} from "react-bootstrap";
import Bloodlines from "../../../utils/character/sorcererBloodlines";
import * as cssStyles from "../../../styles/Styles.css";

const BloodlineText = styled.div`
  font-size: 16px !important;
  font-family: "Josefin Sans", sans-serif;
  text-align: left;
  padding-left: 45%;
  margin-bottom: -40px;
  width: 100%;
`;

export default class CreateCharacterBloodlines extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showBloodlineInfo: false,
      selectedBloodline: "",
      bloodlineProps: {
        description: "",
        "Signature Skills": [],
        "Bloodline Powers": [],
        Spells: [],
      },
    };
  }

  setBloodline = (e) => {
    const { showBloodlineInfo, selectedBloodline } = this.state;
    const { setBloodline } = this.props;
    const newBloodline = e.target.textContent.toString();
    if (!newBloodline) {
      return;
    }
    if (!showBloodlineInfo) {
      this.setState({ showBloodlineInfo: true });
    } else {
      const prevDeity = selectedBloodline;
      if (prevDeity === newBloodline) {
        this.setState({ showBloodlineInfo: false });
      }
    }
    const bloodlineProps = Bloodlines(newBloodline);
    this.setState({ selectedBloodline: newBloodline, bloodlineProps });
    setBloodline(bloodlineProps);
  };

  render() {
    const { showBloodlineInfo, bloodlineProps } = this.state;
    const reducer = (acc, curr) => `${acc} ${curr}`;
    return (
      <FormGroup>
        <Col sm={1} />
        <Col
          componentClass={FormLabel}
          sm={2}
          className={cssStyles.createColLabelStyle}
        ><div style={{ fontSize: "19px", fontFamily: "'Josefin Sans', sans-serif" }}>Choose Bloodline:</div>
        </Col>
        <Col sm={7}>
          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio"
              name="sorcererBloodlines"
              onClick={this.setBloodline}
              className={cssStyles.alignmentButtonGroupParent}
            >
              <ToggleButton
                value="Aberrant"
                className={cssStyles.alignmentButtonGroup}
              >
                Aberrant
              </ToggleButton>
              <ToggleButton
                value="Angelic"
                className={cssStyles.alignmentButtonGroup}
              >
                Angelic
              </ToggleButton>
              <ToggleButton
                value="Demonic"
                className={cssStyles.alignmentButtonGroup}
              >
                Demonic
              </ToggleButton>
              <ToggleButton
                value="Draconic"
                className={cssStyles.alignmentButtonGroup}
              >
                Draconic
              </ToggleButton>
              <ToggleButton
                value="Fey"
                className={cssStyles.alignmentButtonGroup}
              >
                Fey
              </ToggleButton>
              <ToggleButton
                value="Imperial"
                className={cssStyles.alignmentButtonGroup}
              >
                Imperial
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Col>
        <Col sm={1} />
        <FormGroup>
          <Col sm={2} />
          <Col sm={9}>
            <Collapse in={showBloodlineInfo}>
              <div style={{ backgroundColor: "transparent" }}>
                <BloodlineText>
                  <div>
                    <div><strong>Description:</strong> <i>{bloodlineProps.description}</i></div>
                    <div><strong>Signature Skillss:</strong>
                      <i>
                        {bloodlineProps["Signature Skills"].reduce(reducer, "")}
                      </i>
                    </div>
                    <div><strong>Granted Spells:</strong></div>
                    <i>{
                      Object.keys(bloodlineProps.Spells).map((level) => {
                        const levelType = (level === "Cantrip");
                        return (
                          <div>&nbsp;
                            <strong>
                              {levelType ? level : "Level "}
                            </strong>
                            {!levelType ? level : ""}: {bloodlineProps.Spells[level]}
                          </div>
                        );
                      })
                    }
                    </i>
                    <div><strong>Bloodline Powers:</strong></div>
                    <div>&nbsp;<strong> Initial Power:</strong> {bloodlineProps["Bloodline Powers"]["Initial Power"]}</div>
                    <div>&nbsp;<strong> Advanced Power:</strong> {bloodlineProps["Bloodline Powers"]["Advanced Power"]}</div>
                    <div>&nbsp;<strong> Greater Power:</strong> {bloodlineProps["Bloodline Powers"]["Greater Power"]}</div>
                  </div>
                </BloodlineText>
              </div>
            </Collapse>
          </Col>
        </FormGroup>
      </FormGroup>
    );
  }
}

CreateCharacterBloodlines.propTypes = {
  setBloodline: PropTypes.func.isRequired,
};
