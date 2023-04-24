import './Card.css';
const Card =(props)=>{
    const clasess= 'Card ' + props.className;
    return  <div className={clasess}>{props.children}</div>    
}

export default Card;