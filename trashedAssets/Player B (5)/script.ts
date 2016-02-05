class PlayerBBehavior extends Sup.Behavior {
  speed = 0.1;
  jumpSpeed = 0.45;
  origVel = 0.01;
  jumpCount = 0;
  
  hp = 10;
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
    //fall off the edge
     if (this.actor.getY() < -5){
       this.actor.arcadeBody2D.warpPosition(2.5,1);
       terminalVel = this.origVel;
       this.spawnFreeze = 50;
     } 
    

     
    // We override the `.x` component based on the player's input
    if(this.spawnFreeze <= 0){
      if (Sup.Input.isKeyDown("LEFT")){
        velocity.x = -this.speed; 

      }
      else if (Sup.Input.isKeyDown("RIGHT")) {
        velocity.x = this.speed;

      }
      else if (Sup.Input.isKeyDown("UP") && (touchBottom)){
        this.jumpCount = 10;
        

      }
      else if (Sup.Input.isKeyDown("DOWN")) {
        velocity.y = -this.speed;

      }
      else{
        velocity.x = 0;
        velocity.y = 0;
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

    
    
    
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBBehavior);

