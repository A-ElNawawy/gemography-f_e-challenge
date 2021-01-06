import styled from 'styled-components';

const CardSidePic = styled.div`
  display: flex;
  min-width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  box-shadow: 0 2px 0 0 #c9c9c9;
  .img{
    height: 113px;
    width: 116px;
    position: relative;
    img{
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
    :after{
      content: "";
      border-radius: 5px;
      transition: all .3s ease-in-out;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    :hover{
      :after{
        opacity: .2;
      }
    }
  }
  .content{
    flex-basis: 100%;
    padding: 0 0 0 20px;
    h5{
      margin-bottom: 10px;
      text-transform: capitalize;
      font-style: italic;
      font-size: 22px;
    }
    .description{
      margin-bottom: 10px
    }
    .repo-info{
      display:flex;
      align-items: center;
      @media (max-width: 700px){
        &{
          flex-wrap: wrap;
          p{
            width: 100%;
            margin-top: 15px;
          }
        }
      }
    }
  }
`;

const Badge = styled.span`
  margin-right: 5px;
  padding: 5px 10px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
`;

function _CardSidePic({
  //props
  img,
  alt,
  repoName,
  description,
  starsNo,
  issuesNo,
  ownerName,
  timeInterval
}) {
  return(
    <CardSidePic className="CardSidePic">
      <div className="img">
        <img src={img} alt={alt}></img>
      </div>
      <div className="content">
        <h5>{repoName}</h5>
        <p className="description">{description}</p>
        <div className="repo-info">
          <Badge>Stars: {starsNo}</Badge>
          <Badge>Issues: {issuesNo}</Badge>
          <p>Submitted {timeInterval} days ago by {ownerName}</p>
        </div>
      </div>
    </CardSidePic>
  )
}

export default _CardSidePic;