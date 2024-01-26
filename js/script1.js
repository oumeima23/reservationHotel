//fonction signup pour enregistrement/ajout des clients
function signupClient() {

    //récupération des données
    var firstName = document.getElementById("firstName").value;
    //validation
    var isFirstNameValid = checkLength(firstName, 3);
    if (isFirstNameValid == false) {
        document.getElementById("firstNameError").innerHTML = "first Name should have at least 3 carac";
        document.getElementById("firstNameError").style.color = "red";
    }
    else {
        document.getElementById("firstNameError").innerHTML = "";
    }
    checkCondition(isFirstNameValid, "firstNameError", "first Name should have at least 3 carac");

    var lastName = document.getElementById("lastName").value;

    var isLastNameValid = checkLength(lastName, 4);
    if (isLastNameValid == false) {
        document.getElementById("lastNameError").innerHTML = "last Name should have at least 4 carac";
        document.getElementById("lastNameError").style.color = "red";
    }
    else {
        document.getElementById("lastNameError").innerHTML = "";
    }
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;

    var isPwdValid = checkLength(pwd, 6);
    if (isPwdValid == false) {
        document.getElementById("pwdError").innerHTML = "pwd should have at least 6 carac"
        document.getElementById("pwdError").style.color = "red";

    } else {
        document.getElementById("pwdError").innerHTML = ""

    }
    var tel = document.getElementById("tel").value;
    var isTelValid = checkTel(tel, 8);
    if (isTelValid == false) {
        document.getElementById("telError").innerHTML = "tel should have 8 carac"
        document.getElementById("telError").style.color = "red"
    } else {
        document.getElementById("telError").innerHTML = ""
    }
    var address = document.getElementById("address").value;
    if (isFirstNameValid == true && isLastNameValid && isPwdValid
        && isTelValid) {
        var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
        //création de l'obj
        var user = {
            id: generateId(usersTab) + 1,
            FN: firstName,
            LN: lastName,
            email: email,
            password: pwd,
            tel: tel,
            address: address,
            role: "client"
        };

        //save into LS
        var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("login.html");
    }


}
//fonction signup pour enregistrement/ajout des stores
function signupOwner() {
    //récupération des données
    var firstName = document.getElementById("firstNameOwner").value;
    //validation
    var isFirstNameValid = checkLength(firstName, 4);
    if (isFirstNameValid == false) {
        document.getElementById("firstNameErrorOwner").innerHTML = "first Name should have at least 4 carac";
        document.getElementById("firstNameErrorOwner").style.color = "red";
    }
    else {
        document.getElementById("firstNameErrorOwner").innerHTML = "" ;
    }

    var lastName = document.getElementById("lastNameOwner").value;

    var isLastNameValid = checkLength(lastName, 4);
    if (isLastNameValid == false) {
        document.getElementById("lastNameErrorOwner").innerHTML = "last Name should have at least 4 carac";
        document.getElementById("lastNameErrorOwner").style.color = "red";
    }
    else {
        document.getElementById("lastNameErrorOwner").innerHTML = "";
    }
    var email = document.getElementById("emailOwner").value;
    var pwd = document.getElementById("pwdOwner").value;

    var isPwdValid = checkLength(pwd, 6);
    if (isPwdValid == false) {
        document.getElementById("pwdErrorOwner").innerHTML = "pwd should have at least 6 carac"
        document.getElementById("pwdErrorOwner").style.color = "red";

    } else {
        document.getElementById("pwdErrorOwner").innerHTML = ""

    }



    var tel = document.getElementById("telOwner").value;
    var isTelValid = checkTel(tel, 8);
    if (isTelValid == false) {
        document.getElementById("telErrorOwner").innerHTML = "tel should have 8 carac"
        document.getElementById("telErrorOwner").style.color = "red"
    } else {
        document.getElementById("telErrorOwner").innerHTML = ""
    }
    var OwnerName = document.getElementById("OwnerName").value;
    var address = document.getElementById("adressOwner").value;
    if (isFirstNameValid == true && isLastNameValid && isPwdValid
        && isTelValid) {
        var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
        //création de l'obj
        var user = {
            id: generateId(usersTab) + 1,
            FN: firstName,
            LN: lastName,
            email: email,
            password: pwd,
            OwnerName: OwnerName,
            address: address,
            tel: tel,
            role: "Owner",
            status: "NOK"
        };

        //save into LS
        var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("login.html");
    }
}
//fonction signup pour enregistrement/ajout d'un admin'
function signupAdmin() {
    //récupération des données
    var firstName = document.getElementById("firstNameAdmin").value;
    var lastName = document.getElementById("lastNameAdmin").value;
    var email = document.getElementById("emailAdmin").value;
    var pwd = document.getElementById("pwdAdmin").value;
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    //création de l'obj
    var user = {
        id: generateId(usersTab) + 1,
        FN: firstName,
        LN: lastName,
        email: email,
        password: pwd,

        role: "admin",

    };

    //save into LS
    // var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    usersTab.push(user);
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.replace("login.html");
}
// fonction pour l'optimisation de la récupération d'une valeur du html
function getValue(id) {
    return document.getElementById(id).value;
}
//fonction pour se connecter (vérifier si l'utilisateur existe dans LS)
function login() {
    //récupération des données
    var email = getValue('emailValue');
    var passWord = getValue('pwdValue');

    var findedUser;
    //récupérer tous les users déjà enregistrés dans LS
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    //parcourir tout le tab des users pour chercher si ce user existe
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].email == email && usersTab[i].password == passWord) {
            findedUser = usersTab[i];
            break;
        }
    }

    //user existe
    if (findedUser) {
        console.log('findedUser', findedUser);
        //cnx selon le role
        if (findedUser.role == "client") {
            localStorage.setItem("connectedUserId", findedUser.id);
            location.replace("index.html");
        }
        else if (findedUser.role == "Owner") {
            //attente de validation par l'admin
            if (findedUser.statut == "NOK") {
                document.getElementById('loginError').innerHTML = "account not yet verified"
            } else {
                localStorage.setItem("connectedUserId", findedUser.id);
                location.replace("owner.html");
            }
        }
        else {
            localStorage.setItem("connectedUserId", findedUser.id);
            location.replace("admin.html");
        }
        //user not found
    } else {
        document.getElementById("loginError").innerHTML = "please check email/pwd";
        document.getElementById("loginError").style.color = "gray";
    }
}    
//comparer longueur d'une chaine % nbr
function checkLength(ch, n) {
    if (ch.length>=n) {
      return true;
    }
    else {
      return false;
    }
    return (ch.length >= n);
}
//comparer l'égalité de 2 chaines
function checkPwd(ch1, ch2) {
    return (ch1 == ch2);
}
//comparer l'égalité de la longueur d'une chaine % nbr
function checkTel(ch, n) {
    return (ch.length == n)
}
//vérifier si n1>n2
function checkPrice(n1, n2) {
    return (Number(n1) > n2);
}
//vérifier si n1>=n2
function checkNumber(n1, n2) {
    return (Number(n1) >= n2)
}
//si condition fausse, afficher un msg d'erreur sinn msg vide
function checkCondition(a, id, msg) {
    if (a == false) {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = "red";
    }
    else {
        document.getElementById(id).innerHTML = "";
    }
}
//fonction pr la génération auto d'un id (chercher le max)
function generateId(T) {
    var max;
    //tab vide
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id
            }

        }

    }
    return max;
}
//rechercher et retourner un obj avec son id et sa clé
function searchObjByIdAndKey(id, key) {
    var T = JSON.parse(localStorage.getItem(key) || "[]");
    var findedObj;
    for (let i = 0; i < T.length; i++) {
        if (T[i].id == id) {
            findedObj = T[i];
            break;
        }

    }
    return findedObj;
}
//chercher la position d'une commande avec son id
function searchObjByPos(id,key) {
    var T = getFromLS(key);
    var pos;
    for (let i = 0; i < T.length; i++) {
        if (T[i].id == id) {
            pos = i;
            break;
        }

    }
    return pos;
}
 //fonction pour ajouter/enregisrtrer une maison dans LS
