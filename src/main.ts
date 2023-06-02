import 'phaser';
import Canimations from './cl/animations';
import { FormatTime, Shared, startSkins } from './cl/config';
import Ctimer from './cl/Ctimer';
import Customer from './cl/customer';
import Pop from './cl/Pop';
 
export default  class PlayGame extends Phaser.Scene {
    customersanimation:Canimations;
    ctimer:Ctimer;

    Alcustomers:Array<Customer>;
    topDeco:Phaser.GameObjects.Image;
    store: Phaser.GameObjects.Image;
    mappy:Phaser.Tilemaps.Tilemap;
    TotalTime:number=0;
    music:Phaser.Sound.BaseSound;
    pop_pause:Pop;
    constructor() {
        super("PlayGame");
    }
    preload(): void {}

    create(): void {
        console.log("init vars")
        Shared.AllObjects = [];
        Shared.CountDies  = 0;
        Shared.GameIsOver = false;
        Shared.paused = false;
        Shared.resumeNow = false;
        Shared.Action = true;

        this.TotalTime = 0;
        this.Alcustomers=[];

        //create all customer animations
        this.customersanimation = new Canimations(this);

        this.store = this.add.image(0,0,'store');
        this.store.setOrigin(0,0);
        this.store.setDisplaySize(this.cameras.main.width,this.cameras.main.height)
        
        this.ctimer = new Ctimer(this);
        
        
        this.mappy = this.add.tilemap('mappy1');
       //console.log(this.mappy.getObjectLayer("pos"));
       //Shared.AllObjects = this.mappy.getObjectLayer("pos").objects;
       Shared.AllObjects = this.mappy.getObjectLayer("pos").objects;
       
       this.topDeco = this.add.image(0,0,'toptopimage').setOrigin(0,0)
       this.topDeco.setDepth(10)

   
   

        if(this.music == null){
            this.music = this.sound.add('ambiantA',{loop:true,volume:0.5});
            this.music.play();
        }else{
            this.music.play();
        }
        
    
   

   


    //satrt first customer
    this.AddCustomer();
    //add other customers
    this.time.addEvent({ delay: 1000, callback: ()=>{
    
    if(Shared.GameIsOver || Shared.paused ){return;}

    this.TotalTime++;
    this.ctimer.updateTime(this.TotalTime);
    //this.TotalTime%2
    if( this.TotalTime%1 == 0 ){//&& this.Alcustomers.length < Shared.MaxCustomers
        this.AddCustomer();
        if ( Math.random()*10 <= 5){this.AddCustomer();} 
    }
    
},
    callbackScope: this, loop: true });


    
this.pop_pause = new Pop(this,this.ctimer.togglePlay.bind(this.ctimer));
this.pop_pause.setDepth(11);
this.pop_pause.setVisible(false);

    }AddCustomer(){
        //select an object on tilemap
        let tile:any;
        let customer:any;
        const places = ["i1","i2","i3","i4"];
        //random skin
       const randomskin = Math.floor(Math.random() * startSkins.length);
        //a new customer
       customer = new Customer(this,startSkins[randomskin],this.Scoreing.bind(this));
        //random start posotion
        const random = Math.floor(Math.random() * places.length);
        customer.Positions(places[random]);
        //First move to the next target
        customer.MoveTo();

        this.Alcustomers.push(customer);
    }Scoreing(){
        this.ctimer.updateScore();
    }
    update(): void {
        if(!Shared.GameIsOver && this.Alcustomers.length>0){
            this.Alcustomers.forEach((customer)=>{
                customer.update();
            })
        }
       
        if(Shared.TimeLimit-this.TotalTime<=0){  Shared.GameIsOver = true; }

     
       if( (Shared.GameIsOver || Shared.paused) && Shared.Action){
       if(this.music) {if( this.music.isPlaying ){ this.music.pause();}}
        Shared.Action = false;
        console.log('case2','Shared.GameIsOver',Shared.GameIsOver)
        if(!Shared.GameIsOver){
            this.pop_pause.updatePause(this.ctimer.score,FormatTime(Shared.TimeLimit-this.TotalTime) ,'resume');
            this.pop_pause.setVisible(true);
        }else{
            this.pop_pause.updateGameOver(this.ctimer.score,'continue');
            this.pop_pause.setVisible(true);
        }
        

        this.Alcustomers.forEach((customer)=>{
            customer.stopMe();
        })
       }
       if( !Shared.GameIsOver && Shared.resumeNow && Shared.paused && !Shared.Action){
         if( this.music.isPaused ){ this.music.resume();}
        Shared.resumeNow = false;
        Shared.paused = false;
        Shared.Action = true;
        console.log('case1','Shared.GameIsOver',Shared.GameIsOver)
        this.pop_pause.setVisible(false);
        this.Alcustomers.forEach((customer)=>{
            customer.resumeMe();
        })
       }

       
      




    }
    
}
