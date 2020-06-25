import React from 'react';

const newBox = (props) => {
    let poste = props.news
    return <>
    <div className="newbox--newsfeed">
        <h5>{poste.title}</h5>
        { poste.hasPicture && <img alt={poste.title} style={{ width: '300px' }} src={poste.pictureUrl}></img>}
        <p>{props.news.content}</p>
    </div>
    </>
}

export default newBox