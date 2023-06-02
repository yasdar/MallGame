import 'phaser';

export default class Slides extends Phaser.Scene {
   
    slide1:Phaser.GameObjects.Image;
    slide2:Phaser.GameObjects.Image;
    slide3:Phaser.GameObjects.Image;

    AllSlides:Array<Phaser.GameObjects.Image>;
    Bt:Phaser.GameObjects.Image;
    slideCounter:number;

    constructor() {
        super("SlidesScreen");
    }preload(){

        this.load.image('box','./assets/images/box.png');
       
    }
    create(): void {
       this.slideCounter = 1;
       this.slide3 = this.add.image(0,0,'slide3').setOrigin(0,0);
       this.slide2 = this.add.image(0,0,'slide2').setOrigin(0,0);
       this.slide1 = this.add.image(0,0,'slide1').setOrigin(0,0);

       this.slide1.x = (this.cameras.main.width -  this.slide1.displayWidth)/2;
       this.slide1.y = this.cameras.main.height -  this.slide1.displayHeight;

       this.slide2.x = (this.cameras.main.width -  this.slide1.displayWidth)/2;
       this.slide2.y = this.cameras.main.height -  this.slide2.displayHeight;

       this.slide3.x =(this.cameras.main.width -  this.slide1.displayWidth)/2;
       this.slide3.y = this.cameras.main.height -  this.slide3.displayHeight;

       this.AllSlides=[this.slide1,this.slide2,this.slide3];

      // this.ResizeImg(this.slide3);
       //this.ResizeImg(this.slide2);
       //this.ResizeImg(this.slide1);


       this.Bt = this.add.image(0,0,'box').setOrigin(0,0);
       this.Bt.setAlpha(0.01);
       this.Bt.setInteractive({cursor:"pointer"})
       this.ResizeImg(this.Bt);
       

      
       this.Bt.on('pointerdown',()=>{
        this.slideCounter++;
        if(this.slideCounter <= this.AllSlides.length){
            this.showSlide( this.slideCounter );
        }else{
            this.scene.start('PlayGame');
        }
    });
    }
    ResizeImg(img:Phaser.GameObjects.Image){
        img.setDisplaySize(this.cameras.main.width,this.cameras.main.height);
    }
    showSlide(index:number){
        this.AllSlides.forEach((slide:Phaser.GameObjects.Image)=>{
            slide.setAlpha(0);
        })
        console.log('show at',index-1)

        this.AllSlides[index-1].setAlpha(0.6)
        this.tweens.add({
            targets:this.AllSlides[index-1],
            alpha: 1,
            duration: 300
            })
    }
}