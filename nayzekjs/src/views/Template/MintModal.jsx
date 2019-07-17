import React from "react";
import {
    withStyles,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Input
} from "@material-ui/core";
import Card from "components/Card/Card";
import Button from "components/CustomButtons/Button";
import Close from "@material-ui/icons/Close";
import Web3 from "web3";
import assist from "bnc-assist";
import GridItem from "components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";

const modalStyle = {
    modal: {
        borderRadius: "1rem",
        width: "90%",
        margin: "0"
    },
    modalHeader: {
        borderBottom: "none",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "0",
        paddingLeft: "24px",
        minHeight: "16.43px",
        fontSize: "x-large"
    },
    modalTitle: {
        margin: "0",
        lineHeight: "1.42857143"
    },
    modalCloseButton: {
        color: "#999999",
        marginTop: "-12px",
        WebkitAppearance: "none",
        padding: "0",
        cursor: "pointer",
        background: "0 0",
        border: "0",
        fontSize: "inherit",
        opacity: ".9",
        textShadow: "none",
        fontWeight: "700",
        lineHeight: "1",
        float: "right"
    },
    modalClose: {},
    modalBody: {
        paddingTop: "1rem",
        paddingRight: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        position: "relative"
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        margin: "0"
    },
    modalFooterCenter: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    label: {
        marginTop: "0.9rem"
    },
    input: {
        marginTop: "0.5rem"
    }
};

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class MintModal extends React.Component {

    state = {
        web3: null,
        assistInstance: null,
        name: null,
        description: null
    };

    componentDidMount = () => {
        this.setState({web3: new Web3(window.web3.currentProvider)}, () => {
            let bncAssistConfig = {
                dappId: "cae96417-0f06-4935-864d-2d5f99e7d40f",
                networkId: 4,
                web3: this.state.web3
            };

            this.setState({assistInstance: assist.init(bncAssistConfig)}, () => {
                this.state.assistInstance.onboard();
            });
        });
    };

    componentDidUpdate = () => {
        if (this.props.template && !this.state.name && !this.state.description) {
            this.setState({name: this.props.template.name});
            this.setState({description: this.props.template.description});
        }
    };

    mint = () => {
        this.state.assistInstance.contract(this.state.web3.contract());
    };

    render = () => {
        const {
            classes,
            openState,
            closeModal
        } = this.props;

        if (!openState) {
            return <div/>;
        }

        return (
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                open={openState}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => closeModal("mintModal")}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => closeModal("mintModal")}
                    >
                        <Close className={classes.modalClose}/>
                    </IconButton>
                    Mint New Token
                </DialogTitle>
                <DialogContent id="modal-slide-description" className={classes.modalBody}>
                    <Card plain={true}>
                        <GridContainer>
                            <GridItem xs={6} md={6} lg={6}>
                                <h5 className={classes.label}>Nft Name</h5>
                            </GridItem>
                            <GridItem xs={6} md={6} lg={6}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "name",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true,
                                        autoFocus: true,
                                        value: this.state.name
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={6} md={6} lg={6}>
                                <h5 className={classes.label}>Nft Description</h5>
                            </GridItem>
                            <GridItem xs={6} md={6} lg={6}>
                                <Input
                                    className={classes.input}
                                    fullWidth={true}
                                    inputProps={{
                                        name: "description",
                                        type: "text",
                                        onChange: this.handleSimple,
                                        required: true,
                                        value: this.state.description
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <br/>
                        <Button color="success" onClick={() => this.mint()}>
                            Mint
                        </Button>
                    </Card>
                </DialogContent>
            </Dialog>
        );
    };
}

export default withStyles(modalStyle)(MintModal);
