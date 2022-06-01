   window.addEventListener( "message",
          function (e) {
                if(e.data=="hello"){
                  window.YellowMessengerPlugin.sendEvent({
                       event: {
                         code: "customer_details",
                         data: {
                          
                         }
                       },
                     },
                     "*"
                 );

                }
          },
          false);
