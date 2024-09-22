import React, { useState } from "react";
import "../Assets/Css/styles.min.css";
import heroShape from "../Assets/images/hero-shape.png";
import HomePageNavbar from "../Components/HomePageNav";
import HomePageFoot from "./HomePageFoot";

export default function Plans() {
  const [modalName, setModalName] = useState("");

  return (
    <>
      <HomePageNavbar />
      <main id="main-section" className="main-section">
        <section id="hero-section" className="hero-section">
          <div className="banner-home">
            <div className="wrapper flex-between-center">
              <div className="hero-shape">
                <img src={heroShape} alt="Hero Shape" />
              </div>

              <div className="hero-content center-align">
                <h1>
                  Hire the perfect talent <br /> for your company!
                </h1>
                <div className="banner-text">
                  <p>
                    Search amongst 1000+ active users on Pakistan’s #1 hiring
                    platform
                  </p>
                </div>
              </div>
            </div>
            <div className="s-200"></div>
          </div>
        </section>
        <section className="page-section">
          <section>
            <div className="wrapper">
              <div className="pricing-columns three-columns">
                <div className="pricing-column">
                  <div className="plan-type label">Basic</div>
                  <h3 className="plan-price">
                    $20 <span>/month</span>
                  </h3>
                  <p>Loreum ipsum dummy text</p>
                  <ul>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                  </ul>
                  <button
                    onClick={() => setModalName("Basic")}
                    className="job-popup"
                  >
                    Buy now
                  </button>
                </div>
                <div className=" pricing-column">
                  <div className="plan-type label">Normal</div>
                  <h3 className="plan-price">
                    $20 <span>/month</span>
                  </h3>
                  <p>Loreum ipsum dummy text</p>
                  <ul>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                  </ul>
                  <button
                    onClick={() => setModalName("Normal")}
                    className="job-popup"
                  >
                    Buy now
                  </button>
                </div>
                <div className="pricing-column">
                  <div className="plan-type label">Premium</div>
                  <h3 className="plan-price">
                    $20 <span>/month</span>
                  </h3>
                  <p>Loreum ipsum dummy text</p>
                  <ul>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                    <li>Loreum ipsum dummy text</li>
                  </ul>
                  <button
                    onClick={() => setModalName("Premium")}
                    className="job-popup"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Dynamic Payment Input Modal for all 3 */}
          {modalName !== "" && (
            <>
              <div className="mfp-bg mfp-ready"></div>
              <div
                className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
                tabindex="-1"
                style={{ overflow: "hidden auto" }}
              >
                <div className="mfp-container mfp-inline-holder">
                  <div className="mfp-content">
                    <div
                      id="basic-plan-popup"
                      className={`job-popup-detail plans-popup ${
                        modalName !== "" ? "" : "mfp-hide"
                      }`}
                    >
                      <div
                        onClick={() => setModalName("")}
                        className="popup-modal-dismiss"
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="40"
                            height="40"
                            fill="url(#pattern0_1510_2048)"
                          ></rect>
                          <defs>
                            <pattern
                              id="pattern0_1510_2048"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1510_2048"
                                transform="scale(0.0111111)"
                              ></use>
                            </pattern>
                            <image
                              id="image0_1510_2048"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdElEQVR4nO2dS28cRRDHWyK8FARHAkECBHyBACdARIiHckDAYUEiRjxipnrsWGAsZE+3o+FG4BRF4mvwyiEIPgAIBYWQCxceQoDjeKpmc4ojJR5Us7ZEHK+zzlZ3z+z2XyrJste93b/trX5V1ygVFRUVFRUVFRUVFRUVNZg6neqmI+nK4xaKQxboU6vxS6PpFwv4mwUko/ESG//Mv6v/1nvNJ/w/Juk+xmUM+HbjpXyyuM/o8n0DeMIAXbCaqiGtazV+vQj0noFirxpnzc7+dbvV9IYB+s4AXhGA28fwstX0bZbSRP7mH7epcVE+tXxHr6fRP+7g9jHA8xbwo/mE7lKjqiSpbjYaPzQa0TvgTcZ1yDTOcZ3UKCnT9JQFOhsa8DXAgX61afGsarvYJ1qNn1mNa6Gh9jdcMxqPz8xUt6o2ah7KB4ymH8KDpEGB/7Qw1X1YtUn8dRSaplWerWt1+YxqgwyUrxhNFxsArboRqxdDCb6mmiyTYuJ2Tkx+YHMbAN9VTdRiWr68vjgIDsoKwc4AX1VNEvs1C7gaGo514UbS4nnVBC3ChUdaOvBVA1rXJt2HgkLmuSdPixoAo3LaswFPBZ1n9xYj4UFYH7A1Hg+3rG70io+EDdeylJ72CjnPq10W8Ez4xpNfAzrrdSOKd+GCN1qHsUUoZr3tJ1vAInSDbbBejQUzcA7apDgfvLE6rPFeto/jp3MSlTV8yJrifD61vIet/gAlFz2Aq5vLrxcgMuX/6/RYjM/4pECYFOc3l280HhCBzZA1Htii/gtyHyQddAaaD1KlKppPLe/Z8j00vjDM7l/9TUnoxa3Kzg6du1uso2g66QhysVdy0yjvA3oY2NtBZuXTK/eKgQa84iSUgeMuxL52uraF7d9vh26kj7u4qkygTLINBuiwPGjAE6KgYQAwg8KWLGtnvfoLUcgcYmUAS+EeXV3vqz6IG5EoYwjQpWj4WR0LJ1xJK9EbA/Xk/9uRtPuoGGijcdIZaH1jvTJkT77K0vJtMdC9qE6HldU7A9cYyL0B8WMx0AbwK9cVtjtwBaHdhbMB0euWKFwfdlMgr9f3tBhoA/int4rrwdxISHexqa6/y4EOEAFqdgg7BOT1eq5Igpba9apcwA4FuTbA1Qhatw90dB3ah+uIg2HlZTCM0zvyM73je3y+/J1p2YLFavxcDnRcgldeluD1LVaHvcK0eFPJQPmWGOi4TUr9QSflPjHQceOf/Gz8s/hudYiBzzb4KEt0INwQXysW9W3ptXEdQ4EZALZoXEfPpsVB947q2x1ukAnGdTCL7dowlDhLQJsDaHLJuA5XATQsTsXgMq7DOA4Jk4zryDS97jTI0QAtyfQI5K3XBZOcv4et9p/CQY6by5fa7uUUGM5zf4xzELrdsAQ/UK41N7G0m7cGgzdWj3ggOosDsYM3WIcxnuYqn5eFjMafx683k9/LQiyb0JPx+psn8SXH4L1M+zGj8ZgKJb62y9d3Rx4y0I95p7pFhRRfSO9lbhlVyFjayfJB1QRZKPe3OeuM7QdZ46UMiudUk2SAXhq1xCg2xY5qojg9ziik+rEaL3NMuGqyOOVPq90I4GrjUvxsm/qnhQOk4YEPyv2qTbJTdL8F+r5FkE8FT+kz1Dy7XtRg01NmHgs+TxZbrkMDE6kAnskAn1CjpDyvdnFSkSZssXIdeBeO66RGVXMTS7vXT9T/9g4YcJkTdeczxZ1qXJRzymOggxboG7cLHZ4T00k+4xur1PNbqT7XAzrMV8nqp1EM73upLkvTtLOQgLarw/fOk3Kf0cU7FugoRwNxDHLvUSCIG48HqW8h9B4Zcrr3GjrKt1j5f+PjQaKioqKioqKioqKiotTg+g/jhnWGqOgW+gAAAABJRU5ErkJggg=="
                            ></image>
                          </defs>
                        </svg>
                      </div>

                      <div className="plan-intro-text">
                        <p>
                          Payment Transaction Details <br />
                          We automatically bill on the 1st of each month.
                        </p>
                      </div>
                      <div className="plan-payment-box">
                        <div className="payment-box-left">
                          <h4>{modalName} Plan</h4>
                          <p>Loreum ipsum dummy text</p>
                        </div>
                        <h4 className="plan-price">
                          $20 <span>/month</span>
                        </h4>
                      </div>

                      <div className="payment-form">
                        <form action="" className="card-form">
                          <div className="input-65">
                            <label for="fullcardname">Full name card</label>
                            <input
                              id="fullcardname"
                              type="text"
                              placeholder="Tabish Waheed"
                            />
                          </div>
                          <div className="input-30">
                            <label for="cardexpiry">Expired</label>
                            <input
                              id="cardexpiry"
                              type="text"
                              placeholder="MM/YYYY"
                            />
                          </div>
                          <div className="input-65">
                            <label for="cardnumber">Card Number</label>
                            <input
                              id="cardnumber"
                              type="text"
                              placeholder="5238 XXXX XXXX XXXX"
                            />
                          </div>
                          <div className="input-30">
                            <label for="cardcvv">CCVV</label>
                            <input
                              id="cardcvv"
                              type="text"
                              placeholder="... "
                            />
                          </div>
                        </form>
                      </div>

                      <div className="status-popup-bottom-btns">
                        <button
                          onClick={() => setModalName("")}
                          className="outline-button popup-modal-dismiss"
                        >
                          Cancel
                        </button>
                        <button className="fill-button">Save</button>
                      </div>
                      <button
                        title="Close (Esc)"
                        type="button"
                        className="mfp-close"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Modals for Resend OTP and Payment Successfull */}
          {/* <div className="pricing-column">
                  <div className="plan-type label">Resend OTP</div>
                  <button href="#otp-popup" className="job-popup">
                    Buy now
                  </button>
                  <div
                    id="otp-popup"
                    className="job-popup-detail plans-popup mfp-hide"
                  >
                    <div className="popup-modal-dismiss">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          width="40"
                          height="40"
                          fill="url(#pattern0_1510_2048)"
                        />
                        <defs>
                          <pattern
                            id="pattern0_1510_2048"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              href="#image0_1510_2048"
                              transform="scale(0.0111111)"
                            />
                          </pattern>
                          <image
                            id="image0_1510_2048"
                            width="90"
                            height="90"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdElEQVR4nO2dS28cRRDHWyK8FARHAkECBHyBACdARIiHckDAYUEiRjxipnrsWGAsZE+3o+FG4BRF4mvwyiEIPgAIBYWQCxceQoDjeKpmc4ojJR5Us7ZEHK+zzlZ3z+z2XyrJste93b/trX5V1ygVFRUVFRUVFRUVFRUVNZg6neqmI+nK4xaKQxboU6vxS6PpFwv4mwUko/ESG//Mv6v/1nvNJ/w/Juk+xmUM+HbjpXyyuM/o8n0DeMIAXbCaqiGtazV+vQj0noFirxpnzc7+dbvV9IYB+s4AXhGA28fwstX0bZbSRP7mH7epcVE+tXxHr6fRP+7g9jHA8xbwo/mE7lKjqiSpbjYaPzQa0TvgTcZ1yDTOcZ3UKCnT9JQFOhsa8DXAgX61afGsarvYJ1qNn1mNa6Gh9jdcMxqPz8xUt6o2ah7KB4ymH8KDpEGB/7Qw1X1YtUn8dRSaplWerWt1+YxqgwyUrxhNFxsArboRqxdDCb6mmiyTYuJ2Tkx+YHMbAN9VTdRiWr68vjgIDsoKwc4AX1VNEvs1C7gaGo514UbS4nnVBC3ChUdaOvBVA1rXJt2HgkLmuSdPixoAo3LaswFPBZ1n9xYj4UFYH7A1Hg+3rG70io+EDdeylJ72CjnPq10W8Ez4xpNfAzrrdSOKd+GCN1qHsUUoZr3tJ1vAInSDbbBejQUzcA7apDgfvLE6rPFeto/jp3MSlTV8yJrifD61vIet/gAlFz2Aq5vLrxcgMuX/6/RYjM/4pECYFOc3l280HhCBzZA1Htii/gtyHyQddAaaD1KlKppPLe/Z8j00vjDM7l/9TUnoxa3Kzg6du1uso2g66QhysVdy0yjvA3oY2NtBZuXTK/eKgQa84iSUgeMuxL52uraF7d9vh26kj7u4qkygTLINBuiwPGjAE6KgYQAwg8KWLGtnvfoLUcgcYmUAS+EeXV3vqz6IG5EoYwjQpWj4WR0LJ1xJK9EbA/Xk/9uRtPuoGGijcdIZaH1jvTJkT77K0vJtMdC9qE6HldU7A9cYyL0B8WMx0AbwK9cVtjtwBaHdhbMB0euWKFwfdlMgr9f3tBhoA/int4rrwdxISHexqa6/y4EOEAFqdgg7BOT1eq5Igpba9apcwA4FuTbA1Qhatw90dB3ah+uIg2HlZTCM0zvyM73je3y+/J1p2YLFavxcDnRcgldeluD1LVaHvcK0eFPJQPmWGOi4TUr9QSflPjHQceOf/Gz8s/hudYiBzzb4KEt0INwQXysW9W3ptXEdQ4EZALZoXEfPpsVB947q2x1ukAnGdTCL7dowlDhLQJsDaHLJuA5XATQsTsXgMq7DOA4Jk4zryDS97jTI0QAtyfQI5K3XBZOcv4et9p/CQY6by5fa7uUUGM5zf4xzELrdsAQ/UK41N7G0m7cGgzdWj3ggOosDsYM3WIcxnuYqn5eFjMafx683k9/LQiyb0JPx+psn8SXH4L1M+zGj8ZgKJb62y9d3Rx4y0I95p7pFhRRfSO9lbhlVyFjayfJB1QRZKPe3OeuM7QdZ46UMiudUk2SAXhq1xCg2xY5qojg9ziik+rEaL3NMuGqyOOVPq90I4GrjUvxsm/qnhQOk4YEPyv2qTbJTdL8F+r5FkE8FT+kz1Dy7XtRg01NmHgs+TxZbrkMDE6kAnskAn1CjpDyvdnFSkSZssXIdeBeO66RGVXMTS7vXT9T/9g4YcJkTdeczxZ1qXJRzymOggxboG7cLHZ4T00k+4xur1PNbqT7XAzrMV8nqp1EM73upLkvTtLOQgLarw/fOk3Kf0cU7FugoRwNxDHLvUSCIG48HqW8h9B4Zcrr3GjrKt1j5f+PjQaKioqKioqKioqKiotTg+g/jhnWGqOgW+gAAAABJRU5ErkJggg=="
                          />
                        </defs>
                      </svg>
                    </div>
                    <div className="opt-registeration">
                      <h3>Enter Code OTP</h3>
                      <p>
                        A verification code has been sent to your phone <br />
                        <strong>+12 3456 7890</strong>
                      </p>

                      <div className="otp-code-cehck">
                        <input type="number" className="otp-input" />
                        <input type="number" className="otp-input" />
                        <input type="number" className="otp-input" />
                        <input type="number" className="otp-input" />
                      </div>
                      <div className="center-align">
                        <a href="#">Resend otp</a>
                      </div>
                      <div className="status-popup-bottom-btns">
                        <button className="outline-button popup-modal-dismiss">
                          Cancel
                        </button>
                        <button className="fill-button">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pricing-column">
                  <div className="plan-type label">Payment succefull</div>
                  <button href="#gotodashboard" className="job-popup">
                    Buy now
                  </button>
                  <div
                    id="gotodashboard"
                    className="job-popup-detail plans-popup mfp-hide"
                  >
                    <div className="popup-modal-dismiss">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          width="40"
                          height="40"
                          fill="url(#pattern0_1510_2048)"
                        />
                        <defs>
                          <pattern
                            id="pattern0_1510_2048"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              href="#image0_1510_2048"
                              transform="scale(0.0111111)"
                            />
                          </pattern>
                          <image
                            id="image0_1510_2048"
                            width="90"
                            height="90"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdElEQVR4nO2dS28cRRDHWyK8FARHAkECBHyBACdARIiHckDAYUEiRjxipnrsWGAsZE+3o+FG4BRF4mvwyiEIPgAIBYWQCxceQoDjeKpmc4ojJR5Us7ZEHK+zzlZ3z+z2XyrJste93b/trX5V1ygVFRUVFRUVFRUVFRUVNZg6neqmI+nK4xaKQxboU6vxS6PpFwv4mwUko/ESG//Mv6v/1nvNJ/w/Juk+xmUM+HbjpXyyuM/o8n0DeMIAXbCaqiGtazV+vQj0noFirxpnzc7+dbvV9IYB+s4AXhGA28fwstX0bZbSRP7mH7epcVE+tXxHr6fRP+7g9jHA8xbwo/mE7lKjqiSpbjYaPzQa0TvgTcZ1yDTOcZ3UKCnT9JQFOhsa8DXAgX61afGsarvYJ1qNn1mNa6Gh9jdcMxqPz8xUt6o2ah7KB4ymH8KDpEGB/7Qw1X1YtUn8dRSaplWerWt1+YxqgwyUrxhNFxsArboRqxdDCb6mmiyTYuJ2Tkx+YHMbAN9VTdRiWr68vjgIDsoKwc4AX1VNEvs1C7gaGo514UbS4nnVBC3ChUdaOvBVA1rXJt2HgkLmuSdPixoAo3LaswFPBZ1n9xYj4UFYH7A1Hg+3rG70io+EDdeylJ72CjnPq10W8Ez4xpNfAzrrdSOKd+GCN1qHsUUoZr3tJ1vAInSDbbBejQUzcA7apDgfvLE6rPFeto/jp3MSlTV8yJrifD61vIet/gAlFz2Aq5vLrxcgMuX/6/RYjM/4pECYFOc3l280HhCBzZA1Htii/gtyHyQddAaaD1KlKppPLe/Z8j00vjDM7l/9TUnoxa3Kzg6du1uso2g66QhysVdy0yjvA3oY2NtBZuXTK/eKgQa84iSUgeMuxL52uraF7d9vh26kj7u4qkygTLINBuiwPGjAE6KgYQAwg8KWLGtnvfoLUcgcYmUAS+EeXV3vqz6IG5EoYwjQpWj4WR0LJ1xJK9EbA/Xk/9uRtPuoGGijcdIZaH1jvTJkT77K0vJtMdC9qE6HldU7A9cYyL0B8WMx0AbwK9cVtjtwBaHdhbMB0euWKFwfdlMgr9f3tBhoA/int4rrwdxISHexqa6/y4EOEAFqdgg7BOT1eq5Igpba9apcwA4FuTbA1Qhatw90dB3ah+uIg2HlZTCM0zvyM73je3y+/J1p2YLFavxcDnRcgldeluD1LVaHvcK0eFPJQPmWGOi4TUr9QSflPjHQceOf/Gz8s/hudYiBzzb4KEt0INwQXysW9W3ptXEdQ4EZALZoXEfPpsVB947q2x1ukAnGdTCL7dowlDhLQJsDaHLJuA5XATQsTsXgMq7DOA4Jk4zryDS97jTI0QAtyfQI5K3XBZOcv4et9p/CQY6by5fa7uUUGM5zf4xzELrdsAQ/UK41N7G0m7cGgzdWj3ggOosDsYM3WIcxnuYqn5eFjMafx683k9/LQiyb0JPx+psn8SXH4L1M+zGj8ZgKJb62y9d3Rx4y0I95p7pFhRRfSO9lbhlVyFjayfJB1QRZKPe3OeuM7QdZ46UMiudUk2SAXhq1xCg2xY5qojg9ziik+rEaL3NMuGqyOOVPq90I4GrjUvxsm/qnhQOk4YEPyv2qTbJTdL8F+r5FkE8FT+kz1Dy7XtRg01NmHgs+TxZbrkMDE6kAnskAn1CjpDyvdnFSkSZssXIdeBeO66RGVXMTS7vXT9T/9g4YcJkTdeczxZ1qXJRzymOggxboG7cLHZ4T00k+4xur1PNbqT7XAzrMV8nqp1EM73upLkvTtLOQgLarw/fOk3Kf0cU7FugoRwNxDHLvUSCIG48HqW8h9B4Zcrr3GjrKt1j5f+PjQaKioqKioqKioqKiotTg+g/jhnWGqOgW+gAAAABJRU5ErkJggg=="
                          />
                        </defs>
                      </svg>
                    </div>
                    <div className="opt-registeration">
                      <img
                        src="../assets/src/images/uploads/payment-image.png"
                        alt="image"
                      />
                      <h3>Payment Successful</h3>
                      <p>
                        Your payment was successful! You can now <br />
                        continue using hireddd.
                      </p>
                      <div className="status-popup-bottom-btns">
                        <a href="#" className="button fill" title="Register">
                          Go to dashboard
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
          <div className="s-200"></div>
        </section>
      </main>
      <HomePageFoot />
    </>
  );
}
