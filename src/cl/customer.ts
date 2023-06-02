//reference to tween
//if die stop tween and don't allow movement
import 'phaser';
import { GetObjectByName, Shared, shuffleArray } from './config';
 
export default class Customer extends Phaser.GameObjects.Container {
    basicCharacter:string;
    defaultCharacter:'_down';
    hero:Phaser.GameObjects.Sprite;
    MyTile:any;
    timer:Phaser.Time.TimerEvent;
    timercounter:number;
    heroInstore:boolean;
    currentSuffix:string;
    Active:boolean;
    herotween:Phaser.Tweens.Tween;
    CurrentTarget:any;
    TXT:Phaser.GameObjects.Text;
    clicked:boolean = false;
    explode:Phaser.GameObjects.Sprite;
    clickMe:Phaser.Sound.BaseSound;
    diesound:Phaser.Sound.BaseSound;
    speedprefix:number = 1;
    constructor(scene:Phaser.Scene,basicCharacter:string,callBackScore:Function) {
        super(scene);

        this.basicCharacter = basicCharacter;
        this.timercounter = 0;
        this.heroInstore = false;
        this.active = true;
        this.clicked = false;

        this.hero = this.scene.add.sprite(0,0,this.basicCharacter,0);
        this.hero.setScale(0.11);
        this.add(this.hero);
       
        this.clickMe = this.scene.sound.add('scoreA',{loop:false,volume:0.2});
        this.diesound = this.scene.sound.add('dieA',{loop:false,volume:1});
        this.hero.on('pointerdown',()=>{
            if(this.active){
                this.clickMe.play();
                this.clicked = true;
                //color become green
                this.hero.disableInteractive();
                this.hero.setTint(0x00D100);//green
                callBackScore();
            }
           
        })

        var style = { font: "bold 24px Arial", fill: "#000000",align:'center'};
        this.TXT = this.scene.add.text(0,0,'me',style);
        this.TXT.setOrigin(0.5,0.5);
        this.add(this.TXT);
        this.TXT.setAlpha(0);

        this.explode = this.scene.add.sprite(0,0,"bloodsplash");
        this.explode.setScale(0.2);
        this.add(this.explode);
        this.explode.setAlpha(0);

        this.scene.add.existing(this);
    }
    Positions(tilename:string){
        if(!this.active){return;}

        this.MyTile = GetObjectByName(tilename);
        this.hero.setPosition(
            this.MyTile?.X+16,
            this.MyTile?.Y+(Math.random()*6)-(Math.random()*6));
       // console.log('I m on',this.MyTile);
        this.TXT.setPosition(this.hero.x,this.hero.y)
       
    }update() {

        if(this.hero.x > this.scene.cameras.main.width*0.21 && !this.heroInstore)
        {

        console.log( "!start coloration",'this.heroInstore',this.heroInstore)
        this.heroInstore = true;
        //increase next move speed
        this.speedprefix =0.8; 
        //move to next with delay : 0
         //color become green
        //this.hero.setTint(0x00D100);//green
         this.hero.setInteractive({cursor:"pointer"});

        this.timer = this.scene.time.addEvent({ delay: 1000, callback: ()=>{
        if(!this.active || this.clicked){return;}
        this.timercounter++;
        if(this.timercounter == 2){ this.applyTexture('blue'); this.TXT.setText('blue');}//blue
        else if(this.timercounter == 4){this.applyTexture('purple');this.TXT.setText('purple');}//purple
        else if(this.timercounter == 6){this.applyTexture('red');this.TXT.setText('red');}//red
        else if(this.timercounter == 8){this.applyTexture('blood');this.TXT.setText('blood');}//blood red
        else if(this.timercounter == 9){
            this.die();
            this.timer.remove(false);
        }

    },callbackScope: this, loop: true });
    
       }
    }
    MoveTo(delay:number=0){
    if(!this.active){return;}

     //console.log(this.MyTile.ConnectedTo);
     //get ramdom target
     let possibletargets = this.MyTile.ConnectedTo.split(",");
     possibletargets = shuffleArray(possibletargets);
     //check next target
    let next_target =  GetObjectByName(possibletargets[0]);

    this.CurrentTarget = next_target;
        //when customer inside the store , start timer
      // console.log(this.MyTile?.name)
      /*
      
        */
      if(
        this.MyTile?.name == 't8' || 
        this.MyTile?.name == 't10' || 
        this.MyTile?.name == 't4' || 
        this.MyTile?.name == 't12'|| 
        this.MyTile?.name == 't13'||
        this.MyTile?.name == 't6'||
        this.MyTile?.name == 't44'||
        this.MyTile?.name == 't52'||
        this.MyTile?.name == 't42'|| 
        this.MyTile?.name == 't26'||
        this.MyTile?.name == 't29'|| 
        this.MyTile?.name == 't27'||
        this.MyTile?.name == 't28'|| 
        this.MyTile?.name == 't24'){
            delay=delay/2;
        }else{
            delay = 200;
        }

        
        





    //check animation
    let suffix='';
    let distance = 0;
    if(next_target?.X>this.MyTile?.X){
        suffix = '_right';
        distance = Math.abs(next_target?.X-this.MyTile?.X)
    }
    else if(next_target?.X<this.MyTile?.X){
        suffix = '_left';
        distance = Math.abs(next_target?.X-this.MyTile?.X)
    }
    else if(next_target?.Y<this.MyTile?.Y){
        suffix = '_up';
        distance = Math.abs(next_target?.Y-this.MyTile?.Y)
    }
    else if(next_target?.Y>this.MyTile?.Y){
        suffix = '_down';
        distance = Math.abs(next_target?.Y-this.MyTile?.Y)
    }
     
    this.TweenTo(next_target,delay,suffix,distance);
    }
    applyTexture(texture:string){
        if(!this.active){return;}
        //use new texture
        this.basicCharacter = texture;
        //check animations current frame
        let Index:number = this.hero.anims.currentFrame.index;
        //apply the new texture
        this.hero.setTexture(this.basicCharacter,Index);
        //continue with the new texture
        if( this.hero.anims.isPlaying ){
         this.hero.play(this.basicCharacter+this.currentSuffix);
        }
        
        //remove tinit
        this.hero.setTint(0xffffff);
    }
    TweenTo(next_target:any,_delay:number=0,suffix:string='',distance:number){
        if(!this.active){return;}
        //console.log(suffix,distance);
        //console.log('_delay',_delay);
        this.currentSuffix = suffix;
        this.herotween = this.scene.tweens.add({
            targets: [this.hero,this.TXT],
            x: next_target?.X+16,
            y: next_target?.Y,
            duration: Shared.CustomerSpeed*this.speedprefix*(distance/160),
            delay:_delay,
            ease: 'Linear',
            onStart:()=>{
                //console.log("animation : ",this.basicCharacter+suffix)
                this.hero.play(this.basicCharacter+suffix);
            },
            onComplete:()=>{
                this.Positions(next_target.name);
                this.hero.stop();

                 
        //console.log('so --> this.MyTile',this.MyTile?.ConnectedTo);
    if( this.MyTile?.ConnectedTo == "exit"){
       // console.log('exit now');
        this.OutOfStore();
        return;
    }
    

                //randomly when stop , look up or down
                //if(Math.random()*10<5){ this.hero.setTexture(this.basicCharacter,4)}
               //else{ this.hero.setTexture(this.basicCharacter,0)}
               this.hero.setTexture(this.basicCharacter,0);
              //  console.log('stop with ',this.basicCharacter)
                this.MoveTo(500+Math.round(Math.random()*3000));

            }
        });
    }
    die(){
      
        this.diesound.play();
        this.stopMe();
        this.hero.setAlpha(0);
        Shared.CountDies +=1;
        if(Shared.CountDies >= Shared.MaxDies){
            Shared.GameIsOver = true;
        }
       

   

        this.explode.setPosition(this.hero.x,this.hero.y)
        this.scene.tweens.add({
            targets: this.explode,
            alpha: 1,
            scale:0.1,
            duration: 500
        });
    }
    stopMe(){
    //console.log('stopme')
    //stop hero animation
    this.hero.stop();
    //sop hero tween
    this.herotween.stop();
    //desactivate the hero
    this.active = false;
    }
    resumeMe(){
        //console.log('---resume')
        this.active = true;
        //console.log('this.MyTile',this.MyTile);
        //console.log('this.CurrentTarget',this.CurrentTarget);
        let distance = Phaser.Math.Distance.Between(this.MyTile?.X,this.MyTile?.Y,this.CurrentTarget.X,this.CurrentTarget.Y);
        this.TweenTo(this.CurrentTarget,0,this.currentSuffix,distance*0.75); 
    }OutOfStore(){
        this.stopMe();
        this.scene.tweens.add({
            targets: this.hero,
            onStart:()=>{this.hero.play(this.basicCharacter+'_down');},
            y: this.scene.cameras.main.height*0.96,
            x:this.hero.x-16,
            alpha:0,
            duration: 500
        });
    }
   
};
 
