class PlayerBehavior extends Sup.Behavior {
  speed = 0.1;
  jumpSpeed = 0.45;
  origVel = 0.01;
  jumpCount = 0;
  
  hp = 10;
  playerX = -2.5;
  playerY = 1;
  controllerNum = 0;
  spawnFreeze = 50;
  wallHang = false;
  


  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    
    


    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    let terminalVel = this.origVel;
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    let touchLeft = this.actor.arcadeBody2D.getTouches().left;
    let touchRight = this.actor.arcadeBody2D.getTouches().right;
    
    //controller
    let controllerLeft = false
    let controllerRight = false
    let controllerUp = false
    let controllerDown = false 

    if(Sup.Input.getGamepadAxisValue(this.controllerNum,0) == -1){
      controllerLeft = true;
      
    }
    if(Sup.Input.getGamepadAxisValue(this.controllerNum,0) == 1){
      controllerRight = true;
    }    
    if(Sup.Input.getGamepadAxisValue(this.controllerNum,1) == -1){
      controllerUp = true;
    }
    if(Sup.Input.getGamepadAxisValue(this.controllerNum,1) == 1){
      controllerDown = true;
    }        

    //fall off the edge
     if (this.actor.getY() < -5){
       this.actor.arcadeBody2D.warpPosition(this.playerX,this.playerY);
       terminalVel = this.origVel;
       this.spawnFreeze = 50;
     } 
    

     
    // We override the `.x` component based on the player's input
    if(this.spawnFreeze <= 0){
      if (controllerLeft){
        velocity.x = -this.speed; 

      }
      if (controllerRight) {
        velocity.x = this.speed;

      }
      if (controllerUp && (touchBottom)){
        this.jumpCount = 5;
        

      }
      if (controllerDown) {
        velocity.y = -this.speed;

      }
      if(!controllerDown && !controllerUp && !controllerLeft && !controllerRight){
        if(velocity.x > 0){
          velocity.x -= 0.05;          
        }
        if(velocity.x < 0){
          velocity.x += 0.05;     
          
        }   
        
        if(velocity.y > 0){
          //velocity.y -= 0.05;          
        }
        if(velocity.y < 0){
          //velocity.y += 0.05;          
        }           

      } 
    }

    
    
    //jumping
    if(this.jumpCount > 0){
      velocity.y = 0.2;
      this.jumpCount--;
    }
    
    
    
    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    
    if (touchBottom && Sup.Input.wasKeyJustPressed("UP")) velocity.y = this.jumpSpeed;

    if(this.spawnFreeze <= 0 ){
      this.actor.arcadeBody2D.setCustomGravity(0,-1*terminalVel);  
      //Sup.ArcadePhysics2D.setGravity(0, -1*terminalVel)  ;
      
    }
    if(this.spawnFreeze > 0 ){
      
      this.actor.arcadeBody2D.setCustomGravity(0,0);  
      if(this.spawnFreeze > 0){
        this.spawnFreeze--;
      }
      
    }

    //Sup.log(Sup.Input.getGamepadAxisValue(0,1));
     //Sup.Input.getGamepadAxisValue(0,1);
    
    
    
    
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);

