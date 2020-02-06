import React from "react";
import Form from "./Form.js"
import "../styles/FormModal.css";

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowSubmit: false,
            allowNav: false,
            pages: ["fullName", "email", "phoneNo", "password", "cpassword", "ccNumber", "expDate", "pin"],
            currentPage: 0,
        }
    }

    allowSubmit = (allow) => { this.setState({ allowSubmit: allow }) }

    allowNav = (allow) => { this.setState({ allowNav: allow }) }

    register = (e) => {
        e.preventDefault();
        this.closeModal.click() // fix to the lingering backdrop bug

        if (this.state.allowSubmit) {
            this.props.register();
        }
    }

    navigatePages = (direction) => {
        this.setState({
            currentPage: (direction === "forward") ? this.state.currentPage + 1 : this.state.currentPage - 1
        })
    }


    render() {
        return (
            <div className="modal fade form-modal" id="form-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle"> Sign Up </h5>
                            <button type="button" ref={ref => this.closeModal = ref} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <Form
                                onSubmit={this.register}
                                allowSubmit={this.allowSubmit}
                                allowNav={this.allowNav}
                                page={this.state.pages[this.state.currentPage]}
                            />
                        </div>

                        <div className="modal-footer text-center">
                            {this.state.currentPage === this.state.pages.length - 1 ?
                                <button
                                    type="submit"
                                    form="register-form"
                                    className="btn"
                                    disabled={!this.state.allowSubmit}
                                >
                                    Submit
                                </button> : null
                            }
                            <button className="btn" disabled={this.state.currentPage === 0} onClick={() => this.navigatePages("backward")}> Prev </button>
                            <button className="btn" disabled={this.state.currentPage === this.state.pages.length - 1 || !this.state.allowNav} onClick={() => this.navigatePages("forward")} hidden={this.state.currentPage === this.state.pages.length - 1}> Next </button>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}


export default FormModal;
