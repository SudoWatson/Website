// TODO Turn these data scripts into database tables
let i = 0;

const projects: ProjectData[] = [
	{
		title: "Template",
		imgPath: "/imgs/projects/thumbnail-700x525.png",
		desc: "Description",
		repoURL: "UNAVAILABLE-NOREPO",
		demoURL: "UNAVAILABLE-NOLIVE",
		tags: ["Tags", "Go", "Here"],
		key: i++,
	},
	{
		title: "Portfolio Website",
		imgPath: "/imgs/projects/portfolio.png",
		desc: "Developed using TypeScript, React, and a bit of Bootstrap, this website you're looking at right now is where I put whatever I want to showcase towards my career. The website is built completely from scratch, by myself, and hosted on a cloud server. Any projects that I want to showcase are shown here, as well as any skills that I have. There's also an easy way to contact me at the bottom of the page.",
		repoURL: "https://github.com/SudoWatson/Website",
		demoURL: "UNAVAILABLE-PORTFOLIO",
		tags: ["HTML", "TypeScript", "React", "Node.js"],
		key: i++,
	},
	{
		title: "Chess Clone",
		imgPath: "/imgs/projects/chessThumbnail.png",
		desc: "A clone of the famous board game Chess! Implemented in Java using the Processing library for the graphical interface, 2 people can take turns playing against each other capturing opponent pieces. I have only written this project in Java currently, so there isn't a live version available at the moment. But check back in the future as I plan on porting a live version! Click the 'Code' button in the bottom-right to view the repository of this project",
		repoURL: "https://github.com/SudoWatson/Chess",
		demoURL: "UNAVAILABLE-NOLIVE",
		tags: ["Java", "Processing", "OOP"],
		key: i++,
	},
	{
		title: "Sandbox \"Game\"",
		imgPath: "/imgs/projects/sandboxGame.png",
		desc: "This is a project I made for an independent study software development course I took in high school. After finishing the two semesters of software development courses in one quarter, I took an independent study for the remaining quarter. I developed a week-by-week plan of what I wanted to accomplish each week. I decided to learn from an online series on game development. Developed in Java with the Light Weight Java Graphics Library(LWJGL, a Java implementation of OpenGL), I implemented the very basics of 3D graphics and game development concepts. While it's not an actual game, it allowed me to learn the implementation of 3D graphics and game development techniques. You can read more about it by viewing the GitHub repository.",
		repoURL: "https://github.com/SudoWatson/SandboxGame",
		demoURL: "UNAVAILABLE-NOLIVE",
		tags: ["Java", "LWJGL", "OOP", "Shaders", "Python", "3D Graphics", "Animation", "XML", "File Formats"],
		key: i++,
	},
];

export default projects;
