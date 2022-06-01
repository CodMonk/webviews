   window.addEventListener( "message",
          function (e) {
              
                if(e.data.messageType=="videoData"){
                   
                  window.YellowMessengerPlugin.sendEvent({
                       "event":{
                           "code":"video_data",
                            "data":{"videoContent":e.data.videoContent,"mediaBlob":e.data.mediaBlob}
                       }  
                     },
                     "*"
                 );

                }
          },
          false);