function addHouses() {
    //récupération des données
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var roomsNumber = document.getElementById('roomsNumber').value;
    var description = document.getElementById('description').value;
    var city = document.getElementById('city').value;

    //validation
    var isnameValid = checkLength(name , 5);
    if (isnameValid == false) {
        document.getElementById('nameError').innerHTML = 'name should have 5 carac ';
    } else {
        document.getElementById('nameError').innerHTML = "";
    }
    var isaddressValid = checkLength(address , 8);
    if (isaddressValid == false) {
        document.getElementById('addressError').innerHTML = 'address should have 8 carac ';
    } else {
        document.getElementById('addressError').innerHTML = "";
    }
    var isroomsNumberValid = checkNumber(roomsNumber , 5);
    if (isroomsNumberValid == false) {
        document.getElementById('roomsNumberError').innerHTML = 'roomsNumber should have <=5 ';
    } else {
        document.getElementById('roomsNumberError').innerHTML = "";
    }
    var isdescriptionValid = checkLength(description ,10);
    if (isdescriptionValid == false) {
        document.getElementById('descriptionError').innerHTML = 'description should have 10 carac ';
    } else {
        document.getElementById('descriptionError').innerHTML = "";

    }
    if (isnameValid && 
        isaddressValid && 
        isroomsNumberValid &&
        isdescriptionValid ) {
        var HousesTab = JSON.parse(localStorage.getItem('Houses') || '[]');
        var connectedUserId = localStorage.getItem("connectedUserId");
        
    //création de l'obj
    var Houses ={
        id: generateId(HousesTab) + 1,
        name: name,
        address : address ,
        roomsNumber : roomsNumber,
        description :description,
        city :city ,
        ownerId: connectedUserId
    }
        //save into LS
        HousesTab.push(Houses);
        localStorage.setItem('Houses', JSON.stringify(HousesTab));
        location.replace("houses.html");
    }
}
function displayHouses() {
    var HousesTab = JSON.parse(localStorage.getItem('Houses') || '[]');
    var content = ``;

    for (let i = 0; i < HousesTab.length; i++) {
        content = content + `
            <div class="row">
                <div  class="room-item" style="margin-left: 100px" >
                <img src="img/photohouses.jpg" alt=""  >
                    <div class="ri-text" >
                        <h4>Luxury Room</h4>
                        <h3>${HousesTab[i].name}</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td class="r-o"> address : </td>
                                    <td>${HousesTab[i].address}</td>
                                </tr>
                                <tr>
                                    <td class="r-o">roomsNumber:</td>
                                    <td>${HousesTab[i].roomsNumber}</td>
                                </tr>
        
                                <tr>
                                    <td class="r-o">description:</td>
                                    <td>${HousesTab[i].description}</td>
                                </tr>
                                <tr>
                                    <td class="r-o">city:</td>
                                    <td>${HousesTab[i].city}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-primary" onclick ="goToDisplay(${HousesTab[i].id})">More Détails</button>
                    
                    </div>
                </div>
            </div>

       
        `
        
    }
    document.getElementById("HousesDiv").innerHTML = content;

}
function goToDisplay(id) {
    localStorage.setItem("displayedHousesId",id)
    location.replace("addRooms.html");
    
}
// fonction pour ajouter les chambres au LS
function addRooms() {
    // Récupération des données
    var name = document.getElementById('prName').value;
    var capacite = document.getElementById('prcapacity').value;
    var prix = document.getElementById('prPrice').value;
    var service = document.getElementById('services').value;
    var Bed = document.getElementById('Bed').value;

    // Validation
    var isNameValid = checkLength(name, 4);

    if (!isNameValid) {
        document.getElementById('prNameError').innerHTML = 'Le nom doit avoir au moins 4 caractères';
    } else {
        document.getElementById('prNameError').innerHTML = '';
    }

    if (isNameValid) {
        var roomTab = JSON.parse(localStorage.getItem("rooms") || '[]');
        var displayedHousesId = localStorage.getItem("displayedHousesId");
        
        // Vérifier le nombre de chambres dans cette maison
        var roomsInHouse = roomTab.filter(function(room) {
            return room.houseId === displayedHousesId;
        });

        if (roomsInHouse.length >= 5) {
            document.getElementById('roomError').innerHTML = 'La maison ne peut pas avoir plus de 5 chambres';
        } else {
            document.getElementById('roomError').innerHTML = '';

            // Création de l'objet
            var room = {
                id: generateId(roomTab) + 1,
                prName: name,
                prCapacite: capacite,
                prPrice: prix,
                service: service,
                Bed: Bed,
                houseId: displayedHousesId
            };

            // Sauvegarde dans le stockage local
            roomTab.push(room);
            localStorage.setItem('rooms', JSON.stringify(roomTab));
            location.replace("rooms.html");
        }
    }
    
}
function displayRooms() {
    var roomsTab = JSON.parse(localStorage.getItem('rooms') || '[]');
    var content = ``;
    for (let i = 0; i < roomsTab.length; i++) {
        content = content +`
        
        <div class="col-lg-4 col-md-8">
        <div class="room-item" style="margin-left: 100px">
            <img src="img/room/room-4.jpg" alt="">
            <div class="ri-text">
                <h4>${roomsTab[i].prName}</h4>
                <h3>159$<span>/Pernight</span></h3>
                <table>
                    <tbody>
                    <tr>
                            <td class="r-o">Capacity:</td>
                            <td>${roomsTab[i].prCapacite}</td>
                        </tr>
                        <tr>
                            <td class="r-o">price:</td>
                            <td>${roomsTab[i].prPrice}</td>
                        </tr>
                        
                        <tr>
                            <td class="r-o">bed:</td>
                            <td>${roomsTab[i].Bed}</td>
                            
                        </tr>
                        <tr>
                            <td class="r-o">Services:</td>
                            <td>${roomsTab[i].service}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="#" class="btn btn-primary" onclick="goToDisplayRooms(${roomsTab[i].id})">More Details</a>
            </div>
        </div>
    </div>
       
        `
    }
    document.getElementById("RoomsDiv").innerHTML = content;
  
}
function goToDisplayRooms(id) {
    localStorage.setItem("displayedRoomsId",id);
    location.replace("roomsDetails.html");
    
    
    
}
//fct pr afficher dyn les détails du  room sélectionné
function displayRoomsDétails() {
    var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    var displayedRoomsId = localStorage.getItem("displayedRoomsId");
    var findedrooms;
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == displayedRoomsId) {
            findedrooms = rooms[i];
            break;
        }
    }
    document.getElementById("displayedprName").innerHTML = findedrooms.prName;
    document.getElementById("displayedprPrice").innerHTML = findedrooms.prPrice;
    document.getElementById("displayedprCapacity").innerHTML = findedrooms.prCapacity;
    document.getElementById("displayedservice").innerHTML = findedrooms.service;
  
}
 //Afficher toutes les reservations pour l'admin
