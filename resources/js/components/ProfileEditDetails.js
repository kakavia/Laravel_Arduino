import React from 'react';
import {connect} from "react-redux";
import {notifyEditedUserEmptyFields, notifyUpdatedProfile, notifyUserEmailExists} from "../general_functions/notifiers";
import {startEditProfileDetails} from "../actions/User";
import {withRouter} from "react-router-dom";

class ProfileEditDetails extends React.Component {
    constructor(props){
        super(props);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeSurname = this.changeSurname.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            email: props.profile.email,
            name: props.profile.name,
            surname: props.profile.surname,
        }
    }
    changeEmail(e){
        this.setState({email: e.target.value})
    }
    changeName(e){
        this.setState({name: e.target.value})
    }
    changeSurname(e){
        this.setState({surname: e.target.value})
    }
    submit(e){
        e.preventDefault();
        let email = this.state.email.trim();
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();

        if(!email || !name || !surname){
            notifyEditedUserEmptyFields();
        }else{
            this.props.dispatch(startEditProfileDetails(this.props.profile.email, email, name, surname)).then((val=0)=>{
                if(val !== 1){
                    notifyUpdatedProfile();
                    this.props.history.push('/profile')
                }
            })
        }
    }
    render(){
        return (
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">Αλλαγή στοιχείων χρήστη</h4>
                </div>
                <hr/>
                <div className="card-body">
                    <form onSubmit={this.submit}>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Διεύθυνση Email</label>
                                    <input value={this.state.email} onChange={this.changeEmail} type="email" name='email' className="form-control" placeholder="Συμπληρώστε την διεύθυνση Email..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Όνομα</label>
                                    <input value={this.state.name} onChange={this.changeName} type="text" name='name' className="form-control" placeholder="Συμπληρώστε το όνομα σας..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Επίθετο</label>
                                    <input value={this.state.surname} onChange={this.changeSurname} type="text" name='surname' className="form-control" placeholder="Συμπληρώστε το επίθετο σας..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="update ml-auto mr-auto">
                                <button className="btn btn-primary btn-round">Ενημέρωση</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.user
    }
};

export default withRouter(connect(mapStateToProps)(ProfileEditDetails))