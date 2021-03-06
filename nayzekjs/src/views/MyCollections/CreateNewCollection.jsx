import React from "react";
import {withStyles} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Input from "@material-ui/core/Input/index";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import {apolloClient} from "util/index";
import gql from "graphql-tag";

const style = {
    label: {
        marginTop: "0.9rem"
    },
    input: {
        marginTop: "0.5rem"
    }
};

const CREATE_NEW_COLLECTION = gql`
    mutation CreateCollection($name: String!, $description: String!) {
        createCollection(name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

class CreateNewCollection extends React.Component {

    state = {
        name: "",
        description: ""
    };

    handleSimple = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        apolloClient
            .mutate({
                variables: {name: this.state.name, description: this.state.description},
                mutation: CREATE_NEW_COLLECTION
            })
            .then(response => {
                this.props.history.push("/my_collections/?fetchPolicy=network-only")
            });
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
