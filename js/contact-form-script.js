


function submit1Form(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();

    const request = new XMLHttpRequest();
    request.open("PATCH", "https://json.extendsclass.com/bin/e37662b5175b", true);
    request.setRequestHeader("Security-key", "Your security key");
    request.onreadystatechange = () => {
    };
    request.send('{"pink": "and a new line! \n"}');

    /* Contact Form Section
    ===================================================== */

    // get data from json store
    function get1DataStore() {
     var visitorList;
     var data;
     var index = 1;
     $.ajax({
       url: "https://myjson.dit.upm.es/api/bins/h4uf",
       method: "Get",
       success: function(dataStore){
         data = dataStore;
         console.log(data);
       },
       error: function() {
           console.log("error");
       },
       complete: function() {
           console.log("done");
       }
     });
   }

}

// get data from json store
function getDataStore() {
 var visitorList;
 var data;
 var index = 1;
 $.ajax({
   url: "https://myjson.dit.upm.es/api/bins/h4uf",
   method: "Get",
   success: function(dataStore){
     data = dataStore;
     console.log(data);
     return data;
   },
   error: function() {
       console.log("error");
   },
   complete: function() {
       console.log("done");
   }
 });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function form(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

function saveFormData(updatedDataStore) {
  $.ajax({
    url:"https://myjson.dit.upm.es/api/bins/h4uf",
    type:"PUT",
    data: JSON.stringify(updatedDataStore),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, textStatus, jqXHR){
    // alert(textStatus);
    }
  });
}

// add new message data
function submitForm(data) {
  // get current form dataType
  var savedFormData = getDataStore();

  var contactName = $("#contact_name").val();
  var contactEmail = $("#contact_email").val();
  var contactMessage = $("#contact_message").val();

  var newFormData = {
    name: contactName,
    email: contactEmail,
    message: contactMessage
  };

  var contactSectionIsValid = function() {
    if ( contactName != "" && contactEmail != "" && contactEmail != "" ) {
      return true;
    } else {
      return false;
    }
  }

  if (contactSectionIsValid()) {
    // contactList.push(newContact);
    var formDataToSave = savedFormData.formData.push(newFormData);
    // save updatedDataStore
    saveFormData(formDataToSave);

    // clear form
    var contactName = $("input[name='Name']").val("");
    var contactEmail = $("input[name='Email']").val("");
    var contactMessage = $("input[name='Message']").val("");

    // clean up alerts
    $(".success-alert").show();
    $(".success-alert").fadeOut(5000);
    $(".w3-input").val("");
  } else {
    $(".fail-alert").show();
    $(".fail-alert").fadeOut(3000);
    $(".w3-input").val("");
  }
}

$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm("sample");
    }
});
