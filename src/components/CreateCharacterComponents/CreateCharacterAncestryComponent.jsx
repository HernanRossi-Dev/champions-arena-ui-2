import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {
  ButtonToolbar,
  Col,
  FormLabel,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Collapse
} from "react-bootstrap";
import * as cssStyles from "../../styles/Styles.css";
import {
  HumanData,
  DwarfData,
  ElfData,
  GnomeData,
  HalflingData,
  GoblinData
} from './create-character-utils/select-ancestry-info';

const ancestryDivStyle = {
  fontSize: "17px !important",
  fontFamily: "'Josefin Sans', sans-serif",
  textAlign: "left"
};

const ChooseStateTitle = styled.div`
  font-size: 17px !important;
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
`;

class CreateCharacterAncestryComponent extends React.Component {
  constructor(props, context) {
    super();
    this.state = {
      AncestryInfo: "",
      showAncestryInfo: false,
      prevButtonPressed: "",
      showHumanFeats: false,
    };
  }

  changeAncestryInfo = (currentAncestry) => {
    let ancestryData;
    switch (currentAncestry) {
      case "Human":
        ancestryData = HumanData();
        break;
      case "Dwarf":
        ancestryData = DwarfData();
        break;
      case "Elf":
        ancestryData = ElfData();
        break;
      case "Gnome":
        ancestryData = GnomeData();
        break;
      case "Halfling":
        ancestryData = HalflingData();
        break;
      case "Goblin":
        ancestryData = GoblinData();
        break;
      default:
        this.setState({ AncestryInfo: '' });
    }
    const ancestryText = ancestryData.ancestryText.props.children;
    const { ancestryProps } = ancestryData;
    this.setState({ AncestryInfo: ancestryText });
    return { ancestryProps };
  }

  AncestryTextToggle = () => {
    const { showAncestryInfo, AncestryInfo } = this.state;
    if (showAncestryInfo) {
      return <div style={ancestryDivStyle}> {AncestryInfo}</div>;
    }
    return <div />;
  };

  changeAncestry = (e) => {
    const { showAncestryInfo, prevButtonPressed } = this.state;
    const { setAncestry } = this.props;
    const targetText = e.target.textContent.toString();
    if (!targetText) {
      return;
    }
    if (!showAncestryInfo) {
      this.setState({ showAncestryInfo: true });
    }
    if (targetText === prevButtonPressed) {
      if (showAncestryInfo) {
        this.setState({ showAncestryInfo: !showAncestryInfo });
      }
    } else {
      this.setState({ showAncestryInfo: true });
    }
    if (targetText === 'Human') {
      this.setState({ showHumanFeats: true });
    } else {
      this.setState({ showHumanFeats: false });
    }
    const racialBonus = this.changeAncestryInfo(targetText);
    this.setState({ prevButtonPressed: targetText });
    setAncestry(targetText, racialBonus.ancestryProps);
  };

  saveHumanHalfFeat = (e) => {
    const { setAncestry } = this.props;
    if (!e.target.value) {
      return;
    }
    const targetText = e.target.value.toString();
    const racialBonus = this.changeAncestryInfo('Human');
    racialBonus.ancestryProps.ancestry = targetText;
    setAncestry(targetText, racialBonus.ancestryProps);
  }

  render() {
    const { showHumanFeats, showAncestryInfo, AncestryInfo } = this.state;
    return (
      <div>
        <FormGroup>
          <Col sm={1} />
          <Col
            componentClass={FormLabel}
            sm={2}
            className={cssStyles.createColLabelStyle}
          ><div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '19px' }}>Ancestry:</div>
          </Col>
          <Col sm={7}>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="ancestryValue"
                onClick={this.changeAncestry}
                className={cssStyles.alignmentButtonGroupParent}
              >
                <ToggleButton
                  value="Human"
                  className={cssStyles.alignmentButtonGroup}
                >
                  Human
                </ToggleButton>
                <ToggleButton
                  value="Dwarf"
                  className={cssStyles.alignmentButtonGroup}
                >
                  Dwarf
                </ToggleButton>
                <ToggleButton
                  value="Elf"
                  className={cssStyles.alignmentButtonGroup}
                >
                  Elf
                </ToggleButton>
                <ToggleButton
                  value="Halfling"
                  className={cssStyles.alignmentButtonGroup}
                >
                  Halfling
                </ToggleButton>
                <ToggleButton
                  value="Gnome"
                  className={cssStyles.alignmentButtonGroup}
                >
                  Gnome
                </ToggleButton>
                <ToggleButton
                  value="Goblin"
                  className={cssStyles.alignmentButtonGroup}
                >
                  Goblin
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={1} />
          <Col sm={11}>
            <Collapse in={showHumanFeats} style={ancestryDivStyle}>
              <div style={{ backgroundColor: 'transparent', marginBottom: '-50px' }}>
                <ChooseStateTitle>
                  Human characters can select the Half-Elf or Half-Orc feat
                  at level 1 to inherit those ancestries
                </ChooseStateTitle>
                <ToggleButtonGroup
                  type="radio"
                  name="humanFeat"
                  className={cssStyles.selectHumanAncestryFeat}
                  onClick={this.saveHumanHalfFeat}
                >
                  <ToggleButton
                    value="Half-Elf"
                    className={cssStyles.selectHumanAncestryButton}
                  >
                    Half-Elf
                  </ToggleButton>
                  <ToggleButton
                    value="Half-Orc"
                    className={cssStyles.selectHumanAncestryButton}
                  >
                    Half-Orc
                  </ToggleButton>
                  <ToggleButton
                    value="Human"
                    className={cssStyles.selectHumanAncestryButton}
                  >
                    Human
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Collapse>
          </Col>
        </FormGroup>
        <Col sm={1} />
        <FormGroup>
          <Col sm={1} />
          <Col sm={8}>
            <Collapse in={showAncestryInfo} style={ancestryDivStyle}>
              <div style={{ backgroundColor: 'transparent' }}>
                {AncestryInfo}
              </div>
            </Collapse>
          </Col>
          <Col sm={2} />
        </FormGroup>
      </div>
    );
  }
}

CreateCharacterAncestryComponent.propTypes = {
  setAncestry: PropTypes.func.isRequired,
};

export default CreateCharacterAncestryComponent;
