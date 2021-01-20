import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Preloader from './Preloader';

function Main(props) {    
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <>
            <section className="profile">
                <div className="profile__data">
                    <div className="profile__avatar"
                        onClick={props.onEditAvatar}
                        style={{ backgroundImage: `url(${currentUser.avatar})` }}
                    ></div>
                    <div className="profile__info">
                        <h1 className="profile__info-title">{currentUser.name}</h1>
                        <button className="profile__info-edit-button form-button"
                            type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__info-subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button form-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery">
                <ul className="gallery__items">
                    {
                        props.cards.map((card) =>
                            <
                                Card key={card._id}
                                card={card}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDeleteConfirm={props.onCardDeleteConfirm}
                            />
                        )
                    }
                </ul>
            </section>
            {props.showLoader && <Preloader />}
        </>
    );
}

export default Main;