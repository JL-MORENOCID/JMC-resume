import React, { Component } from "react";
import Fade from "react-reveal";

class Footer extends Component {
  render() {
    if (!this.props.data) return null;

    const currentYear = new Date().getFullYear()

    const networks = this.props.data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className}></i>
          </a>
        </li>
      );
    });

    return (
      <footer>
        <div className="row">
          <Fade bottom>
            <div className="twelve columns">
              <ul className="social-links">{networks}</ul>

              <ul className="copyright">
                <li>&copy; Copyright {currentYear} JMC for BlueClouds</li>
                <li>
                  Design by{" "}
                  <a title="JMC" href="mailto:jl.morenocid@gmail.com">
                    JMC
                  </a>
                </li>
              </ul>
            </div>
          </Fade>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
