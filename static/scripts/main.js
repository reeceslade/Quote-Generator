document.addEventListener('DOMContentLoaded', function(){
  getQuote();
});

function generate() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = xhttp.response
      document.getElementById("output").innerHTML = response;
    };
  };
  xhttp.open("GET", "/generate", true);
  xhttp.send();
};
  // this functions generate says that if a web brosers status is successful we want a respnse. The respone we want is getting the Output tag (which is text) and change that to HTML text so we can see it on the browser. If we now go to the backend (PY) we can see that this 


function addItem() {
  var ul = document.getElementById("dynamic-list");
  var candidate = document.getElementById("candidate");
  var li = document.createElement("li");
  li.setAttribute('id', candidate.value);
  li.appendChild (document.createTextNode(candidate.value));
  ul.appendChild(li);
  deleteButton = document.createElement('Button')
  deleteButton.classList.add('DeleteBtn')
  deleteButton.innerText = ''
      //  deleteButton.onclick = 'deleteQuote(this)' 
  deleteButton.setAttribute("onclick","deleteQuote(this.parentElement)");
  li.appendChild(deleteButton);
  uploadItem(candidate.value);
}



// this function we have 3 variables referring to a list, the first variable just gets the unb ordered list by ID
//second variable gets the candidate ID (input)
// third variable essentially creates a item in list
// li.set attribute basically gets sets the li item to whatever the input is
// li.append child adds on the value of the input to the list
// and finally the ul.append child fits the ul with li elements below (with the user input)

function deleteQuote(quote) {
  quote.remove();
}

// simple

function getQuote() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var response = xhttp.response
    var obj = JSON.parse(response);
    listq = obj["quotes"];
    document.getElementById('dynamic-list').innerHTML = "";
   // again if the browser is working we want a response, this response is going to be the JSON file which has been converted into readable JS by Json.parse. This file has now been named listq. we also want to get the dynamic list and make it an empty string so that when we input something this string can get added.
    
    for(var i=0; i < listq.length; i++){
        var listed = listq[i];
        listed = document.createElement('li');
        listed.id = "quote" + i
        listed.innerHTML = listq[i]
        document.getElementById('dynamic-list').appendChild(listed)
      // so we loop through the json file (listq) create a new variable which highlights each index. for each index were creating a new li element which will have the id "quote" + i so each item in the li is going to have the id quote plus a the number as to which it was added (show on browser) after this we get the whole ul by the ID and add the child element listed. in plain terms what we are saying is get this li by index and keep adding it to this ul, thats what append child does. 
        deleteButton = document.createElement('Button')
        deleteButton.classList.add('DeleteBtn')
        deleteButton.innerText = ''
        deleteButton.onclick = 'deleteQuote(this)'
        deleteButton.setAttribute("onclick","deleteQuote(this.parentElement)");
        listed.appendChild(deleteButton);
      }   //end loop
    }   //end of if
  };  //funciton end
  // this final deletebutton variables are what we want to display when we click the DeletBtn (red box). So again we create an element in the case button. give it the class list DeleteBtn, make it an empty string (could have an X). When we click this button we want to run the deleteQuote functoin we wrote earlier (code efficiency) 

  xhttp.open('GET', '/get-quote', true);
  xhttp.send();  
};

function uploadItem(quote){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = xhttp.response
    };
  };
  
  xhttp.open("GET", "/upload?quote=" + quote, false);
  xhttp.send();  
}

//uploads added quotes to json 

  var ul = document.getElementById('dynamic-list');
  ul.addEventListener('click', function(e) {
  if (e.target.tagName.toLowerCase() == 'li'){
  let id = e.target.id;
  let element = document.getElementById(id);
  let text = element.innerText;
  document.getElementById('candidate').value = text;
  }
});

// get list vy ID add an event to this so that when we click a list item it will be displayed in the input form 