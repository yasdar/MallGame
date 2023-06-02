export const skins = [
    "whiteblond",
    "tannedred",
    "staff",
    "fairbrown",
    "darkblack",
    //"green",
    "blue",
    "purple",
    "red",
    "blood",
];
export const startSkins=[ 
"whiteblond",
"tannedred",
"staff",
"fairbrown",
"darkblack",]
export let Shared:any={
    AllObjects:[],
    MaxCustomers:2000,
    CountDies:0,
    MaxDies:3,
    GameIsOver:false,
    paused:false,
    resumeNow:false,
    CustomerSpeed:1300,
    Action:true,
    passMark:400,
    TimeLimit:300,//300 seconds = 5 mins
    URL:'https://www.google.com/'
}

/*
1. The game seems a bit easy and it's really hard for you to die. Maybe try to bring in more customers faster so it will be hard for you to tap on each
2. You dont get any pop-up when you die - You have to have a pop-up when you die saying game over with the number of battle points you have gained and maybe also something like " Try again "
*/





export function GetObjectByName(name:string){
       
    let index:number = Shared.AllObjects.findIndex((x:any) => {return x.name === name});
    let _tile = null;
    if( index!= -1 ){

        _tile = {
            name:Shared.AllObjects[index].name,
            X:Shared.AllObjects[index].x,
            Y:Shared.AllObjects[index].y,
            ConnectedTo:Shared.AllObjects[index].properties.D,
            Dx:Shared.AllObjects[index].properties.Dx
        }
    }
    return _tile;
}
export function shuffleArray(array:Array<any>) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  export function FormatTime(n:number) {
   
    var m = Math.floor(n / 60);
    var s = Math.floor((n / 1) - (m * 60));

    var M = m.toString();
    if (M.length == 1) {
        M = '0' + M;
    }
    var S = s.toString();
    if (S.length == 1) {
        S = '0' + S;
    }
    
    var RS = M + ':' + S ;
    //console.log('RS',RS)
    return RS;
}