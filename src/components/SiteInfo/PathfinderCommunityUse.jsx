import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import * as Styles from "../../styles/Styles.css";

const PathfinderCommunityUse = () => {
  return (
    <div className={Styles.Legaldiv}>
      <span className={Styles.LegalSpan}>

        This website uses trademarks and/or copyrights owned by Paizo Inc.,<br />
        which are used under Paizo&apos;s Community Use Policy. We are expressly
        prohibited from charging you to use or access this content.<br />
        This website is not published, endorsed, or specifically approved by
        Paizo Inc.
        <br />For more information about Paizo&apos;s Community Use Policy, please
        visit paizo.com/communityuse.
        <br />For more information about Paizo Inc. and Paizo products, please
        visit paizo.com.<br />

      </span>
      <div className={Styles.LegalImgDiv}> <img
        src="https://storage.googleapis.com/championsarenastatic/static/Paizo.png"
        width="143"
        height="186"
        alt=""
      />
      </div>
      <div>
        <LinkContainer to="/OGL">
          <Nav.Item>
            Click here for info on Open Gaming License.
          </Nav.Item>
        </LinkContainer>
      </div>

    </div>
  );
};

export default PathfinderCommunityUse;
