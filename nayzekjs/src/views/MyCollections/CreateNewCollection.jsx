import React from "react";
import {withStyles} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Input from "@material-ui/core/Input/index";
import FormControl from "@material-ui/core/FormControl/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Select from "@material-ui/core/Select/index";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import {InputAdornment} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";

const style = {
    label: {
        marginTop: "0.9rem"
    },
    input: {
        marginTop: "0.5rem"
    }
};

class CreateNewCollection extends React.Component {

    state = {
        name: "",
        description: ""
    }

    handleSimple = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;

        return <GridContainer>
        <GridItem xs={12}>
            <Card>
                <CardBody>
                    <form onSubmit={this.handleSubmit}>
                        <GridContainer>
                            <GridItem xs={6} md={2} lg={2}>
                                <h5 className={classes.label}>Collection Name</h5>
                            </GridItem>
                            <GridItem xs={6} md={10} lg={10}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "name",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true,
                                        autoFocus: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={6} md={2} lg={2}>
                                <h5 className={classes.label}>Description</h5>
                            </GridItem>
                            <GridItem xs={6} md={10} lg={10}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "description",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        {/* <GridContainer>
                            <GridItem xs={6} md={2} lg={2}>
                                <h5 className={classes.label}>Tournament Name</h5>
                            </GridItem>
                            <GridItem xs={6} md={10} lg={10}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "title",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true,
                                        autoFocus: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={6} md={2} lg={2}>
                                <h5 className={classes.label}>Tournament Name</h5>
                            </GridItem>
                            <GridItem xs={6} md={10} lg={10}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "title",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true,
                                        autoFocus: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={6} md={2} lg={2}>
                                <h5 className={classes.label}>Tournament Name</h5>
                            </GridItem>
                            <GridItem xs={6} md={10} lg={10}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "title",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true,
                                        autoFocus: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={4}>
                                <h5>Bracket Type</h5>
                            </GridItem>
                            <GridItem xs={8}>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.bracketType}
                                    inputProps={{
                                        name: "bracketType",
                                        id: "bracketType"
                                    }}
                                >
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="SINGLE_ELIMINATION"
                                    >
                                        Single Elimination
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="DOUBLE_ELIMINATION"
                                    >
                                        Double Elimination
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="ROUND_ROBIN"
                                    >
                                        Round Robin
                                    </MenuItem>
                                </Select>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={4}>
                                <h5>Format</h5>
                            </GridItem>
                            <GridItem xs={8}>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.format}
                                    inputProps={{
                                        name: "format",
                                        id: "format"
                                    }}
                                >
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="SINGLES"
                                    >
                                        Singles (1v1)
                                    </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="TEAMS"
                                    >
                                        Teams
                                    </MenuItem>
                                </Select>
                            </GridItem>
                        </GridContainer> */}
                        <GridContainer justify="center">
                            <GridItem xs={3}>
                                <Button
                                    type="primary"
                                    htmltype="submit"
                                    color="success"
                                    size="md"
                                    block
                                >
                                    Submit
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </form>
                </CardBody>
            </Card>
        </GridItem>
    </GridContainer>
    }
}

export default withStyles(style)(CreateNewCollection);
