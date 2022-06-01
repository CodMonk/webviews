   window.addEventListener( "message",
          function (e) {
              
                if(e.data.messageType=="videoData"){
                   
                  window.YellowMessengerPlugin.sendEvent({
                       "event":{
                           "code":"video_data",
                            "data":e.data.videoContent
                       }  
                     },
                     "*"
                 );

                }
          },
          false);
