"use client";

import Link from "next/link";
import "../globals.css";

export default function PricingSection() {
  return (
    <div className="box-pricing">
      <section className="section">
        <div className="container">
          <div className="pricing">
            <div className="pricing-header">
              ha<span className="main-color">v</span>en
            </div>

            <div className="pricing-list">
              <div className="row">
                {/* Basic */}
                <div className="col-4 col-md-12 col-sm-12">
                  <div className="pricing-box">
                    <div className="pricing-box-header">
                      <div className="pricing-name">Gói thường</div>
                      <div className="pricing-price">Miễn phí</div>
                    </div>
                    <div className="pricing-box-content">
                      <p>Originals</p>
                      <p>Switch plans anytime</p>
                      <p>
                        <del>65+ top Live</del>
                      </p>
                      <p>
                        <del>TV Channels</del>
                      </p>
                      <p>
                        <del>4K Video Quality</del>
                      </p>
                    </div>
                    <div className="pricing-box-action">
                      <Link href="#" className="btn btn-hover">
                        <span>Register now</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Premium */}
                <div className="col-4 col-md-12 col-sm-12">
                  <div className="pricing-box highlight">
                    <div className="pricing-box-header">
                      <div className="pricing-name">Premium</div>
                      <div className="pricing-price">
                        200.000 <span>/tháng</span>
                      </div>
                    </div>
                    <div className="pricing-box-content">
                      <p>Originals</p>
                      <p>Switch plans anytime</p>
                      <p>Full HD Video Quality</p>
                      <p>65+ top Live</p>
                      <p>
                        <del>TV Channels</del>
                      </p>
                    </div>
                    <div className="pricing-box-action">
                      <Link href="#" className="btn btn-hover">
                        <span>Register now</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* VIP */}
                <div className="col-4 col-md-12 col-sm-12">
                  <div className="pricing-box">
                    <div className="pricing-box-header">
                      <div className="pricing-name">VIP</div>
                      <div className="pricing-price">
                        400.000 <span>/tháng</span>
                      </div>
                    </div>
                    <div className="pricing-box-content">
                      <p>Originals</p>
                      <p>Switch plans anytime</p>
                      <p>65+ top Live</p>
                      <p>TV Channels</p>
                      <p>4K Video Quality</p>
                    </div>
                    <div className="pricing-box-action">
                      <Link href="#" className="btn btn-hover">
                        <span>Register now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
