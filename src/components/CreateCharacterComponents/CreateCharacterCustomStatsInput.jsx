import React from "react";

import { FormLabel, FormControl, Button, OverlayTrigger, ButtonToolbar, Tooltip } from "react-bootstrap";
import { Col, FormGroup } from "reactstrap";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import * as cssStyles from "../../../styles/Styles.css";

const styles = {
  root: {
    width: "45px",
    marginLeft: "45px"
  },
  input: {
    textAlign: "center",
    color: "white",
    fontSize: "24px",
    fontFamily: '"Crimson Text", serif'
  }
};
class CreateCharacterCustomStatsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterStats: {
        STR: "",
        DEX: "",
        CON: "",
        INT: "",
        WIS: "",
        CHA: ""
      },
    };
    this.increaseStat = this.increaseStat.bind(this);
    this.decreaseStat = this.decreaseStat.bind(this);
  }


  componentDidMount() {
    this.setCharacterStats(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      characterStats: props.characterStats,
      racialBonus: props.racialBonus
    });
  }

  setCharacterStats = (props) => {
    if (props.characterStats) {
      this.setState({ characterStats: props.characterStats, racialBonus: props.racialBonus });
    }
  }

  generateStats = () => {
    const newStats = [];
    // Use 4d6 lowest drop method
    let i;
    let j;
    let currentStat = 0;
    let statRolls = [];
    for (i = 0; i < 6; i += 1) {
      statRolls = [];
      currentStat = 0;
      for (j = 0; j < 4; j += 1) {
        let roll = Math.random() * 6;
        while (roll < 1) {
          roll = Math.random() * 6;
        }
        statRolls.push(Math.floor(roll) + 1);
      }
      statRolls.sort();
      currentStat = statRolls[1] + statRolls[2] + statRolls[3];
      newStats.push(currentStat);
    }
    const newHeroStats = {
      STR: newStats[0],
      DEX: newStats[1],
      CON: newStats[2],
      INT: newStats[3],
      WIS: newStats[4],
      CHA: newStats[5],
    };
    this.props.setStateStats(newHeroStats);
    this.setState({characterStats: newHeroStats});
  }

  increaseStat(e) {
	  let newCharStats = this.state.characterStats;
	  if (this.state.characterStats[e.currentTarget.name] < 30) {
      switch (e.currentTarget.name) {
        case "STR":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.STR += 1;
          this.setState({ characterStats: newCharStats });
          break;
	      case "DEX":
		      newCharStats = Object.assign({}, this.state.characterStats);
		      newCharStats.DEX += 1;
		      this.setState({ characterStats: newCharStats });
		      break;
	      case "CON":
		      newCharStats = Object.assign({}, this.state.characterStats);
		      newCharStats.CON += 1;
		      this.setState({ characterStats: newCharStats });
		      break;
	      case "INT":
		      newCharStats = Object.assign({}, this.state.characterStats);
		      newCharStats.INT += 1;
		      this.setState({ characterStats: newCharStats });
		      break;
	      case "WIS":
		      newCharStats = Object.assign({}, this.state.characterStats);
		      newCharStats.WIS += 1;
		      this.setState({ characterStats: newCharStats });
		      break;
	      case "CHA":
		      newCharStats = Object.assign({}, this.state.characterStats);
		      newCharStats.CHA += 1;
		      this.setState({ characterStats: newCharStats });
		      break;
        default:
          break;
      }
		  this.props.setStateStats(newCharStats);
    }
  }

  decreaseStat(e) {
    let newCharStats = this.state.characterStats;
    if (this.state.characterStats[e.currentTarget.name] > 0) {

      switch (e.currentTarget.name) {
        case "STR":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.STR -= 1;
          this.setState({ characterStats: newCharStats });
          break;
        case "DEX":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.DEX -= 1;
          this.setState({ characterStats: newCharStats });
          break;
        case "CON":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.CON -= 1;
          this.setState({ characterStats: newCharStats });
          break;
        case "INT":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.INT -= 1;
          this.setState({ characterStats: newCharStats });
          break;
        case "WIS":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.WIS -= 1;
          this.setState({ characterStats: newCharStats });
          break;
        case "CHA":
          newCharStats = Object.assign({}, this.state.characterStats);
          newCharStats.CHA -= 1;
          this.setState({ characterStats: newCharStats });
          break;
        default:
          break;
      }
	    this.props.setStateStats(newCharStats);
    }
  }

  ShowRacialBonus = () => {
    if (this.props.racialBonus) {
      const rBon = this.props.racialBonus;
      let infoString = null;
      let freeStateBonus = null;

      Object.keys(rBon).forEach((stat) => {
        if (stat === 'FREE') {
          freeStateBonus = `\nFree Ability bonus available: ${rBon[stat]}`;
          return;
        }
        if (!infoString) {
          infoString = "Racial bonus applied to stats: ";
        }
        if (rBon[stat] > 0) {
          infoString += `${stat}: ${rBon[stat]}, `;
        } else {
          infoString += `${stat}: ${rBon[stat]}`;
        }
      });
      return (
        <div>
          <div style={{ wordSpacing: '3px' }}>{infoString}</div>
          <div style={{ wordSpacing: '3px' }}>{freeStateBonus}</div>
        </div>
      );
    } return null;
  };

  render() {
    const PlusButtonFormGroup = () => (
      <FormGroup className={cssStyles.customStatsIcons} >
        <Col sm={2}>
          <Button bsSize="small" onClick={this.increaseStat} name="STR" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-plus" id="STR" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.increaseStat} name="DEX" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-plus" id="DEX" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.increaseStat} name="CON" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-plus" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.increaseStat} name="INT" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-plus" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.increaseStat} name="WIS" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-plus" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.increaseStat} name="CHA" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-plus" />
          </Button>
        </Col>
      </FormGroup>
    );
    const MinusButtonFormGroup = () => (
      <FormGroup className={cssStyles.customStatsIcons}>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.decreaseStat} name="STR" style={{ backgroundColor: 'transparent' }}>
            <i className="fas fa-minus" id="STR"/>
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.decreaseStat} name="DEX" style={{ backgroundColor: 'transparent' }}>
            <i className="fas fa-minus" id="DEX"/>
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.decreaseStat} name="CON" style={{ backgroundColor: 'transparent' }}>
            <i className="fas fa-minus" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.decreaseStat} name="INT" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-minus" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.decreaseStat} name="WIS" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-minus" />
          </Button>
        </Col>
        <Col sm={2}>
          <Button bsSize="small" onClick={this.decreaseStat} name="CHA" style={{ backgroundColor: 'transparent' }}>
            {" "}
            <i className="fas fa-minus" />
          </Button>
        </Col>
      </FormGroup>
    );

    return (
      <div>
        <GenerateStatsFormGroup genStats={this.generateStats} racialBonus={this.state.racialBonus}/>
        <StatsHeaderFormGroup />
        <PlusButtonFormGroup />
        <FormGroup>
          <Col sm={2}>
            <FormControl.Static className={cssStyles.genStatsNumberStyle}>
              {this.state.characterStats.STR}
            </FormControl.Static>
          </Col>
          <Col sm={2}>
            <FormControl.Static className={cssStyles.genStatsNumberStyle}>
              {this.state.characterStats.DEX}
            </FormControl.Static>
          </Col>
          <Col sm={2}>
            <FormControl.Static className={cssStyles.genStatsNumberStyle}>
              {this.state.characterStats.CON}
            </FormControl.Static>
          </Col>
          <Col sm={2}>
            <FormControl.Static className={cssStyles.genStatsNumberStyle}>
              {this.state.characterStats.INT}
            </FormControl.Static>
          </Col>
          <Col sm={2}>
            <FormControl.Static className={cssStyles.genStatsNumberStyle}>
              {this.state.characterStats.WIS}
            </FormControl.Static>
          </Col>
          <Col sm={2}>
            <FormControl.Static className={cssStyles.genStatsNumberStyle}>
              {this.state.characterStats.CHA}
            </FormControl.Static>
          </Col>
        </FormGroup>
        <MinusButtonFormGroup />
        <FormGroup>
          <Col sm={4} />
          <Col sm={6}>
            <this.ShowRacialBonus />
          </Col>
        </FormGroup>
      </div>
    );
  }
}

