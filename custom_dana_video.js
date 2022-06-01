   window.addEventListener( "message",
          function (e) {
               alert(e.data.messageType)
                if(e.data.messageType=="videoData"){
                   
                  window.YellowMessengerPlugin.sendEvent({
                       message:e.data.videoContent 
                     },
                     "*"
                 );

                }
          },
          false);