function displayReservation() {
    var reservationsTab = JSON.parse(localStorage.getItem("reservation") || "[]");
    var content = ``;
    for (let i = 0; i < reservationsTab.length; i++) {
        content = content + `
        <tr>
        <td>
            <div class="media">
               
                <div class="media-body">
                
                    <p>${reservationsTab[i].id}</p>
                </div>
            </div>
        </td>

        <div>
        <td>
            <h5>${reservationsTab[i].userId}</h5>
        </td>
        </div>

        <div>
        <td>
            <h5>${reservationsTab[i].roomsId}</h5>
        </td>
        </div>
       <div>
        <td>
        <h5>${reservationsTab[i].nbrPlace}</h5>
       </td>
       </div>
       <div>
       <td>
            <h5>${reservationsTab[i].checkIn}</h5>
        </td>
        </div>

        <div>
        <td>
            <h5>${reservationsTab[i].chechout}</h5>
        </td>
        </div>
        <div>
        <td><button class="btn btn-danger">Delete</button></td>
    </tr>
    </div>
        
        
        `
    }
    document.getElementById("reservationDiv").innerHTML = content;

}
//fonction pour afficher dans basket les reserv de l'utilisateur connecté
function displayMyReservation() {
    var reservationsTab = JSON.parse(localStorage.getItem("reservation")||"[]");
    var connectedUserId = localStorage.getItem('connectedUserId');
    var myReservation = [];
    for (let i = 0; i < reservationsTab.length; i++) {
        if (reservationsTab[i].userId == connectedUserId) {
            myReservation.push(reservationsTab[i]);
            
        } 
    }
    var content = ``;
    var s = 0;
    for (let i = 0; i < myReservation.length; i++) {
        s = s+searchObjByIdAndKey(myReservation[i].roomsId,"rooms").price;
        content = content + `
        <tr>
        <td>
            <div class="media">
                <div class="media-body">
                    <h5>${myReservation[i].id}</h5>
                </div>
            </div>
        </td>
        <div>
        <td>
            <h5>${searchObjByIdAndKey(myReservation[i].userId,"users").FN}</h5>
        </td>
        </div>
        <div>
        <td>
            <h5>${(myReservation[i].roomsId)}</h5>
        </td>
        </div>
        <div>
        <td>
        <h5>${(myReservation[i].nbrPlace)}</h5>
       </td>
       </div>
       <div>
       <td>
            <h5>${myReservation[i].checkIn}</h5>
        </td>
        </div>
        <div>
        <td>
            <h5>${myReservation[i].checkOut}</h5>
        </td>
        </div>
        <div>
        <td><button class="btn btn-danger" onclick=" deleteReserByAdmin(${myReservation[i].id})">Delete</button></td>
    </tr>
    </div>
        
        `
    }
    document.getElementById("reservationBasDiv").innerHTML = content;

    
}

