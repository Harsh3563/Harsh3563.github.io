$(document).ready(function() {
  const messageContainer = document.getElementById('msg');

  $( function() {
    $( "#welcomeDialog" ).dialog({
      autoOpen: true,
      modal: true,
      title: "Welcome",
      width: 400,
      resizable: false,
      draggable: false,
      buttons: {
        Next: function() {
          $( this ).dialog( "close" );  
          const soundtrack = document.getElementById('soundtrack');
          soundtrack.play();       
          messageContainer.style.display = 'block';                           
        }
      }
    });
  }); 

  const nextButton = document.getElementById('nextBtn'); 
  const dateQuestionContainer = document.getElementById('dateQuestion'); 

  nextButton.addEventListener('click', () => {
    messageContainer.style.display = 'none';       
    dateQuestionContainer.style.display = 'block';
  });   

  var decision = "";

  const yesButton = document.getElementById('yesBtn');
  const noButton = document.getElementById('noBtn');

  noButton.addEventListener('click', () => {
    decision = "No";
    sendDiscordMessage(decision);      
    window.alert("No worries. What do you suggest we do? Text / Call me!");
  });

  var selectedDate = "";  

  yesButton.addEventListener('click', () => {
    decision = "Yes";    
    dateQuestionContainer.style.display = 'none';

    // Display a Calendar to select the Date 
    $("#calendarContainer").show();
    $(function() {
      $("#datepicker").datepicker({
        onSelect: function(dateText) {
          selectedDate = new Date(dateText).toLocaleDateString();
          const eventButton = document.getElementById('eventBtn');
          eventButton.addEventListener('click', () => {
            sendDiscordMessage(decision);              
            confetti.start();
          });
        }
      });
    });
  });

  // Webhook URL for: Webhook Name - Khushi's Decision, Channel (posting to) - #notifications (under 'Information' category), Discord Server - PTKC 
  const webhookUrl = "https://discord.com/api/webhooks/1102790546440847471/-NtMA8yzUjTVE46pttWtX0f2HS8zsyC8ft2VILw9tGPfW9nyzE0e8nouDxHWQHsYCCCl";

  // Function to send the Discord message
  function sendDiscordMessage(dec) {
    var message = "";

    if(dec == 'No') {
      message = "She said no to the zoom date question";
    }

    if(dec == 'Yes') {
      message = `SHE SAID YES!! Selected Date: ${selectedDate.slice(0,10)}`;
    }

    var payload = { content: message };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Discord message sent successfully!");
        if (dec == 'Yes') {
          eventConfirmation();
        }
      })
      .catch((error) => {
        console.error("Error sending Discord message: ", error);
      });
  }

  // Event Confirmation Notification
  function eventConfirmation() {
    window.alert("Awesome! The selected date has been sent to me on Discord. We can decide the time later. I'll see you then <3 You can close this page now!");
  }
  
});
