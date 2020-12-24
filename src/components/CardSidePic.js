import styled from 'styled-components';
// Props:
// -----
// 

const CardSidePic = styled.div`
  display: flex;
  height: 115px;
  min-width: 400px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  box-shadow: 0 2px 0 0 #c9c9c9;
  .img{
    height: 113px;
    width: 116px;
    min-width: 116px;
    position: relative;
    img{
      height: 100%;
      width: 100%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    :after{
      content: "";
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      transition: all .3s ease-in-out;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f00;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    :hover{
      :after{
        opacity: .3;
      }
    }
  }
  .content{
    flex-basis: 100%;
    padding: 10px 10px;
    h5{
      margin-bottom: 10px;
      text-transform: capitalize;
      font-style: italic;
      font-size: 22px;
    }
    .description{
      margin-bottom: 10px
    }

    .price{
      /*font-family:;*/
      font-size: 22px;
      font-style: italic;
    }
    .repo-info{
      display:flex;
      align-items: center;

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
  //props for function
  img,
  alt,
  repoName,
  description,
  starsNo,
  issuesNo,
  ownerName,
  timeInterval
  //props for Styled-Component
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