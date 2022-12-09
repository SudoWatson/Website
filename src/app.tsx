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
