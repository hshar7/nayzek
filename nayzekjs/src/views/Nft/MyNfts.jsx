import React from "react";
import PropTypes from "prop-types";
import { Table, TableCell, TableRow, TableBody, TableHead, withStyles } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo/index";

const style = {};

const GET_NFTS = gql`{
    nfts(count: 100) {
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
            collection {
                id
                name
            }
        }
        ownerAddress
        dataJson
        createdAt
        updatedAt
    }
}`;

const getNfts = (classes, history) => (
    <Query query={GET_NFTS}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const rows = [];

            data.nfts.map(nft => {
                rows.push(
                    <TableRow key={nft.id} onClick={() => history.push("/nft/" + nft.id + "/details")}>
                        <TableCell component="th" scope="row">
                            {nft.template.collection.name}
                        </TableCell>
                        <TableCell align="right">{nft.template.name}</TableCell>
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
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Collection</TableCell>
                                        <TableCell align="right">Template</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Minted By</TableCell>
                                        <TableCell align="right">Current Owner</TableCell>
                                        <TableCell align="right">Value&nbsp;(Ξ)</TableCell>
                                        <TableCell align="right">Minted On</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getNfts(classes, history)}
                                </TableBody>
                            </Table>
                        </CardBody>
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
