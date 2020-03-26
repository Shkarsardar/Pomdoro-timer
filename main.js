var workMinute=25;
var breakMinute=5;
var longBreakMinute=10;
var timer=document.getElementById('timer');
var type="Work";
var timerInterval=null;
var pomodors=0;
document.getElementById('startBtn').onclick=function(event){
    if(workMinute==0 || breakMinute==0 || longBreakMinute==0)
    {
        document.getElementById('session').innerText="Can't start the session";

    }else{
        this.setAttribute('disabled',true);
        document.getElementById('stopBtn').removeAttribute('disabled');
        console.log("Session started");
        startTime();
    }
    

}   
document.getElementById('stopBtn').onclick=function(event){
    this.setAttribute('disabled',true);
    document.getElementById('startBtn').removeAttribute('disabled');
    console.log("Session stopped");
    clearInterval(timerInterval);
    init();


}
function startTime(){
    let s=0;
    let mt=workMinute;
    outputType();

    timerInterval=setInterval(function(){
        if(mt==0 && s==0)
        {
            

            if(type=="Work")
            {
                pomodors++;   
                outputType();
                
                if(pomodors==4)
                {
                    mt=longBreakMinute;
                    pomodors=0;

                }
                else{
                    mt=breakMinute;

                }
                console.log("It's Breaking time!");
                type="Break";
                playSound();


            }
            else if(type=="Break")
            {
                mt=workMinute;
                console.log("It's Working time!");
                type="Work"
                outputType();
                
            }

            
        }
        if(s==0)
        {
            s=60;
            mt--;
            console.log(mt);

        }
        s--;
        outputTime(mt,s);

    },1000);
}
function outputTime(mt,s)
{
    // let mt=type=="Work"?workMinute:breakMinute;
    document.getElementById('timer').innerText=`${mt<10?"0"+mt:mt}:${s<10?"0"+s:s}`;    
}
function init(){
    document.getElementById('timer').innerText=`${workMinute<10?"0"+workMinute:workMinute}:${"00"}`;
    document.getElementById('workMinuteSetting').value=workMinute;
    document.getElementById('breakMinuteSetting').value=breakMinute;
    document.getElementById('longTermMinuteSetting').value=longBreakMinute;
    type="Work";

    
}
document.getElementById('changeSettingsBtn').onclick=function(event)
{

    let wmt=document.getElementById('workMinuteSetting').value
    let bmt=document.getElementById('breakMinuteSetting').value
    let lmt=document.getElementById('longTermMinuteSetting').value;
    changeSettings({ workMinute:wmt,breakMinute:bmt,longBreakMinute:lmt});

    init();
    
}
function changeSettings(options)
{
    workMinute=options.workMinute;
    breakMinute=options.breakMinute;
    longBreakMinute=options.longBreakMinute;
    
}
function outputType()
{
    var text=document.getElementById('session');
    if(type=="Break" && pomodors==4)
    {
        text.innerText="Long break session.";

    }else if(type=="Work")
    {
        text.innerText="Working session.";

    }else{
        text.innerText="Break session";

    }
}
// play sound for breaking pomodoros
async function playSound(){
    let audio=new Audio('./sounds/beep.wav');
    await audio.play();

}
init();
