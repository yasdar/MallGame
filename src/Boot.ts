import 'phaser';
import PlayGame from './main';
import StartScreen from './startScreen';
import Slides from './slides';

 
class Boot extends Phaser.Scene {
   
  
    constructor() {
        super("Boot");
    }
    preload(): void {
        this.load.image('splash','./assets/images/splash.png');
        this.load.image('slide1','./assets/images/slide1s.png');
        this.load.image('slide2','./assets/images/slide2s.png');
        this.load.image('slide3','./assets/images/slide3s.png');

    }
    create(): void {
    this.scene.start('StartScreen');
    }
}


let configObject: Phaser.Types.Core.GameConfig = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'GameDiv',
        width: 768,
        height: 1024
    },
    scene: [Boot,Slides,StartScreen,PlayGame]
    
};
 
new Phaser.Game(configObject);