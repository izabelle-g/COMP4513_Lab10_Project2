

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

         toDataList(playData);
      })
      .catch(err => {}); 
      });


    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});

// returns whatever list data you need
function toDataList(jsonData){
   let dataList = [];

   for(const k of Object.keys(jsonData)){
      if(k == "acts"){
         dataList = jsonData.acts;
         break; // get out of the loop
      } else if(k == "scenes"){
         for(const j of jsonData){
            for(const s of j.scenes){
               dataList.push(s);

               break; // get out of the loop
            }
         }
         break; 
      }
   }
    
   return dataList;
}