import React from 'react';

const newBox = (props) => {
    let poste = props.news
    return <>
    <div className="--newbox--newsfeed">
        <h5 className="--nb--title">{poste.title}</h5>
        { poste.hasPicture && <img alt={poste.title} className="--nb--picture" style={{  width: '300px' }} src={poste.pictureUrl}></img>}
        <p className="--nb--content">{props.news.content}</p>
    </div>
    </>
}

export default newBox