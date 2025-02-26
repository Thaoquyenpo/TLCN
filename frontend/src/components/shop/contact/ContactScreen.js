import React from "react";
import { Col, Row } from "react-bootstrap";
import contact from "../image/shop.jpg";
import Map from "../contact/Location";
// eslint-disable-next-line
import FormContainer from "./FormContainer";
import "./style.css";

const ContactScreen = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <img className="contact-img" src={contact} alt="contact-img" />
          <div className="contact-header">
            <h1>Liên hệ với chúng tôi</h1>
            <p>Những ý kiến đóng góp của các bạn sẽ giúp chúng tôi hoàn thiện hơn
              trong tương lai. Cảm ơn!</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="contact-end-map">
          <h6>Địa chỉ</h6>
          <Map
           googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `90vh`,
                  margin: `auto`,
                  border: "2px solid black",
                }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Col>{" "}
      </Row>
      <Row>
        <Col className="contact-end">
          <h6>Số điện thoại</h6>
          <p>0762910918</p>
        </Col>
        <Col className="contact-end">
          {" "}
          <h6>Email</h6>
          <p>quyenlinh@gmail.com</p>
        </Col>
      </Row>
    </div>
  );
};

export default ContactScreen;
