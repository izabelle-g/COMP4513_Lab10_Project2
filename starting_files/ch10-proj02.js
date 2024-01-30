

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
         const playData = data;
         
         const actsData = playData.acts;
         
         //TODO: I need a for loop for this like for a of acts then another for loop for s of a
         const scenesData = actsData.scene;
         console.log(actsData);
      })
      .catch(err => {}); 
      });


    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});

function toObjects(playData){
   const actsData = playData.acts;

   //TODO: scene object
   //TODO: act object
   //TODO: play object
}