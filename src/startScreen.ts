import 'phaser';
import Canimations from './cl/animations';
import { FormatTime, Shared, skins } from './cl/config';

 
export default class StartScreen extends Phaser.Scene {
    customersanimation:Canimations;
    TXT :Phaser.GameObjects.Text;
    splash:Phaser.GameObjects.Image;


    startBt:Phaser.GameObjects.Image;
    quitBt:Phaser.GameObjects.Image;

    TXTscore :Phaser.GameObjects.Text;
    TXTscore2 :Phaser.GameObjects.Text;
    TXTtime :Phaser.GameObjects.Text;
    TXTtime2 :Phaser.GameObjects.Text;

    style:any = { 
        fontFamily: 'AusweisHollow',
        fontSize: '42px', 
        fill: "#000000", 
        align:"center",
        stroke: '#000000',
        strokeThickness: 2
};
    styleyellow:any = {fontFamily: 'AusweisHollow',fontSize: '42px', fill: "#ffff00", align:"center",
    stroke: '#ffff00',
    strokeThickness: 2};
    stylewhite:any = { fontFamily: 'AusweisHollow',fontSize: '42px', fill: "#ffffff", align:"center",
    stroke: '#ffffff',
    strokeThickness: 2};

    constructor() {
        super("StartScreen");
    }
    preload(): void {
        this.splash = this.add.image(0,0,'splash').setOrigin(0,0);
        this.splash.setDisplaySize(this.cameras.main.width,this.cameras.main.height)
       
        this.TXT = this.add.text(this.cameras.main.width*0.5, this.cameras.main.height*0.5, "loading \n... ", this.style).setOrigin(0.5,0.5);
       
        this.load.on("progress", this.fileComplte, this);
 
        

        this.load.image('characters','./assets/images/characters.png');
        this.load.image('start','./assets/images/start.png');
        this.load.image('quit','./assets/images/quit.png');

        this.load.image('resume','./assets/images/resume.png');
        this.load.image('continue','./assets/images/continue.png');
        
        this.load.image('toptopimage','./assets/images/toptopimage.png');
        this.load.image('store','./assets/images/store.jpg');
        this.load.image('bloodsplash','./assets/images/bloodsplash.png');
        this.load.image('box','./assets/images/box.png');
       this.load.image('score-and-time-hud_p','./assets/images/score-and-time-hud_p.png');
       this.load.image('score-and-time-hud_r','./assets/images/score-and-time-hud_r.png');
       //load all cutomer animations
       skins.forEach((skin)=>{this.loadAniamtion(skin);})
       this.load.tilemapTiledJSON('mappy1', './assets/images/t1.json');

        //load audio files
        this.load.audio('ambiantA', ['./assets/audios/ambiantA.mp3']);
        this.load.audio('clickmenuA', ['./assets/audios/clickmenuA.mp3']);
        this.load.audio('scoreA', ['./assets/audios/scoreA.mp3']);
        this.load.audio('dieA', ['./assets/audios/dieA.mp3']);

    }loadAniamtion(prefix:string){
    this.load.spritesheet(prefix,'./assets/images/character_'+prefix+'.png',{ frameWidth: 1601/4, frameHeight: 2397/4 }); 
    }
    fileComplte(progress: any) {
        this.TXT.setText("loading... \n" + Math.round(progress * 100) + "%");
      }
      
    create(): void {
       
       this.splash.setVisible(false);
       this.TXT.setVisible(false);

       let characters = this.add.image(this.cameras.main.width*0.5,0,'characters');
       let coef = characters.width/characters.height;
       characters.setDisplaySize(this.cameras.main.width,this.cameras.main.width/coef)
       characters.setY(this.cameras.main.height-characters.displayHeight*0.6);

       this.TXTscore = this.add.text(this.cameras.main.width*0.5, this.cameras.main.height*0.15, "P A S S   M A R K", this.styleyellow).setOrigin(0.5,0.5);
       this.TXTscore2 = this.add.text(this.cameras.main.width*0.5, this.cameras.main.height*0.20, Shared.passMark.toString(), this.styleyellow).setOrigin(0.5,0.5);

       this.TXTtime = this.add.text(this.cameras.main.width*0.5, this.cameras.main.height*0.35, "T I M E   L I M I T", this.stylewhite).setOrigin(0.5,0.5);
       this.TXTtime2 = this.add.text(this.cameras.main.width*0.5, this.cameras.main.height*0.4, FormatTime(Shared.TimeLimit), this.stylewhite).setOrigin(0.5,0.5);

       this.startBt = this.add.image(this.cameras.main.width*0.5, this.cameras.main.height*0.55,'start').setScale(0.75);
       this.quitBt = this.add.image(this.cameras.main.width*0.5, this.cameras.main.height*0.7,'quit').setScale(0.75); 

       this.startBt.setInteractive({cursor:'pointer'});
       this.quitBt.setInteractive({cursor:'pointer'});

       this.startBt.on('pointerdown',()=>{this.scene.start('SlidesScreen');});//PlayGame
       this.quitBt.on('pointerdown',()=>{window.open(Shared.URL,"_self")});

    }
}