var topics = ["dog","cat"];

$("#addAnimal").on("click", function () {
    var newAnimal = $("#animalInput").val();
    topics.push(newAnimal);  
    $("#animalDiv").empty();
    animalButtons();
    buttonClick();
    unpause(); 

});

function animalButtons(){
for(var i1=0;i1<topics.length;i1++){
    var btn = $("<button data-animal="+topics[i1]+">"+topics[i1]+"</button>");
    $("#animalDiv").prepend(btn);   
}
}


function buttonClick(){

$("button").on("click", function() {

    $("#gifs-appear-here").empty();
    var person = $(this).attr("data-animal");
if (person === undefined){
    console.log("not a animal")
    }
else{
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    $.ajax({
    url: queryURL,
    method: "GET"
    })


    .then(function(response) {
    var results = response.data;
        for (var i = 0; i < 10; i++) {
             if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var count = $("<p>").text("image: " + (i+1));
                var animalImage = $("<img>");
                var pause = results[i].images.fixed_height.url.replace(".gif","_s.gif");
                animalImage.attr("src", pause);
                gifDiv.append(animalImage);
                $("#gifs-appear-here").append(gifDiv);
                
            }
        }
    });
}
});
};
function unpause(){
    $("body").on("click","img", function () {
        var getData = $(this);
        var getSrc = getData[0].currentSrc;
        var checkGif = getSrc.search("_s.gif");
        if (checkGif === -1){
            var newPause = getSrc.replace(".gif","_s.gif");
            getData.attr("src", newPause);    
        }
        else{
            var newUnPause = getSrc.replace("_s.gif",".gif");
            getData.attr("src", newUnPause);
        }
        
    });
}
animalButtons();
buttonClick();
unpause();