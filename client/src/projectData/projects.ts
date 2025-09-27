import { projectButtonURLStatus } from "../components/projects/projectButton/projectButton"
// TODO: Turn these data scripts into database tables
let i = 0;

const projects: ProjectData[] = [
    {
        title: "Template",
        imgPath: "/imgs/projects/thumbnail-700x525.png",
        imgPaths: [
            "/imgs/projects/portfolio.png",
            "/imgs/projects/chessThumbnail.png"
        ],
        desc: "Description",
        repoURL: projectButtonURLStatus.UNAVAILABLE_NOREPO,
        demoURL: projectButtonURLStatus.UNAVAILABLE_NOLIVE,
        tags: ["Tags", "Go", "Here"],
        key: i++,
    },
    {
        title: "Portfolio Website",
        imgPath: "/imgs/projects/portfolio.png",
        imgPaths: [
            "/imgs/projects/portfolio.png",
        ],
        desc: "Developed using TypeScript, React, and a bit of Bootstrap, this website you're looking at right now is where I put whatever I want to showcase towards my career. The website is built completely from scratch, by myself, and hosted on a cloud server. Any projects that I want to showcase are shown here, as well as any skills that I have. There's also an easy way to contact me at the bottom of the page. If you want to know more about the site, there's a button at the bottom of this popup that will bring you to the GitHub repository with documentation.",
        repoURL: "https://github.com/SudoWatson/Website",
        demoURL: projectButtonURLStatus.UNAVAILABLE_PORTFOLIO,
        tags: ["HTML", "TypeScript", "React", "Node.js"],
        key: i++,
    },
    {
        title: "TossRight Recycling Classifier",
        imgPath: "/imgs/projects/tossRightThumbnail.png",
        imgPaths: [
            "/imgs/projects/tossRightThumbnail.png",
            "/imgs/projects/tossRight.gif",
        ],
        desc: "A mobile app able to image a classify a piece of waste, using computer vision to classify the material and tell you how to best dispose of the item. Uses a tensorflow model trained on the public TrashNet database. Images taken are sent to an AWS S3 file storage to be used to better train future models. User is able to provide feedback on accuracy of results that gets sent to AWS DynamicDB. Server is hosted on Oracle cloud compute. Android APK available on GitHub repo, in the process of uploading to official Android Application Stores.",
        repoURL: "https://github.com/SudoWatson/tossright-app",
        demoURL: projectButtonURLStatus.UNAVAILABLE_NOLIVE,
        tags: ["Python", "Flutter", "Dart", "Computer Vision", "AWS", "Oracle", "Cloud Compute", "API", "Mobile Development"],
        key: i++,
    },
    {
        title: "PhotoPolarAlign Modernization",
        imgPath: "/imgs/projects/ppa.png",
        imgPaths: [
            "/imgs/projects/ppa.png",
            "/imgs/projects/ppa2.png",
        ],
        desc: "PhotoPolarAlign is an open-source application to assist Polar Alignment of astrophotography cameras. It was originally developed in 2015 by Themos Tsikas, but has mostly been abandoned since 2018. I've forked the application and began maintaining and modernizing the project, including adding documentation, porting from the dead Python 2 to maintained Python 3, improving system integration, and adding a Command Line Interface so the application can be used in scripts for automations.",
        repoURL: "https://github.com/SudoWatson/PhotoPolarAlign",
        demoURL: projectButtonURLStatus.UNAVAILABLE_NOLIVE,
        tags: ["Python", "TKinter GUIs", "Open Source Development", "Astronomy Science", "CLI Development"],
        key: i++,
    },
    {
        title: "16-Bit Computer Emulator",
        imgPath: "/imgs/projects/EmulatorView.png",
        imgPaths: [
            "/imgs/projects/EmulatorView.png",
        ],
        desc: "This is a Terminal User Interface for an Emulator of a 16-Bit Computer I've designed. At the moment it includes most functionality, including 16 general purpose registers to use, addition, subtraction, bitwise logic, and 16-Bit RAM. I have planned designs to add ALU flags for conditional jumping, I/O, a stack, and some other parts to make it as cabaple as possible. I also have plans to develop an assembly language compiler, basic operating system, basic utility programs, and a C compiler for it. Additionally, I will eventually build the computer using off-the-shelf logic chips to be able to run all these programs on real hardware. This project is still in very active development, and as such changes will be made often and documentation will be out of date until it is refreshed and updated.",
        repoURL: "https://github.com/SudoWatson/NOS-Computer",
        demoURL: projectButtonURLStatus.UNAVAILABLE_NOLIVE,
        tags: ["C++", "Assembly", "Computer Architecture", "Program Compilers", "Logical Architecture"],
        key: i++,
    },
    {
        title: "3D \"Game\" Engine",
        imgPath: "/imgs/projects/sandboxGame.png",
        imgPaths: [
            "/imgs/projects/sandboxGame.png",
        ],
        desc: "This is a project I made for an independent study software development course I took in high school. After finishing the two semesters of software development courses in one quarter, I took an independent study for the remaining quarter. I developed a week-by-week plan of what I wanted to accomplish each week. I decided to learn from an online series on developing a game engine. Developed in Java with the Light Weight Java Graphics Library(LWJGL, a Java implementation of OpenGL), I implemented the very basics of 3D graphics and game development concepts. While it's not an actual game, it allowed me to learn the implementation of 3D graphics and some fundamental game development techniques and how game engines run under the hood. You can read more about it by viewing the GitHub repository.",
        repoURL: "https://github.com/SudoWatson/SandboxGame",
        demoURL: projectButtonURLStatus.UNAVAILABLE_NOLIVE,
        tags: ["Java", "LWJGL", "OOP", "Shaders", "Python", "3D Graphics", "Animation", "XML", "File Formats"],
        key: i++,
    },
    {
        title: "Chess Clone",
        imgPath: "/imgs/projects/chessThumbnail.png",
        imgPaths: [
            "/imgs/projects/chessThumbnail.png",
        ],
        desc: "A clone of the famous board game Chess! Implemented in Java using the Processing library for the graphical interface, 2 people can take turns playing against each other capturing opponent pieces. I have only written this project in Java currently, so there isn't a live version available at the moment. But check back in the future as I plan on porting a live version! Click the 'Code' button in the bottom-right to view the repository of this project",
        repoURL: "https://github.com/SudoWatson/Chess",
        demoURL: projectButtonURLStatus.UNAVAILABLE_NOLIVE,
        tags: ["Java", "Processing", "OOP"],
        key: i++,
    },
];

export default projects;
