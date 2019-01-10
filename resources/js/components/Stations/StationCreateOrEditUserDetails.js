import React from 'react';
import {greekCapitalCities} from '../../general_functions/cities';

let StationCreateOrEditUserDetails = props => (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">{props.lastName ? 'Επεξεργασία σταθμού' : 'Δημιουργία σταθμού'}</h4>
                </div>
                <hr/>
                <div className="card-body">
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Όνομα</label>
                                <input type="text" name='name' value={props.name} onChange={props.changeName} className="form-control" placeholder="Συμπληρώστε το όνομα του σταθμού..." autoComplete='off'/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Μοναδικός κωδικός</label>
                                <input type="text" name='unique' value={props.unique} onChange={props.changeUnique} className="form-control" placeholder="Συμπληρώστε τον μοναδικό κωδικό του σταθμού..." autoComplete='off'/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Τοποθεσία (Πόλη)</label>
                                <select name='location' value={props.location} onChange={props.changeLocation} className='form-control'>
                                    {props.location === '' &&
                                    <option value=''>Επιλέξτε την πόλη που βρίσκεται ο σταθμός</option>
                                    }
                                    {greekCapitalCities.map((city)=>{
                                        return <option key={city} value={city}>{city}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Ενεργός</label>
                                <select name='is_active' value={props.is_active} onChange={props.changeIsActive} className="form-control">
                                    {props.is_active === '' &&
                                    <option value=''>Επιλέξτε απο τα παρακάτω</option>
                                    }
                                    <option value='1'>Ναι</option>
                                    <option value='0'>Οχι</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Προβολή</label>
                                <select name='privacy' value={props.privacy} onChange={props.changePrivacy} className="form-control">
                                    {props.privacy === '' &&
                                    <option value=''>Επιλέξτε απο τα παρακάτω</option>
                                    }
                                    <option value='public'>Δημόσιος</option>
                                    <option value='private'>Ιδιωτικός</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Περιγραφή (Προαιρετικά)</label>
                                <textarea name='description' value={props.description} onChange={props.changeDescription} className="form-control" placeholder="Συμπληρώστε κάποια στοιχεία που θέλετε να αναφέρετε για τον σταθμό..." autoComplete='off'/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="update ml-auto mr-auto">
                            <button className="btn btn-primary btn-round">{props.lastName ? 'Ενημέρωση' : 'Δημιουργία' }</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

export default StationCreateOrEditUserDetails