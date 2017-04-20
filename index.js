var add = document.getElementsByClassName("add");

function submitJSON() {
    var retrieved = sessionStorage.getItem('people');
    var http = new XMLHttpRequest();
    var url = "fakepath.php";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.send(retrieved);
}

document.getElementsByTagName("button")[1].setAttribute("id", "submit");
var submit = document.getElementById("submit");
submit.addEventListener('click', submitJSON);

loadData();

function loadData() {
    var retrieved = sessionStorage.getItem('people');
    var retrievedObject = JSON.parse(retrieved);
    console.log(retrievedObject);
    if (retrievedObject != null) {
        var col = [];
        for (var i = 0; i < retrievedObject.length; i++) {
            for (var key in retrievedObject[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.style.border = "solid 1px";

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var tr = table.insertRow(-1); // TABLE ROW.
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            th.style.border = "solid 1px";
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < retrievedObject.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = retrievedObject[i][col[j]];
                tabCell.style.border = "solid 1px";

            }
        }
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        table.setAttribute("id","table123");
        var divContainer = document.getElementsByClassName("debug")[0];
        divContainer.innerHTML = "";
        divContainer.style.display = "inline-block";
        divContainer.appendChild(table);

     //Cleaning the table and remove button if no entries present
    if(retrievedObject.length!=0){
        removePrevious();
    }
    else{
        document.getElementById("table123").remove();
        document.getElementsByClassName("debug")[0].style.display="none";
    }
    }
}

function People(age, relationship, smoker) {
    this.age = age;
    this.relationship = relationship;
    this.smoker = smoker;
}

for (var i = 0, j = add.length; i < j; i++) {
    add[i].addEventListener("click", validandcreate)
}

function createPeople(newpeople) {
    if (sessionStorage.people) {
        people = JSON.parse(sessionStorage.getItem('people'));
    } else {
        people = [];
    }
    people.push(newpeople);
    console.log(people);
    sessionStorage.setItem('people', JSON.stringify(people));

    var retrievedObject = sessionStorage.getItem('people');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    console.log(retrievedObject);
}

function removePrevious() {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Remove Previous");
    btn.setAttribute("id", "button");
    btn.addEventListener("click", whenClickFilled);
    btn.appendChild(t);
    document.getElementsByClassName("debug")[0].appendChild(btn);
}

function whenClickFilled() {
    if (sessionStorage) {
        var peep = JSON.parse(sessionStorage.getItem('people'));
    } else {
        alert("Empty");
    }
    peep.pop();

     if(peep.length===0){
         document.getElementById("button").remove();
     }
    console.log(peep);
    sessionStorage.setItem('people', JSON.stringify(peep));
    loadData();
}

//After validation create the session object method
function validandcreate() {
    if (validate()) {
        var age = document.getElementsByName("age")[0].value;
        var rel = document.getElementsByName("rel")[0].value;
        var check = document.getElementsByName("smoker")[0];
        var a;
        if (check.checked) {
            a = "Yes";
        } else {
            a = "No";
        }
        var people = new People(age, rel, a);

        createPeople(people);
    }
}
//Validation for age and Relationship
function validate() {
    var age = document.getElementsByName("age")[0].value;
    var rel = document.getElementsByName("rel")[0].value;
    var smoker = document.getElementsByName("smoker").checked;

    if (age == '') {
        alert("Please enter the age");
        return false;
    }
    if (age < 0) {
        alert("The age must be a number greater than 0");
        return false;
    } else if (isNaN(age)) {
        alert("Enter a valid age");
        return false;
    }
    if (rel == '') {
        alert("Relationship is required");
        return false;
    }
    return true;
}