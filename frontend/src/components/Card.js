import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import classNames from 'classnames';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    /* определить, принадлежит ли карточка текущему пользователю */
    const isOwner = props.card.owner._id === currentUser._id;
    /* определить, поставил текущий пользователь лайк данной карточке */
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    /* определить класс для кнопки удаления */   
    const deleteButtonClassName = classNames('item__delete', {'item__delete_none': !isOwner});
    /* определить класс для кнопки лайка */    
    const likeIconClassName = classNames('item__like-icon', {'item__like-icon_active' : isLiked});

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleConfirmClick() {
        props.onCardDeleteConfirm(props.card._id);
    }

    return (
        <li className="item">
            <button
                className={deleteButtonClassName}
                onClick={handleConfirmClick}>
            </button>
            <img src={props.card.link}
                alt={props.card.name}
                className="item__image"
                onClick={handleClick}
            />
            <div className="item__wrapper">
                <p className="item__text">{props.card.name}</p>
                <div className="item__likes">
                    <button
                        className={likeIconClassName}
                        type="button"
                        onClick={handleLikeClick}>
                    </button>
                    <p className="item__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;