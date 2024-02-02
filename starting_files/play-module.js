class Play{
    /**
     * @param {string} title Title of the play
     * @param {string} short The short version of the title
     * @param {array} persona The roles in the play and who are they played
     * @param {array} acts The acts available in the play    
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
     * @param {array} scenes The scenes within the Act
     */
    constructor(name, scenes){
        this.name = name;
        this.scenes = scenes;
    }
}

class Scene{
    /**
     * @param {string} name The name of the scene
     * @param {string} sceneTitle The title of the scene
     * @param {string} stageDir The stage direction
     * @param {array} speeches The speeches within the Scene
     */
    constructor(name, sceneTitle, stageDir, speeches){
        this.name = name;
        this.sceneTitle = sceneTitle;
        this.stageDir = stageDir;
        this.speeches = speeches;
    }
}

export { Play, Act, Scene };