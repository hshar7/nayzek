import React from "react";
import PropTypes from "prop-types";
import {Table, TableCell, TableRow, TableBody, TableHead, withStyles} from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import gql from "graphql-tag";
import {Query} from "react-apollo/index";
import abi from "contracts/ERC721/ERC721.js";
import Web3 from "web3";
import {apolloClient} from "../../util";

const style = {};

const GET_COLLECTION = id => gql`{
    collection(id: "${id}") {
        id
        owner {
            name
        }
        contractAddress
        deploymentStatus
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

const MONITOR_TX = gql`
    mutation MonitorTx($txHash: String!, $collectionId: String!) {
        monitorTx(txHash: $txHash, collectionId: $collectionId)
    }
`;

const getCollectionTemplates = (classes, history, id) => (
    <Query query={GET_COLLECTION_TEMPLATES(id)}>
        {({loading, error, data}) => {
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

class Collection extends React.Component {

    state = {
        web3: null,
        assistInstance: null,
        transaction_id: null,
        collection: null
    };

    componentDidMount = () => {
        this.setState({web3: new Web3(window.web3.currentProvider)});
        apolloClient.query({
            query: GET_COLLECTION(this.props.match.params.id)
        }).then((response) => {
            this.setState({collection: response.data.collection});
        })
    };

    handleDeploy = () => {
        this.state.web3.eth.contract(abi).new({from: "0xB6E58769550608DEF3043DCcbBE1Fa653af23151", gas: 1000000},
            (err, contract) => {
                if (!err) {
                    apolloClient.mutate({
                        variables: {txHash: contract.transactionHash, collectionId: this.props.match.params.id},
                        mutation: MONITOR_TX
                    }).then((response) => {
                        console.log({response});
                    })
                } else {
                    console.error({err});
                }
            });
    };

    render = () => {
        const {classes, history, match} = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody>
                                {this.state.collection ?
                                    <div>
                                        <h3>Collection: <b>{this.state.collection.name}</b></h3>
                                        <h5>{this.state.collection.description}</h5>
                                        <p>Deployment Status: {this.state.collection.deploymentStatus}</p>
                                        <p>Contract Address: {this.state.collection.contractAddress}</p>
                                    </div>
                                : ""}

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
                                <Button color="primary"
                                        onClick={() => history.push("/collection/" + match.params.id + "/create_new_template")}>Create
                                    New Template</Button>
                                {this.state.collection && this.state.collection.deploymentStatus !== "CONFIRMED" ?
                                <Button color="primary" onClick={() => this.handleDeploy()}>Deploy Collection</Button>
                                    : "" }
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    };
}

Collection.propTypes = {
    classes: PropTypes.object
};

export default withStyles(style)(Collection);
