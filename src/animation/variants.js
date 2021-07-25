export const variants= {
    moveBarVariant: {initial:{ x: 0},
                        move:{x: '100%', 
                        transition: {duration: 0.5, damping: 40,
                            when: 'beforeChildren',
                            delayChildren: 1}},
                        
                      },

     hamBurgerVariant: {
                          initial:{ rotate: 0 , opacity: 1},
                          hidden: {opacity: [1,0], transition:{delay: 0.1}},
                          clockwise:{ y: -10, rotateZ: 45, transition: {delay: 0.5}},
                          anticlockwise:{ y: 10, rotateZ: -45, transition: {delay: 0.5}}

                         },
                         
     navMenuVariant: {initial:{x: '-120vw', width: 0},
                        move:{x: 0, width: '100vw'}
                        },

     navLinkVariant: {initial:{x: 0,},
                        move:{x: [-40, 0],
                        
                       },
                        },

     linkColorVariant: {initial:{color: '#060b26'},
                        move:{color: ['#060b26', '#c83737', '#060b26']},
                        },
    servicesVariant:{  initial: {opacity: 1, y: 200, scale: 1}, 
                        move:{opacity: [0, 1], y: [200, 0], transition:{duration: 1}}
                    },
                    
    searchIconVariant: {initial: {scale: 1, color: '#f08080'},
                        move: {scale: [1, 3, 1.2], color:'#ffffff',  transition:{duration: 1} },
                        

    },
    userNameVariant: {initial: {scale: 1, color: '#f08080',   transition:{duration: 4, delay: 4 } },
                        move: {scale: [2, 1.2], color:'#000000',  transition:{duration: 1} },
                        

    },
    revealVariant: {initial: {x: '-100vw' },
    reveal: {x: 0, transition:{duration: 1} },
},
slideRiseVariant: {initial: {y:0 ,scale: 0.2, opacity: 0 },
reveal: {scale: 1, y: 0, opacity:0.5,  transition:{duration:0.5} }
 },
 slideUpVariant: {initial: {y:200, opacity: 0 },
reveal: {scale: 1, y: 0, opacity:1,  transition:{ duration:0.5} }
 },
movingBallVariant: {initial: {x:0, y: 0, backgroundColor: '#ffffff' },
move: {x:[0, 50,100,150, 100, 50, 0], y:[0,-20, 0, -20, 0,-20, 0], backgroundColor:['#ffffff','#ffffff','#060b26','#060b26','#060b26','#ffffff','#ffffff'] ,  transition:{  x:{yoyo: Infinity, duration:2},y:{yoyo:Infinity, duration:1, ease:'easeOut'}, backgroundColor:{yoyo:Infinity, duration:2, ease:'easeOut'}} }
 },
 whiteLinkVariant: {initial:{backgroundColor: '#ffffff' , x: 0 },
move: {scale: 220, x: '50vw', backgroundColor: ['#ffffff','#ffffff'], transition:{duration: 2}},  
},
 darkLinkVariant: {initial: {scale: 1, backgroundColor: '#060b26' , x: 0  },
 move: {scale: 220, x: '50vw', backgroundColor: ['#060b26','#060b26'], transition:{duration: 2}}
 },
 servicePathVariant: {initial: {opacity: 0, pathLength: 0  },
 move: {opacity: 1, pathLength: 1, transition:{ delay: 1, duration: 2}}
 }





     }