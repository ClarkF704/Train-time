// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRzbEUpZ5fHMCBc4kI9eUyFXIg3b3OJ_w",
    authDomain: "traintrain-2c9f3.firebaseapp.com",
    databaseURL: "https://traintrain-2c9f3.firebaseio.com",
    projectId: "traintrain-2c9f3",
    storageBucket: "traintrain-2c9f3.appspot.com",
    messagingSenderId: "590869934516"
};
firebase.initializeApp(config);

var trainName = "";
var destination = "";
var ttime = "";
var comment = "";
//when we click submit we grab whats in the places of user input and places them in the empty variables above.

$("#addTrain").on("click", function (e) {
    e.preventDefault();
    trainName = $("#trainInput").val().trim();
    destination = $("#desInput").val().trim();
    ttime = $("#freeInput").val().trim();
    comment = $("#naInput").val().trim();



    //push data to firebase 
    firebase.database().ref().push({
        trainName: trainName,
        destination: destination,
        ttime: ttime,
        comment: comment,
        //we add date added to refresh most recent member by using a dynamic link
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    //clear data field
    $("#trainInput").val("");
    $("#desInput").val("");
    $("#freeInput").val("");
    $("#naInput").val("");
});


//Listener for well at bottom of page to show all members
//listens to children that are added to database

firebase.database().ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function (snapshot) {
    
    var trainN = snapshot.val().trainName;
    var tdestination = snapshot.val().destination;
    var trtime= snapshot.val().ttime;
    var frequency = snapshot.val().comment;
// calculates time
    var timeCon = moment(trtime, "HH:mm").subtract(1, "years");

    var calcTime = moment().diff(moment(timeCon), "minutes");

    tRemainder = calcTime % frequency;

    var timeGone = frequency - tRemainder;

    var nextTrain = moment().add(timeGone, "m").format("hh:mm A");

    var tableRow = $("<tr>").append(
        $("<td>").text(trainN),
        $("<td>").text(tdestination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(timeGone),
        console.log(timeGone)
    );
    $("#striped > tbody").append(tableRow);

})



