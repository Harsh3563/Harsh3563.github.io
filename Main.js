$(document).ready(function() {
  const messageContainer1 = document.getElementById('msgPart1');

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
          const disclaimerContainer = document.getElementById('Disclaimer');
          disclaimerContainer.style.display = 'block';  
          setTimeout(function() {
            disclaimerContainer.style.display = 'none';
            messageContainer1.style.display = 'block';             
          }, 9000); // 9sec Reading Time                           
        }
      }
    });
  }); 

  const nextButton1 = document.getElementById('nextBtn1');  
  const messageContainer2 = document.getElementById('msgPart2');  

  nextButton1.addEventListener('click', () => {
    messageContainer1.style.display = 'none';       
    messageContainer2.style.display = 'block'; 
  });  

  const nextButton2 = document.getElementById('nextBtn2');  
  const messageContainer3 = document.getElementById('msgPart3');  

  nextButton2.addEventListener('click', () => {
    messageContainer2.style.display = 'none';       
    messageContainer3.style.display = 'block'; 
  });  
  
  const nextButton3 = document.getElementById('nextBtn3');  
  const messageContainer4 = document.getElementById('msgPart4');  

  nextButton3.addEventListener('click', () => {
    messageContainer3.style.display = 'none';       
    messageContainer4.style.display = 'block'; 
  });  
  
  const nextButton4 = document.getElementById('nextBtn4');  
  const mainQuestionContainer = document.getElementById('mainQuestion');  

  nextButton4.addEventListener('click', () => {
    messageContainer4.style.display = 'none';       
    mainQuestionContainer.style.display = 'block';   
  });    

  var decision = "";

  const yesButton1 = document.getElementById('yesBtn1');
  const noButton1 = document.getElementById('noBtn1');

  noButton1.addEventListener('click', () => {
    decision = "No";
    sendDiscordMessage(decision);    
    window.alert("No worries. I respect your decision, and I hope this won't change our friendship as I still value it a lot! You can close this page now");
  });

  var selectedDate = "";  

  yesButton1.addEventListener('click', () => {
    mainQuestionContainer.style.display = 'none';

    const dateQuestionContainer = document.getElementById('dateQuestion');
    dateQuestionContainer.style.display = 'block';

    const yesButton2 = document.getElementById('yesBtn2');
    const noButton2 = document.getElementById('noBtn2');

    noButton2.addEventListener('click', () => {
      decision = "Yes_No";
      sendDiscordMessage(decision);      
      window.alert("Okay no worries. What do you suggest we do? Text me! You can close this page now");
    });    

    yesButton2.addEventListener('click', () => {
      dateQuestionContainer.style.display = 'none';

      // Display a Calendar to select the Date 
      $("#calendarContainer").show();
      $(function() {
        $("#datepicker").datepicker({
          onSelect: function(dateText) {
            selectedDate = new Date(dateText).toLocaleDateString();
            const eventButton = document.getElementById('eventBtn');
            eventButton.addEventListener('click', () => {
              decision = "Yes";
              sendDiscordMessage(decision);              
              confetti.start();
            });
          }
        });
      });
    });
  });

  // Webhook URL for: Webhook Name - Khushi's Decision, Channel (posting to) - #notifications (under 'Information' category), Discord Server - PTKC 
  const webhookUrl = "https://discord.com/api/webhooks/1102790546440847471/-NtMA8yzUjTVE46pttWtX0f2HS8zsyC8ft2VILw9tGPfW9nyzE0e8nouDxHWQHsYCCCl";

  // Function to send the Discord message
  function sendDiscordMessage(dec) {
    var message = "";

    if(dec == 'No') {
      message = "she said no";
    }

    if(dec == 'Yes_No') {
      message = "SHE SAID YES!!! But said No to the Zoom Date question";
    }

    if(dec == 'Yes') {
      message = `SHE SAID YES!!! Selected Date: ${selectedDate.slice(0,10)}`;
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
