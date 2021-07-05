import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Plans from '../Plans';
//import Footer from '../Footer';
import Nav from '../Nav';
import './Profile.css';
function Profile() {
    const user = useSelector(selectUser);

    return (
        <div className="profile">
            <Nav />
            <div className="profile__body">
                <h1>Account Details</h1>
                <div className="profile__info">
                    <div className="profile__membership">
                        <h2>MEMBERSHIP & BILLING</h2>
                        <button>Cancel Membership</button>
                    </div>
                    <div className="profile__details">
                        <div className="profile__detailsRow">
                            <h2>{user.email}</h2>
                            <p>Change account email</p>
                        </div>
                        <div className="profile__detailsRow">
                            <h2>Password: *****</h2>
                            <p>Change account password</p>
                        </div>
                        <div className="profile__detailsRow">
                            <h2>Phone: (111) 111-1111</h2>
                            <p>Change phone number</p>
                        </div>
                        {user.subscription &&
                            <div className="profile__detailsRow">
                                <h2>Your next billing date is {new Date(user.subscription?.current_period_end * 1000).toLocaleDateString()}</h2>
                                <p>Manage payment info</p>
                            </div>
                        }

                    </div>
                </div>
                <div className="profile__plans">
                
                    <h3>Plans {user.subscription && `(Current plan: ${user.subscription?.role})`}</h3>
                    
                    <Plans />
                    
                    <button
                        className="profile__signOut"
                        onClick={() => auth.signOut()}
                    >Sign Out of Netflix</button>
                </div>
            </div>
            
        </div>
    )
}

export default Profile