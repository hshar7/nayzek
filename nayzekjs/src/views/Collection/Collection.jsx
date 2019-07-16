import React from "react";
import PropTypes from "prop-types";
import { Table, TableCell, TableRow, TableBody, TableHead, withStyles } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo/index";

const style = {};

const GET_COLLECTION = id => gql`{
    collection(id: "${id}") {
      id
      owner {
        name
      }
      name
      description
      createdAt
      updatedAt
    }
}`;

const GET_COLLECTION_TEMPLATES = id => gql`{
    templatesByCollection(nftCollectionId: "${id}", count: 10) {
        id,
        type,
        creator {
            id
            name
            email
            publicAddress
        }
        name
        description
        createdAt
        updatedAt
    }
}`;

const getCollection = (classes, id) => (
    <Query query={GET_COLLECTION(id)}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const head = <div>
                <h3>Collection: <b>{data.collection.name}</b></h3>
                <h5>{data.collection.description}</h5>
            </div>;

            return head;
        }}
    </Query>
);

const getCollectionTemplates = (classes, history, id) => (
    <Query query={GET_COLLECTION_TEMPLATES(id)}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const rows = [];

            data.templatesByCollection.map(template => {
                rows.push(
                    <TableRow key={template.id} onClick={() => history.push("/template/" + template.id + "/details")}>
                        <TableCell component="th" scope="row">
                            {template.name}
                        </TableCell>
                        <TableCell align="right">{template.type}</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">{template.updatedAt}</TableCell>
                    </TableRow>
                );
            });

            return rows;
        }}
    </Query>
);

function Collection(props) {
    const { classes, history, match } = props;

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            {getCollection(classes, match.params.id)}

                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Template</TableCell>
                                        <TableCell align="right">type</TableCell>
                                        <TableCell align="right">?</TableCell>
                                        <TableCell align="right">Value&nbsp;(Ξ)</TableCell>
                                        <TableCell align="right">Last Updated</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getCollectionTemplates(classes, history, match.params.id)}
                                </TableBody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={() => props.history.push("/collection/" + match.params.id + "/create_new_template")}>Create New Template</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

Collection.propTypes = {
    classes: PropTypes.object
};

export default withStyles(style)(Collection);
