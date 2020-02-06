import React from "react";
import "../styles/Form.css";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",
            phoneNo: "",
            password: "",
            cpassword: "",
            ccNumber: "",
            expDate: "",
            pin: "",
            fullNameErr: "",
            emailErr: "",
            phoneNoErr: "",
            passwordErr: "",
            cpasswordErr: "",
            ccNumberErr: "",
            expDateErr: "",
            pinErr: "",
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.page !== this.props.page) {
            this.props.allowNav(Boolean(this.state[this.props.page] && !this.state[`${this.props.page}Err`]));
        }
    }

    handleNameChange = (e) => { this.setState({ fullName: e.target.value }, () => { this.validateName() }) }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }, () => this.validateEmail()) }

    handlePhoneNoChange = (e) => { this.setState({ phoneNo: e.target.value }, () => this.validatePhoneNo()) }

    handlePasswordChange = (e) => { this.setState({ password: e.target.value }, () => this.validatePassword()) }

    handleCPasswordChange = (e) => { this.setState({ cpassword: e.target.value }, () => this.validatePassword()) }

    handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        this.setState({ ccNumber: value }, () => this.validateCardNumber());
    }

    handleExpDateChange = (e) => {
        let value = (e.target.value.length < 4) ? e.target.value.replace(/\W/gi, '').replace(/(.{2})/g, '$1/') :
            (e.target.value.length < 6) ? e.target.value : this.state.expDate;

        this.setState({ expDate: value }, () => {
            this.validateExpDate();
        })
    }


    handlePinChange = (e) => {
        this.setState({ pin: e.target.value }, () => {
            this.validatePin();
        });
    }


    validateName = () => {
        let fullName = this.state.fullName.trim();

        this.setState({
            fullNameErr: (fullName.length === 0) ? "This field is required" :
                (fullName.length < 3) ? "Full name must be more than 2 characters long" :
                    (fullName.split(" ").length !== 2) ? "Full name is invalid" : ""
        }, () => {
            this.allowSubmit()
        });
    }


    validateEmail = () => {
        let email = this.state.email.trim();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({
            emailErr: (email.length === 0) ? "This field is required. " :
                (!re.test(email)) ? "Invalid email address. " : ""
        }, () => {
            this.allowSubmit()
        });
    }

    validatePhoneNo = () => {
        let { phoneNo } = this.state;
        let re = /^0[1-9][0-9]{9}$/;

        this.setState({
            phoneNoErr: (phoneNo.length === 0) ? "This field is required. " :
                (!(phoneNo.length === 11)) ? "Phone number must contain 11 digits only. " :
                    (!re.test(phoneNo)) ? "Invalid phone number. " : ""
        }, () => {
            this.allowSubmit()
        });
    }

    validatePassword = () => {
        let { password } = this.state;
        let { cpassword } = this.state;
        let re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d @!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,}/

        this.setState({
            passwordErr: (password.length === 0) ? "This field is required. " :
                (!re.test(password)) ? "Invalid password. " : ""
        }, () => {
            this.allowSubmit()
        });

        this.setState({
            cpasswordErr: (password.length === 0) ? "This field is required. " :
                (password !== cpassword) ? "Confirm password must match password. " : ""
        }, () => {
            this.allowSubmit()
        });

    }


    validateCardNumber = () => {
        let { ccNumber } = this.state;
        let re = /([0-9]{4} ){3}[0-9]{4}/;

        this.setState({
            ccNumberErr: (ccNumber.length === 0) ? "This field is required. " :
                (!re.test(ccNumber) || ccNumber.length > 20) ? "Invalid card number. " : ""
        }, () => {
            this.allowSubmit()
        });
    }

    validateExpDate = () => {
        let { expDate } = this.state;
        let re = /[0-9]{2}\/[0-9]{2}/;
        let month = expDate.split("/")[0];

        this.setState({
            expDateErr: (expDate.length === 0) ? "This field is required. " :
                (!re.test(expDate)) ? "Invalid date. The format is MM/YY " :
                    (Number(month) > 13 || Number(month) < 1) ? "Invalid month. Month must be between 01 and 12 " : ""
        }, () => {
            this.allowSubmit()
        });
    }

    validatePin = () => {
        let { pin } = this.state;
        let re = /[0-9]{4}/

        this.setState({
            pinErr: (pin.length === 0) ? "This field is required. " :
                (!re.test(pin)) ? "PIN must consist of 4 digits only. " : ""
        }, () => {
            this.allowSubmit()
        });
    }

    allowSubmit = () => {
        this.allowNav();
        if (this.state.fullName && this.state.email
            && this.state.phoneNo && this.state.password
            && this.state.cpassword && this.state.ccNumber
            && this.state.expDate && this.state.pin
            && !this.state.fullNameErr && !this.state.emailErr
            && !this.state.phoneNoErr && !this.state.passwordErr
            && !this.state.cpasswordErr && !this.state.ccNumberErr
            && !this.state.expDateErr && !this.state.pinErr) {
            this.props.allowSubmit(true);
        } else {
            this.props.allowSubmit(false);
        }
    }

    allowNav = () => {
        this.props.allowNav(
            Boolean(this.state[this.props.page] && !this.state[`${this.props.page}Err`])
        );
    }




    render() {
        return (
            <form id="register-form" className="register-form" onSubmit={this.props.onSubmit}>

                {this.props.page === "fullName" ?
                    <div className="form-group">
                        <label htmlFor="full-name">Full Name</label>
                        <input
                            id="full-name"
                            name="name"
                            type="text"
                            className={`form-control ${this.state.fullNameErr ? "invalid" : ""}`}
                            value={this.state.fullName}
                            onChange={this.handleNameChange}
                            onBlur={this.validateName}
                            placeholder="Sandra Bullock"
                            required
                        />
                        <small id="name-help" className="form-text text-danger" role="alert" tabIndex="0"> {this.state.fullNameErr}</small>
                    </div> : null

                }


                {this.props.page === "email" ?
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            value={this.state.email}
                            type="email"
                            className={`form-control ${this.state.emailErr ? "invalid" : ""}`}
                            onChange={this.handleEmailChange}
                            onBlur={this.validateEmail}
                            placeholder="sandrabullock@hotmail.com"
                            onLoad={this.allowNav}
                            required
                        />
                        <small id="email-help" className="form-text text-danger" role="alert" tabIndex="0"> {this.state.emailErr}</small>
                    </div> : null

                }




                {this.props.page === "phoneNo" ?
                    <div className="form-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input
                            type="tel"
                            className={`form-control ${this.state.phoneNoErr ? "invalid" : ""}`}
                            id="phone-number"
                            name="phone"
                            value={this.state.phoneNo}
                            onChange={this.handlePhoneNoChange}
                            onBlur={this.validatePhoneNo}
                            placeholder="08034556778"
                            required
                        />
                        <small
                            id="phone-help"
                            className={`form-text text-${this.state.phoneNoErr ? "danger" : "muted"}`}
                            role={this.state.phoneNoErr ? "alert" : ""}
                            tabIndex="0"
                        >
                            {this.state.phoneNoErr}
                            Must be a Nigerian number without the +234 prefix
                    </small>
                    </div> : null

                }




                {this.props.page === "password" ?
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={this.password}
                            className={`form-control ${this.state.passwordErr ? "invalid" : ""}`}
                            onChange={this.handlePasswordChange}
                            onBlur={this.validatePassword}
                            placeholder="Password"
                            required
                        />

                        <small
                            id="password-help"
                            className={`form-text text-${this.state.passwordErr ? "danger" : "muted"}`}
                            role={this.state.passwordErr ? "alert" : ""}
                            tabIndex="0"
                        >
                            {this.state.passwordErr}

                            Password must contain:
                            <ul>
                                <li> At least one uppercase letter </li>
                                <li> At least one number </li>
                                <li> At least one of these special characters -  {"!#$%&'()*+,-./:;<=>?@[\]^_`{|}~ and space"}  </li>
                                <li> Must be longer than 5 characters </li>
                            </ul>

                        </small>
                    </div> : null

                }




                {this.props.page === "cpassword" ?
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input
                            id="cpassword"
                            name="cpassword"
                            type="password"
                            value={this.cpassword}
                            className={`form-control ${this.state.cpasswordErr ? "invalid" : ""}`}
                            onChange={this.handleCPasswordChange}
                            onBlur={this.validatePassword}
                            placeholder="Confirm Password"
                            required
                        />
                        <small id="cpassword-help" className="form-text text-danger" role="alert" tabIndex="0"> {this.state.cpasswordErr}</small>
                    </div> : null

                }





                {this.props.page === "ccNumber" ?
                    <div className="form-group">
                        <label htmlFor="card-number">Credit/ Debit Card Number</label>
                        <input
                            id="card-number"
                            name="cardnumber"
                            type="text"
                            value={this.state.ccNumber}
                            className={`form-control ${this.state.ccNumberErr ? "invalid" : ""}`}
                            onChange={this.handleCardNumberChange}
                            onBlur={this.validateCardNumber}
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength="20"
                            required
                        />
                        <small id="card-number-help" className="form-text text-danger" role="alert" tabIndex="0"> {this.state.ccNumberErr}</small>
                    </div> : null

                }




                {this.props.page === "expDate" ?
                    <div className="form-group">
                        <label htmlFor="exp-date">Expiration Date</label>
                        <input
                            type="text"
                            value={this.state.expDate}
                            className={`form-control ${this.state.expDateErr ? "invalid" : ""}`}
                            id="exp-date"
                            name="exp-date"
                            onChange={this.handleExpDateChange}
                            onBlur={this.validateExpDate}
                            placeholder="MM/YY"
                            required
                        />
                        <small id="exp-date-help" className="form-text text-danger" role="alert" tabIndex="0"> {this.state.expDateErr}</small>
                    </div> : null

                }





                {this.props.page === "pin" ?
                    <div className="form-group">
                        <label htmlFor="pin"> PIN </label>
                        <input
                            id="pin"
                            name="pin"
                            type="password"
                            value={this.state.pin}
                            className={`form-control ${this.state.pinErr ? "invalid" : ""}`}
                            pattern="[0-9]{4}"
                            maxLength="4"
                            onChange={this.handlePinChange}
                            onBlur={this.validatePin}
                            placeholder="Enter your 4 digit pin"
                            required
                        />
                        <small id="pin-help" className="form-text text-danger" role="alert" tabIndex="0"> {this.state.pinErr}</small>

                    </div> : null

                }


            </form>

        );
    }

}


export default Form;