import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  FormLabel,
  FormControl,
  FormGroup,
  InputGroup,
  Card,
  Row
} from "react-bootstrap";
import * as cssStyles from "../../styles/Styles.css";
/* eslint-disable */
export const CharacterFilter = (props) => {
  const { initFilter } = props;
  const [classChar, setClass] = useState("");
  const [ancestry, setAncestry] = useState("");
  const [level_gte, setLevelGTE] = useState("");
  const [level_lte, setLevelLTE] = useState("");
  const [changed, setChanged] = useState("");

  const createInitFilter = (oldInitFilter) => {
    const queryString = oldInitFilter.split("&");
    const newInitFilter = {};
    const queryLength = queryString.length;
    if (queryLength > 1) {
      for (let i = 1; i < queryLength; i += 1) {
        const currentFilter = queryString[i].split("=");
        const [key, filt] = currentFilter;
        newInitFilter[key] = filt;
      }
    }
    return newInitFilter;
  };

  useEffect(() => {
    const newInitFilter = createInitFilter(initFilter);
    setClass(newInitFilter.class);
    setAncestry(newInitFilter.ancestry);
    setLevelGTE(newInitFilter.level_gte);
    setLevelLTE(newInitFilter.level_lte);
    setChanged(false);
  }, [
    initFilter.class,
    initFilter.ancestry,
    initFilter.level_gte,
    initFilter.level_lte
  ]);

  const onChangeAncestry = (e) => {
    setAncestry(e.target.value);
    setChanged(true);
  };

  const onChangeClass = (e) => {
    setClass(e.target.value);
    setChanged(true);
  };

  const onChangeLevelLte = (e) => {
    const levelString = e.target.value;
    if (levelString.match(/^\d*$/)) {
      setLevelLTE(e.target.value);
      setChanged(true);
    }
  };

  const onChangeLevelGte = (e) => {
    const levelString = e.target.value;
    if (levelString.match(/^\d*$/)) {
      setLevelGTE(e.target.value);
      setChanged(true);
    }
  };

  const resetFilter = () => {
    const filters = ["class", "ancestry", "level_gte", "level_lte"];
    filters.forEach((filter) => {
      if (initFilter[filter] === undefined) {
        initFilter[filter] = "";
      }
    });
    const newInitFilter = createInitFilter(props.initFilter);
    setClass(newInitFilter.class);
    setAncestry(newInitFilter.ancestry);
    setLevelGTE(newInitFilter.levelString);
    setLevelLTE(newInitFilter.level_lte);
    setChanged(false);
  };

  const clearFilter = () => {
    props.setFilter({});
  };

  const applyFilter = () => {
    const newFilter = {};
    if (ancestry) {
      newFilter.ancestry = ancestry;
    }
    if (classChar) {
      newFilter.class = classChar;
    }
    if (level_gte) {
      newFilter.level_gte = level_gte;
    }
    if (level_lte) {
      newFilter.level_lte = level_lte;
    }
    props.setFilter(newFilter);
  };

  return (
    <Card className={cssStyles.panelHeaderParent} defaultExpanded>
      <Card.Heading className={cssStyles.panelHeader}>
        <Card.Title className={cssStyles.panelHeaderText} toggle>Filter Characters</Card.Title>
      </Card.Heading>
      <Card.Collapse>
        <Card.Body>
          <Row>
            <Col xs={6} sm={4} md={3} lg={3}>
              <FormGroup>
                <FormLabel>Class</FormLabel>
                <FormControl
                  componentClass="select"
                  value={classChar}
                  onChange={onChangeClass}
                >
                  <option value="">Any</option>
                  <option value="Monk">Monk</option>
                  <option value="Ranger">Ranger</option>
                  <option value="Wizard">Wizard</option>
                  <option value="Druid">Druid</option>
                  <option value="Fighter">Fighter</option>
                  <option value="Paladin">Paladin</option>
                  <option value="Sorcerer">Sorcerer</option>
                  <option value="Rogue">Rogue</option>
                  <option value="Cleric">Cleric</option>
                  <option value="Warlock">Warlock</option>
                  <option value="Bard">Bard</option>
                  <option value="Barbarian">Barbarian</option>
                  <option value="Alchemist">Alchemist</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6} sm={4} md={3} lg={3}>
              <FormGroup>
                <FormLabel>Ancestry</FormLabel>
                <FormControl
                  componentClass="select"
                  value={ancestry}
                  onChange={onChangeAncestry}
                >
                  <option value="">Any</option>
                  <option value="Human">Human</option>
                  <option value="Dwarf">Dwarf</option>
                  <option value="Elf">Elf</option>
                  <option value="Gnome">Gnome</option>
                  <option value="Half-Elf">Half-Elf</option>
                  <option value="Half-Orc">Half-Orc</option>
                  <option value="Halfling">Halfling</option>
                  <option value="Goblin">Goblin</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6} sm={4} md={3} lg={3}>
              <FormGroup>
                <FormLabel>Level</FormLabel>
                <InputGroup>
                  <FormControl value={level_gte} onChange={onChangeLevelGte} />
                  <InputGroup.Addon>-</InputGroup.Addon>
                  <FormControl value={level_lte} onChange={onChangeLevelLte} />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <ButtonToolbar style={{ marginTop: '25px' }}>
                  <Button bsStyle="primary" onClick={applyFilter}>Apply</Button>
                  <Button onClick={resetFilter} disabled={!changed}>Reset</Button>
                  <Button onClick={clearFilter}>Clear</Button>
                </ButtonToolbar>
              </FormGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card.Collapse>
    </Card>
  );
};
/* eslint-enable */
CharacterFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  initFilter: PropTypes.string.isRequired
};

export default withRouter(CharacterFilter);
