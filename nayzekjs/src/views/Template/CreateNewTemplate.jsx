import React from "react";
import { withStyles } from "@material-ui/core";
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
import { InputAdornment } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import { apolloClient } from "util/index";
import gql from "graphql-tag";

const style = {
    label: {
        marginTop: "0.9rem"
    },
    input: {
        marginTop: "0.5rem"
    }
};

const CREATE_NEW_TEMPLATE = gql`
    mutation CreateTemplate($name: String!, $description: String!, $nftCollectionId: String!, $type: NFT_TYPE!) {
        createTemplate(name: $name, description: $description, nftCollectionId: $nftCollectionId, type: $type) {
            id
            name
            description
        }
    }
`;

class CreateNewTemplate extends React.Component {

    state = {
        name: "",
        description: "",
        type: "ERC721"
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        apolloClient
            .mutate({
                variables: { name: this.state.name, description: this.state.description, type: this.state.type, nftCollectionId: this.props.match.params.id },
                mutation: CREATE_NEW_TEMPLATE
            })
            .then(response => {
                this.props.history.push("/collection/" + this.props.match.params.id + "/details")
            });
    }

    render() {
        const { classes } = this.props;

        return <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardBody>
                        <form onSubmit={this.handleSubmit}>
                            <GridContainer>
                                <GridItem xs={6} md={2} lg={2}>
                                    <h5 className={classes.label}>Template Name</h5>
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
                            <GridContainer>
                                <GridItem xs={6} md={2} lg={2}>
                                    <h5 className={classes.label}>Type</h5>
                                </GridItem>
                                <GridItem xs={6} md={10} lg={10}>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.input
                                        }}
                                        onChange={this.handleSimple}
                                        value={this.state.type}
                                        inputProps={{
                                            name: "type",
                                            id: "type"
                                        }}
                                    >
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="ERC721"
                                        >
                                            ERC721
                                    </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="ERC_1155"
                                        >
                                            ERC_1155
                                    </MenuItem>
                                    </Select>
                                </GridItem>
                            </GridContainer>
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

export default withStyles(style)(CreateNewTemplate);
