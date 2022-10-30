import React from 'react'

import './app.css'

import Home from './components/home/home';
import Header from './components/header/header';
import About from './components/about/about';
import Footer from './components/footer/footer';
import Projects from './components/projects/projects';


export default function App() {
  return (
    <>
        <Home />
        <Header />
        <About />
        <Projects />
        <Footer />
    </>
  )
}