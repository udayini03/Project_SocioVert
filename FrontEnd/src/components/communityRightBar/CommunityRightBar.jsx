import "./communityRightbar.css";

export default function CommunityRightBar() {
  return (
    <div className="communityRightBar">
    <>
    <div className="communityWrapper">
    <img className="communityImg" src='https://media.vogue.fr/photos/5d51422c5dc6c20009ca8833/1:1/pass/undefined' alt='' />
    <div className="communityName">Friends</div>
    <div className="communityDesc">A place where anyone can be whatever they want. Don’t break the rules and keep the toxicity away</div>
    <hr className="line"></hr>
    <div className="communityDetails">
    <div className="communityUsers">
    <div >  400</div>
    <div >Followers</div>
    </div>
    <div className="communityActive">
    <div>  56</div>
    <div >Active</div>
    </div>
    <div className="communityPosts">
    <div>  132</div>
    <div >Posts</div>
    </div>
    </div>
    <hr className="line"></hr>

    </div>
    </>
      
    </div>
  )
}
