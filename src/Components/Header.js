import React, { Component } from "react"
import ParticlesBg from "particles-bg"
import Fade from "react-reveal"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"

class Header extends Component {
  render() {
    if (!this.props.data) return null

    const linkedin = this.props.data.linkedin
    const github = this.props.data.github
    const name = <ReactMarkdown remarkPlugins={[remarkGfm]}>{this.props.data.name}</ReactMarkdown>
    const description = <ReactMarkdown remarkPlugins={[remarkGfm]}>{this.props.data.description}</ReactMarkdown>
    const nav = this.props.data.nav

    const handleLangClick = e => {
      e.preventDefault()
      localStorage.setItem('user-lang', e.target.lang)
      this.props.handler()
    }

    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                {nav.home}
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                {nav.about}
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                {nav.resume}
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                {nav.works}
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#contact">
                {nav.contact}
              </a>
            </li>
          </ul>

          <ul id="nav" className="nav">
            <li>
              <a className="smoothscroll" onClick={handleLangClick} href="#en" lang="en">
                EN
              </a>
            </li>

            <li>
              <a className="smoothscroll" onClick={handleLangClick} href="#es" lang="es">
                ES
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href={linkedin} target="_blank" rel="noreferrer" className="button btn project-btn">
                  <i className="fa fa-linkedin"></i>LinkedIn
                </a>
                <a href={github} target="_blank" rel="noreferrer" className="button btn github-btn">
                  <i className="fa fa-github"></i>Github
                </a>
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header
