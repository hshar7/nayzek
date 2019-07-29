import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Table, TableCell, TableRow, TableBody, TableHead } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo/index";

const queryString = require('query-string');
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const GET_COLLECTIONS = gql`
  {
    getCollections(count: 10) {
      id
      owner {
        name
      }
      name
      description
      createdAt
      updatedAt
    }
  }
`;

const getMyCollections = (classes, history, fetchPolicy) => (
  <Query query={GET_COLLECTIONS} fetchPolicy={fetchPolicy}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const rows = [];

      data.getCollections.map(collection => {
        rows.push(
          <TableRow key={collection.id} onClick={() => history.push("/collection/" + collection.id + "/details")}>
            <TableCell component="th" scope="row">
              {collection.name}
            </TableCell>
            <TableCell align="right">0</TableCell>
            <TableCell align="right">0</TableCell>
            <TableCell align="right">0</TableCell>
            <TableCell align="right">{collection.updatedAt}</TableCell>
          </TableRow>
        );
      });

      return rows;
    }}
  </Query>
);

function MyCollections(props) {
  const { classes, history } = props;
  const parsed = queryString.parse(props.location.search);
  const fetchPolicy = parsed["fetchPolicy"] ? parsed["fetchPolicy"] : "cache-first";

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
                    <TableCell align="right">Templates</TableCell>
                    <TableCell align="right">Items</TableCell>
                    <TableCell align="right">Value&nbsp;(Ξ)</TableCell>
                    <TableCell align="right">Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getMyCollections(classes, history, fetchPolicy)}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => props.history.push("/create_new_collection")}>Create New</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

MyCollections.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(MyCollections);
