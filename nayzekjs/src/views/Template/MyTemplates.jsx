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

const GET_MY_TEMPLATES = gql`{
    templates(count: 100) {
        id
        type
        collection {
            id
            name
        }
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

const getMyTemplates = (classes, history, id) => (
    <Query query={GET_MY_TEMPLATES}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const rows = [];

            data.templates.map(template => {
                rows.push(
                    <TableRow key={template.id} onClick={() => history.push("/template/" + template.id + "/details")}>
                        <TableCell component="th" scope="row">
                            {template.name}
                        </TableCell>
                        <TableCell align="right">{template.type}</TableCell>
                        <TableCell align="right">{template.collection.name}</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">{template.createdAt}</TableCell>
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
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Template</TableCell>
                                        <TableCell align="right">type</TableCell>
                                        <TableCell align="right">Collection</TableCell>
                                        <TableCell align="right">Value&nbsp;(Ξ)</TableCell>
                                        <TableCell align="right">Created At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getMyTemplates(classes, history)}
                                </TableBody>
                            </Table>
                        </CardBody>
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