const GenerateStatsFormGroup = (props) => {
  return (
    <FormGroup>
      <Col sm={1} />
      <Col sm={4} style={{ marginLeft: '20px' }} className={cssStyles.createColLabelStyle}>
        <ButtonToolbar>
          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Roll 4d6 keep best 3 dice (re-roll all 1's)</Tooltip>}>
            <Button className={cssStyles.rollForStatsButton} bsStyle="primary" onClick={props.genStats}>
              Roll For Stats
            </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      </Col>
    </FormGroup>
  );
};

const StatsHeaderFormGroup = () => (
  <FormGroup>
    <Col
      componentClass={FormLabel}
      sm={2}
      className={cssStyles.createColStyle}
    >
      STR
    </Col>
    <Col
      componentClass={FormLabel}
      sm={2}
      className={cssStyles.createColStyle}
    >
      DEX
    </Col>
    <Col
      componentClass={FormLabel}
      sm={2}
      className={cssStyles.createColStyle}
    >
      CON
    </Col>
    <Col
      componentClass={FormLabel}
      sm={2}
      className={cssStyles.createColStyle}
    >
      INT
    </Col>
    <Col
      componentClass={FormLabel}
      sm={2}
      className={cssStyles.createColStyle}
    >
      WIS
    </Col>
    <Col
      componentClass={FormLabel}
      sm={2}
      className={cssStyles.createColStyle}
    >
      CHA
    </Col>
  </FormGroup>
);
export default withStyles(styles)(CreateCharacterCustomStatsInput);
