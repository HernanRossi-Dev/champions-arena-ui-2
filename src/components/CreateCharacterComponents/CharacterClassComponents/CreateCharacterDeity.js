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
import ClericDeities from '../../../utils/character/clericDieties';
import * as cssStyles from "../../../styles/Styles.css";

const DeityText = styled.div`
  font-size: 16px !important;
  font-family: 'Josefin Sans', sans-serif;
  text-align: left;
  padding-left: 45%;
  margin-bottom: -40px;
  width: 100%;
`;

export default class CreateCharacterDeity extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showDeityInfo: false,
      selectedDeity: "",
      deityProps: {
        AoC: [],
        Alignment: [],
        Channel: [],
        Domains: [],
        Spells: [],
      },
    };
  }

  setDeity = (e) => {
    const { showDeityInfo, selectedDeity } = this.state;
    const { setDeity } = this.props;
    const newDeity = e.target.textContent.toString();
    if (!newDeity) {
      return;
    }
    if (!showDeityInfo) {
      this.setState({ showDeityInfo: true });
    } else {
      const prevDeity = selectedDeity;
      if (prevDeity === newDeity) {
        this.setState({ showDeityInfo: false });
      }
    }
    const deityProps = ClericDeities(newDeity);
    this.setState({ selectedDeity: newDeity, deityProps });
    setDeity(deityProps);
  };

  render() {
    const reducer = (acc, curr) => `${acc} ${curr}`;
    const aliasReducer = (acc, curr) => `${acc}" ${curr}"`;
    const { showDeityInfo, deityProps } = this.state;
    return (
      <FormGroup>
        <Col sm={1} />
        <Col
          componentClass={FormLabel}
          sm={2}
          className={cssStyles.createColLabelStyle}
        ><div style={{ fontSize: '19px', fontFamily: "'Josefin Sans', sans-serif" }}>Choose Cleric Deity:</div>
        </Col>
        <Col sm={7}>
          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio"
              name="clericDeity"
              onClick={this.setDeity}
              className={cssStyles.alignmentButtonGroupParent}

            >
              <ToggleButton
                value="Abadar"
                className={cssStyles.alignmentButtonGroup}
              >
                Abadar
              </ToggleButton>
              <ToggleButton
                value="Asmodeus"
                className={cssStyles.alignmentButtonGroup}
              >
                Asmodeus
              </ToggleButton>
              <ToggleButton
                value="Calistria"
                className={cssStyles.alignmentButtonGroup}
              >
                Calistria
              </ToggleButton>
              <ToggleButton
                value="Cayden"
                className={cssStyles.alignmentButtonGroup}
              >
                Cayden
              </ToggleButton>
              <ToggleButton
                value="Cailean"
                className={cssStyles.alignmentButtonGroup}
              >
                Cailean
              </ToggleButton>
              <ToggleButton
                value="Desna"
                className={cssStyles.alignmentButtonGroup}
              >
                Desna
              </ToggleButton>
              <ToggleButton
                value="Erastil"
                className={cssStyles.alignmentButtonGroup}
              >
                Erastil
              </ToggleButton>
              <ToggleButton
                value="Gorum"
                className={cssStyles.alignmentButtonGroup}
              >
                Gorum
              </ToggleButton>
              <ToggleButton
                value="Gozreh"
                className={cssStyles.alignmentButtonGroup}
              >
                Gozreh
              </ToggleButton>
              <ToggleButton
                value="Iomedae"
                className={cssStyles.alignmentButtonGroup}
              >
                Iomedae
              </ToggleButton>
              <ToggleButton
                value="Irori"
                className={cssStyles.alignmentButtonGroup}
              >
                Irori
              </ToggleButton>
              <ToggleButton
                value="Lamashtu"
                className={cssStyles.alignmentButtonGroup}
              >
                Lamashtu
              </ToggleButton>
              <ToggleButton
                value="Nethys"
                className={cssStyles.alignmentButtonGroup}
              >
                Nethys
              </ToggleButton>
              <ToggleButton
                value="Norgorber"
                className={cssStyles.alignmentButtonGroup}
              >
                Norgorber
              </ToggleButton>
              <ToggleButton
                value="Pharasma"
                className={cssStyles.alignmentButtonGroup}
              >
                Pharasma
              </ToggleButton>
              <ToggleButton
                value="Sarenrae"
                className={cssStyles.alignmentButtonGroup}
              >
                Sarenrae
              </ToggleButton>
              <ToggleButton
                value="Shelyn"
                className={cssStyles.alignmentButtonGroup}
              >
                Shelyn
              </ToggleButton>
              <ToggleButton
                value="Torag"
                className={cssStyles.alignmentButtonGroup}
              >
                Torag
              </ToggleButton>
              <ToggleButton
                value="Urgathoa"
                className={cssStyles.alignmentButtonGroup}
              >
                Urgathoa
              </ToggleButton>
              <ToggleButton
                value="Zon-Kuthon"
                className={cssStyles.alignmentButtonGroup}
              >
                Zon-Kuthon
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Col>
        <Col sm={1} />
        <FormGroup>
          <Col sm={2} />
          <Col sm={9}>
            <Collapse in={showDeityInfo} >
              <div style={{ backgroundColor: 'transparent' }}>
                <DeityText>
                  <div>
                    {
                      deityProps.Aliases
                        ? (<div><strong>Aliases:</strong> <i>{deityProps.Aliases.reduce(aliasReducer, '')}</i></div>
                        ) : null
                    }
                    <div><strong>Areas of Concern:</strong> <i>{deityProps.AoC.reduce(reducer, '')}</i></div>
                    <div><strong>Allowed Alignments:</strong> <i>{deityProps.Alignment.reduce(reducer, '')}</i></div>
                    <div><strong>Channel:</strong> <i>{deityProps.Channel.reduce(reducer, '')}</i></div>
                    <div><strong>Skill:</strong> <i>{deityProps.Skill}</i></div>
                    <div><strong>Weapon:</strong> <i>{deityProps.Weapon}</i></div>
                    <div><strong>Domains:</strong> <i>{deityProps.Domains.reduce(reducer, '')}</i></div>
                    <div><strong>Deity Spells:</strong></div>
                    <i>{Object.keys(deityProps.Spells)
                      .map((level) => <div><strong>Level</strong> {level}: {deityProps.Spells[level]}</div>)}
                    </i>
                  </div>
                </DeityText>
              </div>
            </Collapse>
          </Col>
        </FormGroup>
      </FormGroup>
    );
  }
}

CreateCharacterDeity.propTypes = {
  setDeity: PropTypes.func.isRequired,
};
