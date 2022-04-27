import React from "react";

// bootstrap
import { Container } from "react-bootstrap";

// styles
import "../styles/CustomDivs.scss";

const CustomDivs = (builders) => {
  return (
    <div id="about">
      {builders.map((builder, index) => {
        if (index % 2 === 0) {
          return (
            <Container className="d-flex align-items-center justify-content-center">
              <div className="left-one" />
              <div className="right">
                <div className="content">
                  <div className="titles">
                    {builder.contentTitle.toUpperCase()}
                  </div>
                  <p>{builder.content}</p>
                </div>
              </div>
            </Container>
            // <div className="mt-2 pt-2 row align-items-center" key={index}>
            //   <div className="col-lg-4 col-sm-12 img-about-container">
            //     <img
            //       src={builder.src}
            //       alt={builder.alt}
            //       title={builder.title}
            //       className="img-about"
            //     />
            //   </div>
            //   <div className="col-lg-8 col-sm-12 text-left overlay-text">
            //     <h3 className="titles">{builder.contentTitle.toUpperCase()}</h3>
            //     <h5 className="content">{builder.content}</h5>
            //   </div>
            // </div>
          );
        } else {
          return (
            <div className="mt-5 pt-5 row align-items-center" key={index}>
              <div className="col-lg-8 col-sm-12 text-right">
                <h3 className="titles">{builder.contentTitle.toUpperCase()}</h3>
                <h5 className="content">{builder.content}</h5>
              </div>
              <div className="col-lg-4 col-sm-12">
                <img
                  src={builder.src}
                  alt={builder.alt}
                  title={builder.alt}
                  // className="img-thumbnail"
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CustomDivs;
