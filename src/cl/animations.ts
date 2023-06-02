import { skins } from "./config";

export default class Canimations {
    constructor(scene:Phaser.Scene) {
      
        skins.forEach((skin)=>{this.createAnimation(scene,skin);})
       
    }createAnimation(scene:Phaser.Scene,prefix:string){
        scene.anims.create({
            key: prefix+'_down',
            frames: scene.anims.generateFrameNumbers(prefix, { frames: Array.from(Array(4).keys()) }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key:  prefix+'_up',
            frames: scene.anims.generateFrameNumbers(prefix, { frames: [4,5,6,7] }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key:  prefix+'_left',
            frames: scene.anims.generateFrameNumbers(prefix, { frames: [8,9,10,11] }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key:  prefix+'_right',
            frames: scene.anims.generateFrameNumbers(prefix, { frames: [12,13,14,15] }),
            frameRate: 6,
            repeat: -1
        });
    }
    
}