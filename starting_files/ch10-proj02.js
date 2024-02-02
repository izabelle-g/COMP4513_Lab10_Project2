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
         initialDisplay(curPlay);

         const selectAct = document.querySelector("#interface #actList");
         const selectScene = document.querySelector("#interface #sceneList");
         const selectPlayer = document.querySelector("#interface #playerList");

         // populate Act select
         populateSelect(selectAct, curPlay.acts);

         // select Act
         selectAct.addEventListener("change", function() {
            const act = selectAct.value;
         
            // populate Scene select
            for(const a of curPlay.acts){
               if(a.name == act){
                  updateAct(a);
                  populateSelect(selectScene, a.scenes);

                  selectScene.addEventListener("change", function(){
                     const scene = selectScene.value;
         
                     for(const s of a.scenes){
                        if(s.name == scene){
                           updateScene(s);
                           populatePlayers(s);

                           selectPlayer.addEventListener("change", function(){
                              const player = selectPlayer.value;
                              const text = document.querySelector("#txtHighlight");
                              const btn = document.querySelector("#btnHighlight");
                              
                              btn.addEventListener("click", function(){
                                 const search = text.value; 
                                 playerScenes(player, s);
                                 searchLines(search, player, s);
                              });
                           });
                        }
                     }
                  });
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

/**
 * Populates the side view of the site with the first scene of the first act
 * @param {*} curPlay 
 */
function initialDisplay(curPlay){
   const playInfo = document.querySelector("#playHere");
   const actInfo = document.querySelector("#actHere");
   const sceneInfo = document.querySelector("#sceneHere");

   const h2 = document.createElement("h2");
   h2.textContent = curPlay.playTitle;
   playInfo.insertBefore(h2, playInfo.children[0]);

   const h3 = document.createElement("h3");
   h3.textContent = curPlay.acts[0].name;
   actInfo.insertBefore(h3, actInfo.children[0]);

   const sceneOne = curPlay.acts[0].scenes[0];
   const h4 = document.createElement("h4");
   h4.textContent = sceneOne.name;
   sceneInfo.appendChild(h4);

   const title = document.createElement("p");
   title.className = "title";
   title.textContent = sceneOne.sceneTitle;
   sceneInfo.appendChild(title);

   const stageDir = document.createElement("p");
   stageDir.className = "direction";
   stageDir.textContent = sceneOne.stageDir;
   sceneInfo.appendChild(stageDir);

   populateSpeeches(sceneOne, sceneInfo);
}

function updateAct(curAct){
   const title = document.querySelector("#actHere h3");
   title.textContent = curAct.name;

   clear();
}

function updateScene(curScene){
   const sceneInfo = document.querySelector("#sceneHere");
   const scene = document.querySelector("#sceneHere h4");
   const title = document.querySelector("#sceneHere .title");
   const stageDir = document.querySelector("#sceneHere .direction");
   
   clear();
   
   scene.textContent = curScene.name;
   title.textContent = curScene.sceneTitle;
   stageDir.textContent = curScene.stageDir;

   populateSpeeches(curScene, sceneInfo);
}

function populateSpeeches(curScene, sceneInfo){
   // for all speeches in scene one
   for(const s of curScene.speeches){
      const div = document.createElement("div");
      const span = document.createElement("span");
      
      div.className = "speech";
      span.textContent = s.speaker;
      div.appendChild(span);

      // for all the lines
      for(const l of s.lines){
         const p = document.createElement("p");
         p.textContent = l;
         div.appendChild(p);
      }

      if(Object.hasOwn(s, "stagedir")){
         const em = document.createElement("em");
         em.textContent = s.stagedir;
         div.appendChild(em);
      }
      sceneInfo.appendChild(div);
   }
}

function clear(){
   // clears the displayed speeches
   const speeches = document.querySelectorAll("#sceneHere .speech");
   for(const s of speeches){
      s.remove();
   }

   const h4 = document.querySelector("#sceneHere h4");
   h4.textContent = "";

   const sceneTitle = document.querySelector("#sceneHere .title");
   sceneTitle.textContent = "";

   const stageDir = document.querySelector("#sceneHere .direction");
   stageDir.textContent = "";
}

function populatePlayers(curScene){
   const selectPlayer = document.querySelector("#playerList");
   const playerList = [];

   while(selectPlayer.childNodes.length > 2){
      selectPlayer.removeChild(selectPlayer.lastChild);
   }

   for(const p of curScene.speeches){
      if(!(playerList.includes(p.speaker))){
         playerList.push(p.speaker);

         const opt = document.createElement("option");
         opt.value = p.speaker;
         opt.innerHTML = p.speaker;
         selectPlayer.appendChild(opt);
      }
   }
}

function playerScenes(player, curScene){
   const sceneInfo = document.querySelector("#sceneHere");
   const scene = document.querySelector("#sceneHere h4");
   const title = document.querySelector("#sceneHere .title");
   const stageDir = document.querySelector("#sceneHere .direction");

   clear();

   scene.textContent = curScene.name;
   title.textContent = curScene.sceneTitle;
   stageDir.textContent = curScene.stageDir;

   for(const p of curScene.speeches){
      const div = document.createElement("div");
      div.className = "speech";

      if(p.speaker == player){
         const span = document.createElement("span");
         span.textContent = p.speaker;
         div.appendChild(span);
         for(const l of p.lines){
            const para = document.createElement("p");
            para.textContent = l;
            div.appendChild(para);
         }

         if(Object.hasOwn(p, "stagedir")){
            const em = document.createElement("em");
            em.textContent = p.stagedir;
            div.appendChild(em);
         }
      }

      sceneInfo.appendChild(div);
   }
}

function searchLines(search, curPlayer, curScene){
   const sceneInfo = document.querySelector("#sceneHere");
   const scene = document.querySelector("#sceneHere h4");
   const title = document.querySelector("#sceneHere .title");
   const stageDir = document.querySelector("#sceneHere .direction");

   clear();

   scene.textContent = curScene.name;
   title.textContent = curScene.sceneTitle;
   stageDir.textContent = curScene.stageDir;

   for(const p of curScene.speeches){
      const div = document.createElement("div");
      div.className = "speech";
      if(p.speaker == curPlayer){
         for(const l of p.lines){
            if(l.includes(search)){
               const span = document.createElement("span");
               span.textContent = p.speaker;
               div.appendChild(span);
               const para = document.createElement("p");
               para.innerHTML = l.replace(search, '<b>' + search + '</b>');
               div.appendChild(para);
            }
         }

         if(Object.hasOwn(p, "stagedir")){
            const em = document.createElement("em");
            em.textContent = p.stagedir;
            div.appendChild(em);
         }
      }
      sceneInfo.appendChild(div);
   }
}