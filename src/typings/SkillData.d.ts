/**
 * Stores the data information for a portfolio project
 * @param {string} title - Title of the project
 * @param {string} imgPath - //TODO make this work with multiple media files
 * @param {string} desc - Description of the project
 * @param {string | null} repoURL - URL to the GitHub of the code, or null if private
 * @param {string | null} demoURL - URL to a live demo version, or null
 */
 interface SkillData {
    imageURL?: string,
    name?: string,
};