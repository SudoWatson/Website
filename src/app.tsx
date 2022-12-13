/**
 * Root application for webpage
 */

import React from "react";

import "./app.css";

import Home from "./components/home/home";
import Header from "./components/header/header";
import About from "./components/about/about";
import Skills from "./components/skills/skills";
import Projects from "./components/projects/projects";
import Contact from "./components/contact/contact";
import Footer from "./components/footer/footer";

export default function App() {
	return (
		<div>
			<div id="mobileWarning"><span>WARNING!</span> Please note that this is the first version of this website, and also the first website I have ever built. At this current time the site is not altered to display nicely on mobile devices. While some larger screen mobile devices may view the contents okay, it is very likely that the page will look bad and broken on many others. This is something I WILL fix, but in this first version it is best to view in desktop mode, or better yet, on a computer screen. Thank you</div>
			<Home />
			<Header />
			<div className="container-fluid">
				<About />
				<Skills />
				<Projects />
				<Contact />
				<Footer />
			</div>
		</div>
	);
}