//fonction pour supprimer les reservations by admin
function deleteReserByAdmin(id) {
    var reservationTab=getFromLS("reservation");
    var pos = searchObjByPos(id,"reservation");
    reservationTab.splice(pos,1);
    localStorage.setItem ("reservation",JSON.stringify(reservationTab));
    location.reload();
    
}
//récupérer une clé de LS
function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
    //afficher dynamiquement les données du connectedUser
function displayProfile() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var connectedUser = searchObjByIdAndKey(connectedUserId, "users");
    console.log("connectedUser", connectedUser);
    document.getElementById("connectedUserFN").innerHTML = connectedUser.FN;
    document.getElementById("connectedUserLN").innerHTML = connectedUser.LN;
    document.getElementById("connectedUserEmail").innerHTML = connectedUser.email;
    document.getElementById("connectedUserTel").innerHTML = connectedUser.tel;

}
function editProfile() {
        var connectedUserId=localStorage.getItem('connectedUserId');
        var form=`
        <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                                <div class="col-md-12 form-group">
                                    <input type="email" class="form-control" id="newEmail" placeholder="Email" >
                                </div>
                                <div class="col-md-12 form-group">
                                    <input type="tel" class="form-control" id="newTel"  placeholder="tel" >
                                </div>
                            
                                <div class="col-md-12 form-group">
                                    <button type="submit" value="submit" class="primary-btn" onclick="validateEditProfile(${connectedUserId})">Validate</button>
                                
                                </div>
                            </div>
        `
        document.getElementById('profileEdit').innerHTML=form;
    }
//afficher tous les maisons à l'admin
function displayAdminHouses() {
    var housesTab = JSON.parse(localStorage.getItem("Houses") || "[]");
    var content = ``;

    for (let i = 0; i < housesTab.length; i++) {

        content = content + `
      <tr>
      <td>
          <div class="media">
             
              <div class="media-body">
                  <p>${housesTab[i].id}</p>
              </div>
          </div>
      </td>
      <td>
          <h5>${housesTab[i].name}</h5>
      </td>
    
      <td>
      <h5>${housesTab[i].ownerId}</h5>
  </td>
  <td>
  <h5>${housesTab[i].address}</h5>
</td>
<td>
<h5>${housesTab[i].city}</h5>
</td>
      
      <td><button class="btn btn-danger" onclick="deleteHousesByAdmin(${housesTab[i].id})">Delete</button>
      
  </tr>
      `

    }
    document.getElementById("housesAdminDiv").innerHTML = content;
}
// fonction qui permet à l'admin de supprimer une maisons
function deleteHousesByAdmin(id) {
    var housesTab = getFromLS("Houses");
    var pos=searchObjByPos(id,'Houses');
    var roomsTab=getFromLS("rooms");
    for (let i = 0; i < roomsTab.length; i++) {
      if (roomsTab[i].housesId==id) {
        roomsToDelete.push(i); 
      }  
    }
    // Parcourir les pièces pour trouver celles associées à la maison à supprimer
    var roomsToDelete = [];
        for (let i = 0; i < roomsTab.length; i++) {
            if (roomsTab[i].housesId == id) {
                roomsToDelete.push(i);
            }
        }
          // Supprimer les pièces associées à la maison
    for (let i = roomsToDelete.length - 1; i >= 0; i--) {
        roomsTab.splice(roomsToDelete[i], 1);
    }
    
    housesTab.splice(pos, 1);
    roomsTab.splice(pos,1);
    localStorage.setItem("rooms", JSON.stringify(roomsTab));
    localStorage.setItem("Houses", JSON.stringify(housesTab));
    location.reload();
}

//afficher tous les rooms à l'admin
function displayAdminRoom() {
    var roomTab = JSON.parse(localStorage.getItem("rooms") || "[]");
    var content = ``;

    for (let i = 0; i < roomTab.length; i++) {

        content = content + `
      <tr>
      <td>
          <div class="media">
             
              <div class="media-body">
                  <p>${roomTab[i].id}</p>
              </div>
          </div>
      </td>
      <td>
          <h5>${roomTab[i].prName}</h5>
      </td>
    
      <td>
      <h5>${roomTab[i].prPrice}</h5>
  </td>
  <td>
  <h5>${roomTab[i].prCapacite}</h5>
</td>
<td>
<h5>${roomTab[i].service}</h5>
</td>
      
      <td><button class="btn btn-danger" onclick="deleteRoomsByAdmin(${roomTab[i].id})">Delete</button>
     
  </tr>
      `

    }
    document.getElementById("roomAdminDiv").innerHTML = content;
}
// fonction qui permet à l'admin de supprimer une chambre
function deleteRoomsByAdmin(id) {
    var roomTab = getFromLS("rooms");
    var pos = searchObjByPos(id,'rooms');
    var reservationTab = getFromLS("reservation");
    // Parcourir les pièces pour trouver un seul reservation  à la room à supprimer
    var resevToDelete = [];
    for (let i = 0; i < reservationTab.length; i++) {
        if (reservationTab[i].roomsId == id) {
            resevToDelete.push(i);
        }
    }
    // Supprimer les pièces associées à la maison
    for (let i = resevToDelete.length - 1; i >= 0; i--) {
        reservationTab.splice(resevToDelete[i], 1);
    }
    // Supprimer la maison du tableau des maisons
    roomTab.splice(pos, 1);
    // Mettre à jour le stockage local avec les nouvelles données
    localStorage.setItem("rooms", JSON.stringify(roomTab));
    localStorage.setItem("reservation", JSON.stringify(reservationTab));
    location.reload();
}

