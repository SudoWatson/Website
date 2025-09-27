/**
 * Stores the data information for a portfolio project
 * @param {string} title - Title of the project
 * @param {string} imgPath - //TODO make this work with multiple media files
 * @param {string} desc - Description of the project
 * @param {string} repoURL - URL to the GitHub of the code, or null if private
 * @param {string} demoURL - URL to a live demo version, or null
 * @param {string[]} tags - List of string tags or skills relavent to project
 */
interface ProjectData {
    title: string,
    imgPath?: string,
    imgPaths: string[],
    desc: string,
    repoURL: string,
    demoURL: string,
    tags: string[],
    key: number,
};