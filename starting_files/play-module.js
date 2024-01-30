class Play{
    /**
     * @param {string} title Title of the play
     * @param {string} short The short version of the title
     * @param {array} persona The roles in the play and who are they played
     * @param {Act} acts The acts available in the play    
     */
    constructor(playTitle, short, persona, acts){
        this.playTitle = playTitle;
        this.short = short;
        this.persona = persona;
        this.acts = acts;
    }
}

class Act{
    /**
     * @param {string} name The name of the Act
     * @param {Scene} scenes The scenes within the Act
     */
    constructor(actName, scenes){
        this.actName = actName;
        this.scenes = scenes;
    }
}

class Scene{
    /**
     * @param {string} sceneName The name of the scene
     * @param {string} sceneTitle The title of the scene
     * @param {string} stageDir The stage direction
     * @param {array} speech The speeches within the Scene
     */
    constructor(sceneName, sceneTitle, stageDir, speech){
        this.sceneName = sceneName;
        this.sceneTitle = sceneTitle;
        this.stageDir = stageDir;
        this.speech = speech;
    }
}