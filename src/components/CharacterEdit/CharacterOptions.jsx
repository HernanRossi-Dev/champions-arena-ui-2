import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import styled from "styled-components";
import Character from "../../models/CharacterModel";

const EditTitleStyle = styled.div`
  font-size: 38px;
  color: #ffffff;
  text-align: left;
  font-family: "ZCOOL XiaoWei", serif;
  text-shadow: 1px 1px 1px #df691a;
  margin-left: 25px;
`;

const GradientHeadingUnder = styled.div`
    background: rgba(225,105,25,1);
    background: -moz-linear-gradient(-45deg, rgba(225,105,25,1) 0%, rgba(255,185,138,0.37) 43%, rgba(255,185,138,0.24) 52%);
    background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(225,105,25,1)), color-stop(43%, rgba(255,185,138,0.37)), color-stop(52%, rgba(255,185,138,0.24)));
    background: -webkit-linear-gradient(-45deg, rgba(225,105,25,1) 0%, rgba(255,185,138,0.37) 43%, rgba(255,185,138,0.24) 52%);
    background: -o-linear-gradient(-45deg, rgba(225,105,25,1) 0%, rgba(255,185,138,0.37) 43%, rgba(255,185,138,0.24) 52%);
    background: -ms-linear-gradient(-45deg, rgba(225,105,25,1) 0%, rgba(255,185,138,0.37) 43%, rgba(255,185,138,0.24) 52%);
    background: linear-gradient(135deg, rgba(225,105,25,1) 0%, rgba(255,185,138,0.37) 43%, rgba(255,185,138,0.24) 52%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#e16919", endColorstr="#ffb98a", GradientType=1 );
    border-radius: 0px 13px 200px 0px;
    -moz-border-radius: 0px 13px 200px 0px;
    -webkit-border-radius: 0px 13px 200px 0px;
    border: 7px none #000000;
    width: 65%;
    height: 12px; 
    margin-left: 25px;
    margin-top: -10p;
    margin-bottom: 20px;
`;

const itemStyle = {
  background: "transparent",
  fontSize: "15px",
  fontFamily: `"Crimson Text", serif`
};

const styles = {
  root: {
    fontColor: "#E9CB9A"
  },
  input: {
    color: "#ffffff",
    fontSize: 22,
    fontColor: "#ffffff",
    fontFamily: `"ZCOOL XiaoWei", serif`
  },
  inputName: {
    color: "#ffffff",
    fontSize: 30,
    fontColor: "#ffffff",
    fontFamily: `"ZCOOL XiaoWei", serif`
  },
  inputStride: {
    color: "#ffffff",
    fontSize: 30,
    fontColor: "#ffffff",
    fontFamily: `"ZCOOL XiaoWei", serif`
  },
  inputMelee: {
    color: "#ffffff",
    fontSize: 18,
    fontColor: "#ffffff",
    fontFamily: `"ZCOOL XiaoWei", serif`
  },
  helperText: {
    // color: "#E9CB9A",
    color: "#ffffff",
    fontSize: 12,
    fontColor: "#ffffff",
    fontFamily: `"Cinzel Decorative", sans-serif`,
    textShadow: "1px 1px 1px #E9CB9A",
  },
  selectEmpty: {
    color: "white",
    width: "125px",
    paddingTop: "5px",
    fontSize: "19px",
  },
  selectIcon: {
    color: "#df691a",
  },
};

class CharacterOptions extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     editCharacter: new Character(),
  //     show: false,
  //     ancestryFeat: "",
  //     classFeat: "",
  //     generalFeat: "",
  //     classFeatures: "",
  //   };
  // }

  saveCaretPosition = (event) => {
    const caret = event.target.selectionStart;
    const element = event.target;
    window.requestAnimationFrame(() => {
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });
  }

  changeAncestryFeat = (event) => {
    this.saveCaretPosition(event);
    // const updateChar = this.props.editCharacter;
    // updateChar.actions.stride = event.target.value;
    // this.props.updateCharacter(updateChar);
  }

  changeGeneralFeat = (event) => {
    this.saveCaretPosition(event);
    // const updateChar = this.props.editCharacter;
    // updateChar.actions.stride = event.target.value;
    // this.props.updateCharacter(updateChar);
  }

  changeClassFeat = (event) => {
    this.saveCaretPosition(event);
    // const updateChar = this.props.editCharacter;
    // updateChar.actions.stride = event.target.value;
    // this.props.updateCharacter(updateChar);
  }

  changeClassFeature = (event, index) => {
    this.saveCaretPosition(event);
    // const updateChar = this.props.editCharacter;
    // updateChar.actions.stride = event.target.value;
    // this.props.updateCharacter(updateChar);
  }

  renderMeleeStrike = (entry, index) => {
    const { classes } = this.props;
    const entryRender = (
      <TextField
        onChange={(e) => this.changeMelee(e, index)}
        id={`melee-${index}`}
        helperText="Melee Strike"
        htmlFor="custom-css-standard-input"
        value={entry}
        InputProps={{
          classes: {
            root: classes.input,
            input: classes.inputMelee,
          }
        }}
        FormHelperTextProps={{
          className: classes.helperText
        }}
        style={{
          paddingLeft: "25px", paddingRight: "15px", marginTop: "15px", width: "90%"
        }}
      />
    );
    return entryRender;
  }

  render() {
    const { classes, editCharacter } = this.props;
    return (
      <div>
        <Grid container spacing={16} justify="flex-start">
          <Grid container spacing={16} justify="flex-start">
            <Grid item xs={1} />
            <Grid item xs={3}>
              <EditTitleStyle>Options</EditTitleStyle>
              <GradientHeadingUnder />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={this.changeStride}
                id="Stride"
                helperText="Stride"
                htmlFor="custom-css-standard-input"
                value={editCharacter.actions.stride}
                InputProps={{
                  classes: {
                    root: classes.input,
                    input: classes.inputStride,
                  }
                }}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
                style={{ marginTop: "15px", marginBottom: "20px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CharacterOptions.defaultProps = {
  editCharacter: new Character(),
  classes: { root: {} },
};

CharacterOptions.propTypes = {
  classes: PropTypes.object,
  editCharacter: Character
};

export default withStyles(styles)(CharacterOptions);
