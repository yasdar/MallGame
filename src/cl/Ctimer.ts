
import 'phaser';
import { FormatTime, Shared } from './config';


 
export default class Ctimer extends Phaser.GameObjects.Container {
    bg:Phaser.GameObjects.Image;
    socreText:Phaser.GameObjects.Text;
    timeText:Phaser.GameObjects.Text;
    box:Phaser.GameObjects.Image;
    score:number = 0;
    playing:boolean;
    clicksound:Phaser.Sound.BaseSound;

   
    constructor(scene:Phaser.Scene) {
        super(scene);

       this.playing = true;
       var style = { font: "bold 24px Arial", fill: "#fff" };
       var style2 = { font: "bold 28px Arial", fill: "#ff0000",stroke: '#666666',
       strokeThickness: 2};
       this.bg = this.scene.add.image(this.scene.cameras.main.width*0.59,0,'score-and-time-hud_p');
       this.bg.setScale(0.5)
       this.bg.setY(this.bg.displayHeight*0.6);
       //area to click
       this.box = this.scene.add.image(this.bg.x,this.bg.y,'box');
       this.box.setScale(0.75);
       this.box.setInteractive({cursor:'pointer'});
       this.box.setAlpha(0.01);
       this.box.on('pointerdown',this.togglePlay,this)
       
       //static texts Battle Points : BP
       let s_score = this.scene.add.text(this.bg.x-this.bg.displayWidth*0.33, this.bg.y, "BP : ", style).setOrigin(0.5,0.5);
       let s_time = this.scene.add.text(this.bg.x+this.bg.displayWidth*0.2, this.bg.y, "time : ", style).setOrigin(0.5,0.5);
        //dynamique text
       this.socreText = this.scene.add.text(this.bg.x-this.bg.displayWidth*0.19, this.bg.y, "00 ", style).setOrigin(0.5,0.5);
       this.timeText = this.scene.add.text(this.bg.x+this.bg.displayWidth*0.36, this.bg.y, "00:00", style).setOrigin(0.5,0.5);
       //game
       


       this.add([this.bg,this.box,s_score,this.socreText,s_time,this.timeText]);


       this.clicksound = this.scene.sound.add('clickmenuA',{loop:false,volume:0.2});
           


        this.scene.add.existing(this);

     
    }togglePlay(){
        console.log('togglePlay')
        if(Shared.GameIsOver ){return;}

        this.clicksound.play();
        //console.log('togglePlay')
       if(this.playing){
        this.bg .setTexture('score-and-time-hud_r');
        //this.box.setVisible(false);
        Shared.paused = true;
       }else{
        //this.box.setVisible(true);
        this.bg .setTexture('score-and-time-hud_p');
        Shared.resumeNow = true;
       }
       
       this.playing = !this.playing;
    }
    
    updateScore(){
       this.score +=1;
       this.socreText.setText(this.score.toString());
       // anime score
       this.socreText.setAlpha(0);
       this.socreText.setScale(5);
       this.scene.tweens.add({
        targets: this.socreText,
        alpha: 1,
        scale: 1,
        duration: 300
        })


    }updateTime(n:number){
       this.timeText.setText(FormatTime(n)) 
    }
}