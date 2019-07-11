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

const GET_TEMPLATE = id => gql`{
    template(id: "${id}") {
        id
        type
        creator {
            id
            name
        }
        collection {
            id
            name
        }
        name
        description
        createdAt
        updatedAt
    }
}`;

const GET_MINTS = id => gql`{
    nftsByTemplate(templateId: "${id}", count: 10) {
        id
        contract
        value
        type
        minter {
            id
            name
        }
        template {
            id
            name
        }
        ownerAddress
        name
        description
        createdAt
        updatedAt
    }
}`;

const getTemplate = (classes, id) => (
    <Query query={GET_TEMPLATE(id)}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const head = <div>
                <h3>Template: <b>{data.template.name}</b></h3>
                <h5>{data.template.description}</h5>
            </div>;

            return head;
        }}
    </Query>
);

const getNfts = (classes, history, id) => (
    <Query query={GET_MINTS(id)}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const rows = [];

            data.nftsByTemplate.map(nft => {
                rows.push(
                    <TableRow key={nft.id} onClick={() => history.push("/template/" + nft.id + "/details")}>
                        <TableCell component="th" scope="row">
                            {nft.name}
                        </TableCell>
                        <TableCell align="right">{nft.type}</TableCell>
                        <TableCell align="right">{nft.minter.name}</TableCell>
                        <TableCell align="right">{nft.ownerAddress}</TableCell>
                        <TableCell align="right">{nft.value}</TableCell>
                        <TableCell align="right">{nft.createdAt}</TableCell>
                    </TableRow>
                );
            });

            return rows;
        }}
    </Query>
);

function Template(props) {
    const { classes, history, match } = props;

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            {getTemplate(classes, match.params.id)}

                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>NFT</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Minted By</TableCell>
                                        <TableCell align="right">Current Owner</TableCell>
                                        <TableCell align="right">Value&nbsp;(Ξ)</TableCell>
                                        <TableCell align="right">Minted On</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getNfts(classes, history, match.params.id)}
                                </TableBody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={() => props.history.push("/collection/" + match.params.id + "/create_new_template")}>Mint New</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

Template.propTypes = {
    classes: PropTypes.object
};

export default withStyles(style)(Template);
