   window.addEventListener( "message",
          function (e) {
                if(e.data.messageType=="videoData"){
                  window.YellowMessengerPlugin.sendEvent({
                       message:e.data.videoContent 
                     },
                     "*"
                 );

                }
          },
          false);