//afficher les owners & clients à l'admin
function displayUsersByAdmin() {
    var usersTab=getFromLS("users");
    var content ="";
    for (let i = 0; i < usersTab.length; i++) {
       if (usersTab[i].role != "admin") {
        //afficher le btn validate au owner ayant status nok
       if (usersTab[i].role =="Owner" && usersTab[i].status =="NOK") {
        content = content + `
        <tr>
        <td>
            <div class="media">
               
                <div class="media-body">
                    <p>${usersTab[i].id}</p>
                </div>
            </div>
        </td>
        <td>
            <h5>${usersTab[i].FN} ${usersTab[i].LN}</h5>
        </td>
      
        <td>
        <h5>${usersTab[i].email}</h5>
    </td>
    <td>
    <h5>${usersTab[i].tel}</h5>
</td>
<td>
<h5>${usersTab[i].OwnerName}</h5>
</td>
<td>
<h5>${usersTab[i].address}</h5>
</td>
    <td>
    <h5>${usersTab[i].role}</h5>
  </td>
  <td>
  <h5>${usersTab[i].status}</h5>
  </td>
  <td>
<button class="btn btn-danger" onclick="deleteUsersByAdmin(${usersTab[i].id})"> Delete </button>
<button class="btn btn-warning" onclick="validateOwnerByAdmin(${usersTab[i].id})"> Validate </button>
  </td>    
       
    </tr>
        `
       }
       else {
        content = content + `
        <tr>
        <td>
            <div class="media">
               
                <div class="media-body">
                    <p>${usersTab[i].id}</p>
                </div>
            </div>
        </td>
        <td>
            <h5>${usersTab[i].FN} ${usersTab[i].LN}</h5>
        </td>
      
        <td>
        <h5>${usersTab[i].email}</h5>
    </td>
    <td>
    <h5>${usersTab[i].tel}</h5>
</td>
<td>
<h5>${usersTab[i].OwnerName}</h5>
</td>
<td>
<h5>${usersTab[i].address}</h5>
</td>
    <td>
    <h5>${usersTab[i].role}</h5>
  </td>
  <td>
  <h5>${usersTab[i].status}</h5>
  </td>
  <td>
<button class="btn btn-danger" onclick="deleteUsersByAdmin(${usersTab[i].id})"> Delete </button>
<button class="btn btn-warning" onclick="validateOwnerByAdmin(${usersTab[i].id})"> Validate </button>

  </td>    
       
    </tr>
        ` 
       }
       }
        
    }
    document.getElementById("usersDiv").innerHTML=content;
}

//fonction qui permet à l'admin de supprimer user
function deleteUsersByAdmin(id) {
    var usersTab = getFromLS("users");
    var pos=searchObjByPos(id,'users');
    var connectedUserId=getFromLS("connectedUserId");
   
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].connectedUserId==id) {
      
      }
        
    }
    usersTab.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.reload();
}
//rendre le status ok pour le owner
function validateOwnerByAdmin(id) {
    var usersTab = getFromLS("users");
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id== id) {
            usersTab[i].status='ok';
            break;
            
        }
        
    }
    localStorage.setItem('users',JSON.stringify(usersTab));
}

//afficher formulaire rempli avec anciennes valeurs
function editHousesByAdmin(id) {
    var Houses = searchObjByIdAndKey(id, "Houses")
    var form = `
    <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="newname" value=${Houses.name} placeholder="name" >
							</div>
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="newdescription"value=${Houses.description}  placeholder="" >
							</div>
						
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" class="primary-btn" onclick="validateEdit(${Houses.id})">validate</button>
							
							</div>
						</div>
    `
    document.getElementById("editHouse").innerHTML = form;
}

function validateEdit(id) {
    //récupération des données
    var newname = getValue("newname");
    var newdescription = getValue("newdescription");
    var HousesTab = getFromLS("Houses");
    for (let i = 0; i < productsTab.length; i++) {
        if (HousesTab[i].id == id) {
            HousesTab[i].name = newname;
            HousesTab[i].description = newdescription;
            break;
        }
    }
    localStorage.setItem("Houses", JSON.stringify(HousesTab));
    location.reload();
}
//fonction reservation houses pour l'admin
function reservationHousesByAdmin() {
    var reservationsTab = JSON.parse(localStorage.getItem("reservation") || "[]");
    var content = ``;
    for (let i = 0; i < reservationsTab.length; i++) {
        content = content + `
      <tr>
      <td>
          <div class="media">
             
              <div class="media-body">
                  <p>${reservationsTab[i].id}</p>
              </div>
          </div>
      </td>
      <td>
          <h5>${reservationsTab[i].checkIn}</h5>
      </td>
    
      <td>
      <h5>${reservationsTab[i].checkOut}</h5>
  </td>
  <td>
  <h5>${reservationsTab[i].nbrPlace}</h5>
</td>
<td>
<h5>${reservationsTab[i].roomsId}</h5>
</td>
<td>
<h5>${reservationsTab[i].userId}</h5>
</td>

      
      <td><button class="btn btn-danger" onclick=" deleteReserByAdmin(${reservationsTab[i].id})">Delete</button>
      
  </tr>
      `

    }
    document.getElementById("reservationsDiv").innerHTML = content;

}

