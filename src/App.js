import React, { Component, useRef, useEffect } from "react"
import ReactGA from "react-ga"
import $ from "jquery"
import "./App.css"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import About from "./Components/About"
import Resume from "./Components/Resume"
import Contact from "./Components/Contact"
import Portfolio from "./Components/Portfolio"

class App extends Component {
  constructor(props) {
    super(props)

    this.getResumeData = this.getResumeData.bind(this)

    // Set default lang
    if (localStorage.getItem('user-lang') === null) {
      localStorage.setItem('user-lang', "en")
    }
    
    this.state = {
      resumeData: {},
      lang: localStorage.getItem('user-lang')
    }

    ReactGA.initialize("UA-110570651-1")
    ReactGA.pageview(window.location.pathname)
  }

  getResumeData = () => {
    $.ajax({
      url: "./lang/resumeData-" + localStorage.getItem('user-lang') + ".json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err)
        alert(err)
      }
    })
  }

  componentDidMount = () => {
    this.getResumeData(this.state)
  }

  componentDidUpdate = (prevProps, prevState) => {

    // Update lang
    if (prevState.lang !== this.state.lang) {
      this.getResumeData(this.state)
    }
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} handler={this.getResumeData} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Contact data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />
      </div>
    )
  }
}

export default App