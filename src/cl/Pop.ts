
import 'phaser';
import { FormatTime, Shared } from './config';


 
export default class Pop extends Phaser.GameObjects.Container {
    bg:Phaser.GameObjects.Rectangle;
    Bt:Phaser.GameObjects.Image;
    quitBt:Phaser.GameObjects.Image;

    TXTscore :Phaser.GameObjects.Text;
    TXTscore2 :Phaser.GameObjects.Text;
    TXTscore3:Phaser.GameObjects.Text;//pass mark : 1200

    TXTtime :Phaser.GameObjects.Text;
    TXTtime2 :Phaser.GameObjects.Text;

    styleyellow:any = {fontFamily: 'AusweisHollow',fontSize: '42px', fill: "#ffff00", align:"center",
    stroke: '#ffff00',
    strokeThickness: 2};

    styleyellow2:any = {fontFamily: 'AusweisHollow',fontSize: '24px', fill: "#ffff00", align:"center",
    stroke: '#ffff00',
    strokeThickness: 2};

    stylewhite:any = { fontFamily: 'AusweisHollow',fontSize: '42px', fill: "#ffffff", align:"center",
    stroke: '#ffffff',
    strokeThickness: 2};

    toggle_ref:Function

    constructor(scene:Phaser.Scene,toggleref:Function) {
        super(scene);

        this.toggle_ref = toggleref;

        this.bg = this.scene.add.rectangle(
            this.scene.cameras.main.width*0.5,
            this.scene.cameras.main.height*0.5,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000,
            0.8);
        let characters = this.scene.add.image(this.scene.cameras.main.width*0.5,0,'characters');
        let coef = characters.width/characters.height;
        characters.setDisplaySize(this.scene.cameras.main.width,this.scene.cameras.main.width/coef)
        characters.setY(this.scene.cameras.main.height-characters.displayHeight*0.6);
 
        this.TXTscore = this.scene.add.text(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.15, "P A S S   M A R K", this.styleyellow).setOrigin(0.5,0.5);
        this.TXTscore2 = this.scene.add.text(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.20, "1200", this.styleyellow).setOrigin(0.5,0.5);
        this.TXTscore3 = this.scene.add.text(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.24, "P A S S   M A R K : ", this.styleyellow2).setOrigin(0.5,0.5);

        this.TXTtime = this.scene.add.text(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.35, "T I M E   L I M I T", this.stylewhite).setOrigin(0.5,0.5);
        this.TXTtime2 = this.scene.add.text(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.4, "5:00", this.stylewhite).setOrigin(0.5,0.5);
 
        this.Bt = this.scene.add.image(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.55,'start').setScale(0.75);
        this.quitBt = this.scene.add.image(this.scene.cameras.main.width*0.5, this.scene.cameras.main.height*0.7,'quit').setScale(0.75); 
 
        this.Bt.setInteractive({cursor:'pointer'});
        this.quitBt.setInteractive({cursor:'pointer'});
        this.add([ this.bg,characters,this.TXTscore,this.TXTscore2,this.TXTscore3,this.TXTtime,this.TXTtime2,this.Bt,this.quitBt])
       
        this.scene.add.existing(this);

        this.quitBt.on('pointerdown',()=>{window.open(Shared.URL,"_self")});

    }updatePause(currentScore:number,timeLeft:string,btTexture:string){

        this.TXTscore.setText('F I N A L   S C O R E');
        this.TXTscore2.setText(currentScore.toString());

        this.TXTtime.setText('T I M E   LEFT');
        this.TXTtime2.setText(timeLeft);
        this.Bt.setTexture(btTexture);
        this.Bt.on('pointerdown',()=>{this.setVisible(false); this.toggle_ref();});
    }
    updateGameOver(currentScore:number,btTexture:string){

        this.TXTscore.setText('F I N A L   S C O R E');
        this.TXTscore2.setText(currentScore.toString());
        this.TXTscore3.setText("P A S S   M A R K : "+Shared.passMark.toString());

        this.TXTtime.setText('G A M E   O V E R');
        this.TXTtime2.setText('');
        this.Bt.setTexture(btTexture);
        this.Bt.on('pointerdown',()=>{
            this.scene.scene.start('PlayGame');  
        });
    }
}