//afficher les produits du owner connecté
function displayOwnerHouses() {
    var tabhouses = getFromLS("Houses");
    var myhouses = [];
    var content = '';
    var connectedUserId = localStorage.getItem("connectedUserId");
    for (let i = 0; i < tabhouses.length; i++) {
        if (tabhouses[i].ownerId == connectedUserId) {
            myhouses.push(tabhouses[i]);
        }
    }
    for (let i = 0; i < myhouses.length; i++) {
        content = content + `
        <tr>
        <td>
            <div class="media">
               
                <div class="media-body">
                    <p>${myhouses[i].id}</p>
                </div>
            </div>
        </td>
        <td>
            <h5>${myhouses[i].address}</h5>
        </td>
      
        <td>
        <h5>${myhouses[i].city}</h5>
    </td>
    <td>
    <h5>${myhouses[i].description  }</h5>
  
  </td>
  <td>
  <h5>${myhouses[i].name }</h5>
 
</td>
  <td>
  <h5>${myhouses[i].ownerId}</h5>
  </td>
  <td>
  <button class="btn btn-danger" onclick="deleteHouseOwner(${i})">Delete</button>
  <button class="btn btn-warning" onclick=" editHousesByOwner(${myhouses[i].id})">Edit</button>
  <button class="btn btn-success" onclick="  goToDisplay (${myhouses[i].id})">Add</button>
  
  </td>
       
    </tr>
        `

    }

    document.getElementById("OwnerDiv").innerHTML = content;
}

//fonction pour supprimer les maisons par l'owner
function deleteHouseOwner(pos) {
    var houses = JSON.parse(localStorage.getItem("Houses") || "[]");

    if (pos < 0 || pos >= houses.length) {
        return; // Vérifiez si la position est valide
    }

    var houseIdDelete = houses[pos].id;

    var rooms = JSON.parse(localStorage.getItem("rooms") || '[]');
    var updatedRooms = [];

    // Filtrer les chambres pour conserver uniquement celles qui ne sont pas liées à la maison à supprimer
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].houseId !== houseIdDelete) {
            updatedRooms.push(rooms[i]);
        }
    }

    // Suppression de la maison
    houses.splice(pos, 1);

    // Enregistrement des données mises à jour dans le stockage local
    localStorage.setItem("Houses", JSON.stringify(houses));
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));

    location.reload();
}

function editHousesByOwner() {

    var displayedHousesId=localStorage.getItem('displayedHousesId');
    var form =` 
                            
    <div class="col-md-12 form-group">
        <input type="text" id="newName" class="form-control"  placeholder="newName" value="${displayedHousesId.newName}" >
    </div>
    <div class="col-md-12 form-group">
        <input type="number" id="newRoomsNumber" class="form-control" value="${displayedHousesId.newRoomsNumber}" placeholder="Rooms Number" >
    </div>
 <div>
    <button type="submit" class="danger-btn" value="submit" onclick=" validateEditByOwner(${displayedHousesId.id})">Edit</button>
   
 </div>
    
    
    `
    document.getElementById('housesOwnerEdit').innerHTML= form;
}

function validateEditByOwner(id) {
    var newName = document.getElementById("newName").value;
    var newRoomsNumber = document.getElementById("newRoomsNumber").value;
    var houses =getFromLS("Houses");
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].id==id) {
            houses[i].newName == newName;
            houses[i].nbrRooms == newRoomsNumber;
            break;
            
        }
        
    }
    localStorage.setItem('Houses',JSON.stringify(houses));
    location.reload();
    
}

function displayOwnerRooms() {
    var roomsTab = getFromLS("rooms");
    var myrooms = [];
    var content = '';
    var displayedHousesId = localStorage.getItem("displayedHousesId");
    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].houseId == displayedHousesId) {
            myrooms.push(roomsTab[i]);
        }
    }
    for (let i = 0; i < myrooms.length; i++) {
        content = content + `
        <tr>
        <td>
            <div class="media">
               
                <div class="media-body">
                    <p>${myrooms[i].id}</p>
                </div>
            </div>

            <td>
            <h5>${myrooms[i].houseId }</h5>
          </td>

        </td>
        <td>
            <h5>${myrooms[i].prName}</h5>
        </td>
      
        <td>
        <h5>${myrooms[i].prPrice}</h5>
    </td>

    <td>
    <h5>${myrooms[i].prCapacite }</h5>
  
  </td>

  <td>
  <h5>${myrooms[i].service }</h5>
 
  </td>

  
  <td>
  <button class="btn btn-danger" onclick="deleteRoomsByOwner(${myrooms[i].id})">Delete</button>
  <button class="btn btn-warning"onclick=" editRByOwner(${myrooms[i].id})">Edit</button>
  <button class="btn btn-success"onclick="goToDisplayRooms(${myrooms[i].id})">Add</button>
  </td>
       
    </tr>

        `

    }
    document.getElementById("roomsDiv").innerHTML = content;


    
}
// fonction pour suprimer les chambre par l'owner
function deleteRoomsByOwner(id) {
    var roomsTab = getFromLS("rooms");
    var pos = searchObjByPos(id, 'rooms');
    
    roomsTab.splice(pos, 1);
    localStorage.setItem("rooms", JSON.stringify(roomsTab));
    
    location.reload();
}

