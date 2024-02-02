// when you're using modules, you need to add the import and export lines
import { Play, Act, Scene } from "./play-module.js";

document.addEventListener("DOMContentLoaded", function() {
	
	let url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
 
   const selectPlay = document.querySelector("#playList");

   selectPlay.addEventListener("change", function() {
      // modify url to the selected play
      const play = selectPlay.value;
      url = url + "?name=" + play;

      // fetch the play data, throw an error message if the fetch failed
      fetch(url)
      .then(resp => {if(resp.ok) return resp.json();
                     else throw new Error("Fetch Failed");})
      .then(data => {
         // Data is in JS, to string = JSON.stringify(data);  
         // If JSON to JS obj = JSON.parse(data);
         const curPlay = toPlayObject(data);

         const selectAct = document.querySelector("#interface #actList");
         const selectScene = document.querySelector("#interface #sceneList");

         // populate Act select
         populateSelect(selectAct, curPlay.acts);

         // select Act
         selectAct.addEventListener("change", function() {
            const act = selectAct.value;

            // populate Scene select
            for(const a of curPlay.acts){
               if(a.name == act){
                  populateSelect(selectScene, a.scenes);
               }
            }
         }); // ***
      }) // **
      .catch(err => { "Fetch Failed" }); 
   }); // *
});


/**
 * Converts the contents of the JSON data into a JS Play Object
 * @param {*} jsonData the data from the API
 * @returns            a Play object
 */
function toPlayObject(jsonData){
   const actsData = jsonData.acts;
   const playActs = [];
   let actScenes = [];
   let scene;
   let act;

   // creating new scene and acts objects
   for(const a of actsData){
      // clear actScenes of new Act
      actScenes = [];
      
      // create new Scene Object and add to scene list of current Act
      for(const s of a.scenes){
         scene = new Scene(s.name, s.title, s.stageDirection, s.speeches);
         actScenes.push(scene);
      }
      
      // create new Act Object and add to acts list of current Play
      act = new Act(a.name, actScenes);
      playActs.push(act);
   }

   return new Play(jsonData.title, jsonData.short, jsonData.persona, playActs);
}


/**
 * Populates a select element dynamically
 * @param {*} select the specific select element we would like to populate
 * @param {*} list   the array from which we want to pull the items from
 * @desc             the clear select code snippet is from w3schools tutorial
 */
function populateSelect(select, list){
   // clear select
   while(select.hasChildNodes()){
      select.removeChild(select.firstChild);
   }

   const msgOpt = document.createElement("option");
   msgOpt.value = "0";
   if(select.id == "actList"){
      msgOpt.innerHTML = "Choose an Act";
   } else if(select.id == "sceneList"){
      msgOpt.innerHTML = "Choose a Scene";
   }
   select.appendChild(msgOpt);

   // populate the rest of the select
   for(const l of list){
      const opt = document.createElement("option");
      opt.value = l.name;
      opt.innerHTML = l.name;
      select.appendChild(opt);
   }
}

function display(play){
   const 
}