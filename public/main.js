var canvas = document.getElementById('cnv');
var context = canvas.getContext('2d');
print();
function stopAll(){
    clearInterval(stop)
}

function rotasi(){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    mulaiRotasi(context, canvas);
}

function scale(){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    mulaiScale(context, canvas);
}

function shear(){
   stopAll();
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
   context.fillStyle = 'rgba(0, 150, 255, 0.3)';

   mulaiShearXY(context, canvas);
}

function translasi(){
   stopAll();
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
   context.fillStyle = 'rgba(0, 150, 255, 0.3)';

   mulaiTranslasi(context, canvas);
}