function editRByOwner() {
    var displayedRoomsId = localStorage.getItem('displayedRoomsId')
    var form = `
    <div class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
				<div class="col-md-12 form-group">
					<input type="text" class="form-control" id="newName" value =" ${displayedRoomsId.prName}" placeholder="newName" >
				</div>
				<div class="col-md-12 form-group">
					<input type="number" class="form-control" id="newCapacity"value ="${displayedRoomsId.prCapacity}"  placeholder="newCapacity" >
				</div>
						
				<div class="col-md-12 form-group">
			     	<button type="submit" value="submit" class="primary-btn" onclick=" validateRoomsEditByOwner(${displayedRoomsId.id})">validate</button>
							
				</div>
				</div>
    `
    document.getElementById("roomsOwnerEdit").innerHTML = form;
    
}
function validateRoomsEditByOwner(id) {
    var newName= document.getElementById("newName").value;
    var newCapacity = document.getElementById("newCapacity").value;
    var rooms =getFromLS("rooms");
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id==id) {
            rooms[i].prName == newName;
            rooms[i].prCapacity == newCapacity;
            break;
            
        }
        
        
    }
    localStorage.setItem('rooms',JSON.stringify(rooms));
    location.reload();
    
}
// fonction reservation par l'owner
function reservationMyRooms() {
    var reservationsTab = JSON.parse(localStorage.getItem("reservation") || "[]");
    var myrooms = [];
    var content = ``;
    var displayedRoomsId = localStorage.getItem("displayedRoomsId");

    for (let i = 0; i < reservationsTab.length; i++) {
        if (reservationsTab[i].roomsId == displayedRoomsId) {
            myrooms.push(reservationsTab[i]);
        }

        content = content + `
      <tr>
      <td>
          <div class="media">
             
              <div class="media-body">
                  <p>${reservationsTab[i].id}</p>
              </div>
          </div>
      </td>
      <td>
          <h5>${reservationsTab[i].checkIn}</h5>
      </td>
    
      <td>
      <h5>${reservationsTab[i].checkOut}</h5>
  </td>
  <td>
  <h5>${reservationsTab[i].nbrPlace}</h5>
</td>
<td>
<h5>${reservationsTab[i].roomsId}</h5>
</td>
<td>
<h5>${reservationsTab[i].userId}</h5>
</td>

      
     
  </tr>
      `

    }
    document.getElementById("reservationsRoomsDiv").innerHTML = content;

    
}
function searchByNameOrByAdress() {
    var name = document.getElementById("searchName").value;
    var houses=getFromLS("Houses");
    var content =``
    var findedHouses=[];
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].name == name) {
            findedHouses.push(houses[i])
        }
    }
    for (let i = 0; i < findedHouses.length; i++) {
        content = content + `
        <div class="row">
            <div class="room-item">
                <img src="img/photohouses.jpg" alt="">
                <div class="ri-text">
                    <h4>Luxury Room</h4>
                    <h3>${findedHouses[i].name}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td class="r-o"> address : </td>
                                <td>${findedHouses[i].address}</td>
                            </tr>
                            <tr>
                                <td class="r-o">description:</td>
                                <td>${findedHouses[i].roomsNumber}</td>
                            </tr>
    
                            <tr>
                                <td class="r-o">description:</td>
                                <td>${findedHouses[i].description}</td>
                            </tr>
                            <tr>
                                <td class="r-o">city:</td>
                                <td>${findedHouses[i].city}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button   onclick ="goToDisplay(${findedHouses[i].id})">More Détails</button>
                
                </div>
            </div>
        </div>

    `
        
    }
    document.getElementById('searcHousesDiv').innerHTML=content;

    
}
// fonction pour afficher le header selon le role et selon l'etat de cnx
function generatedHeader() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    // console.log("here is connectedUserId",connectedUserId);
    var connectedUserId = searchObjByIdAndKey(connectedUserId, "users");
    // console.log('here is connected user obj',connectedUserId);
    var content = ``;
    //conecté
    if (connectedUserId) {
        if (connectedUserId.role=="client") {
            content=   
            ` <div class="top-nav">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <ul class="tn-left">
                            <li><i class="fa fa-phone"></i> (216) 203070</li>
                            <li><i class="fa fa-envelope"></i> diarLemdina@gmail.com</li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <div class="tn-right">
                            <div class="top-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-tripadvisor"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                            </div>
                            <a href="#" class="bk-btn">Booking Now</a>
                            <div class="language-option">
                                <img src="img/flag.jpg" alt="">
                                <span>EN <i class="fa fa-angle-down"></i></span>
                                <div class="flag-dropdown">
                                    <ul>
                                        <li><a href="#">Zi</a></li>
                                        <li><a href="#">Fr</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-item">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="logo">
                            <a href="./index.html">
                                <img src="img/logo.png" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-10">
                        <div class="nav-menu">
                            <nav class="mainmenu">
                                <ul>
                                    <li class="active"><a href="./index.html">Home</a></li>
                                    <li class="active"><a href="./signupClient.html">signup</a></li>
                                    <li class="active"><a href="./houses.html">houses</a></li>
                                    <li class="active"><a href="./rooms.html">rooms</a></li>
                                    <li class="active"><a href="./basket.html">Basket</a></li>
                                    <li><a href="" onclick="logOut()">logOut</a></li>
                                    <li><a href="" onclick=" search.html">search</a></li>
                                </ul>
                            </nav>
                            <div class="nav-right search-switch">
                                <i class="icon_search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            
            ` 

        }
        else if(connectedUserId.role=="Owner"){
            content=   ` <div class="top-nav">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <ul class="tn-left">
                            <li><i class="fa fa-phone"></i> (216) 20405060</li>
                            <li><i class="fa fa-envelope"></i> info.colorlib@gmail.com</li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <div class="tn-right">
                            <div class="top-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-tripadvisor"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                            </div>
                            <a href="#" class="bk-btn">Booking Now</a>
                            <div class="language-option">
                                <img src="img/flag.jpg" alt="">
                                <span>EN <i class="fa fa-angle-down"></i></span>
                                <div class="flag-dropdown">
                                    <ul>
                                        <li><a href="#">Zi</a></li>
                                        <li><a href="#">Fr</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-item">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="logo">
                            <a href="./index.html">
                                <img src="img/logo.png" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-10">
                        <div class="nav-menu">
                            <nav class="mainmenu">
                                <ul>
                                    <li class="active"><a href="./index.html">Home</a></li>
                                    <li class="active"><a href="./signupOwner.html">signup</a></li>
                                    <li class="active"><a href="./addHouses.html">addHouses</a></li>
                                    <li class="active"><a href="./addRooms.html">addRooms</a></li>
                                    <li class="active"><a href="./owner.html">Dashboard</a></li>
                                    <li><a href="" onclick="logOut()">logOut</a></li>
                                    <li><a href="search.html" >search</a></li>

                                </ul>
                            </nav>
                            <div class="nav-right search-switch">
                                <i class="icon_search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            
            `

        }
        else { content=   ` <div class="top-nav">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="tn-left">
                        <li><i class="fa fa-phone"></i> (216) 20405060</li>
                        <li><i class="fa fa-envelope"></i> info.colorlib@gmail.com</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="tn-right">
                        <div class="top-social">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-tripadvisor"></i></a>
                            <a href="#"><i class="fa fa-instagram"></i></a>
                        </div>
                        <a href="#" class="bk-btn">Booking Now</a>
                        <div class="language-option">
                            <img src="img/flag.jpg" alt="">
                            <span>EN <i class="fa fa-angle-down"></i></span>
                            <div class="flag-dropdown">
                                <ul>
                                    <li><a href="#">Zi</a></li>
                                    <li><a href="#">Fr</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="menu-item">
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="logo">
                        <a href="./index.html">
                            <img src="img/logo.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="nav-menu">
                        <nav class="mainmenu">
                            <ul>
                                <li class="active"><a href="./index.html">Home</a></li>
                                <li class="active"><a href="./signupOwner.html">signup</a></li>
                                <li class="active"><a href="./addHouses.html">addHouses</a></li>
                                <li class="active"><a href="./signupOwner.html">addRooms</a></li>
                                <li class="active"><a href="./owner.html">Dashboard</a></li>

                               
                               
                                <li><a href="" onclick="logOut()">logOut</a></li>
                                <li><a href="search.html">search</a></li>
                            </ul>
                        </nav>
                        <div class="nav-right search-switch">
                            <i class="icon_search"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        
        `}
    

    } else 
     // non conecté 

    {
      content=   `<div class="top-nav">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="tn-left">
                        <li><i class="fa fa-phone"></i> (12) 345 67890</li>
                        <li><i class="fa fa-envelope"></i> info.colorlib@gmail.com</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="tn-right">
                        <div class="top-social">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-tripadvisor"></i></a>
                            <a href="#"><i class="fa fa-instagram"></i></a>
                        </div>
                        <a href="#" class="bk-btn">Booking Now</a>
                        <div class="language-option">
                            <img src="img/flag.jpg" alt="">
                            <span>EN <i class="fa fa-angle-down"></i></span>
                            <div class="flag-dropdown">
                                <ul>
                                    <li><a href="#">Zi</a></li>
                                    <li><a href="#">Fr</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="menu-item">
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="logo">
                        <a href="./index.html">
                            <img src="img/logo.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="nav-menu">
                        <nav class="mainmenu">
                            <ul>
                                <li class="active"><a href="./index.html">Home</a></li>
                                <li class="active"><a href="./signupAdmin.html">signup</a></li>
                                <li class="active"><a href="./admin.html">Dashboard</a></li>
                                 <li><a href="search.html">search</a></li>
                               
                              
                                
                            </ul>
                        </nav>
                        <div class="nav-right search-switch">
                            <i class="icon_search"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        


        `
    }
  document.getElementById('headerDiv').innerHTML=content;
}
// fonction pour se déconecté
function logOut() {
    localStorage.removeItem("connectedUserId");
    location.replace("home.html");
    
}
//fct de controle le room disponble pour la reservation
function reservation() {
    // recuperation des donnes
var nbrPlace = document.getElementById("nbrPlace").value;
var checkIn =document.getElementById("ckeckin").value;
var checkOut =document.getElementById("checkOut").value;
var checkInMs = new Date(checkIn).getTime();
var checkOutMs = new Date(checkOut).getTime();

var connectedUserId = localStorage.getItem("connectedUserId");
    var displayedRoomId = localStorage.getItem("displayedRoomsId");
    var rooms = searchObjByIdAndKey(displayedRoomId, "rooms");
    var reservTab = JSON.parse(localStorage.getItem("reservation") || "[]");
if (nbrPlace>rooms.prCapacite) {
    document.getElementById('nbrPlaceError').innerHTML = 'le nombre de personne est inferieur a la capacite de room';
    document.getElementById('nbrPlaceError').style.color = "red";   
}
else {
   if(nbrPlace <=rooms.capacite & reservTab.length ==0 ) 
{ 
    var newreservation = {
        id: generateId(reservTab) + 1,
        userId: connectedUserId,
        roomsId: displayedRoomId,
        nbrPlace: nbrPlace,
        checkIn:checkIn,
        checkOut:checkOut,
       
    }
    reservTab.push (newreservation);
    localStorage.setItem("reservation", JSON.stringify(reservTab));
}

 else {

    var isNotAvailable = false;
    
    for (let i = 0; i < reservTab.length; i++) {
    
    var tabResMsCheckIn = new Date(reservTab[i].checkIn).getTime();
    
    var tabResMsCheckOut = new Date(reservTab[i].checkOut).getTime();
    
    if ((checkInMs >= tabResMsCheckIn && checkOutMs <= tabResMsCheckOut) ||

    (checkInMs <= tabResMsCheckIn && (checkOutMs <= tabResMsCheckOut && checkOutMs >= tabResMsCheckIn)) ||
    
    ((checkInMs <= tabResMsCheckOut && checkInMs >= tabResMsCheckIn) && checkOutMs >= tabResMsCheckOut)
    
    ) {
    
       isNotAvailable = true;
    
    break;
    
    }
    document.getElementById('room-status').textContent ='Desole cette chambre ne est pas disponible pour les dates selectionnes'
    document.getElementById("room-status").style.color = "red";  
    }
    
    if (!isNotAvailable) {
    
    var newreservation = {
    
        id: generateId(reservTab) + 1,
        userId: connectedUserId,
        roomsId: displayedRoomId,
        nbrPlace: nbrPlace,
        checkIn:checkIn,
        checkOut:checkOut,
        
    }
    reservTab.push (newreservation);
    localStorage.setItem("reservation", JSON.stringify(reservTab));
    location.replace("basket.html")
    
    }
    
    }
    
    }  
   

    
}


    
