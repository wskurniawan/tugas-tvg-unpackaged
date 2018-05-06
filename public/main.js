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
function rotasiCust(sudutX, sudutY){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    customRotasi(context, canvas, sudutX, sudutY);
}

function scale(){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    mulaiScale(context, canvas);
}
function scaleCust(sumbuX, sumbuY, sumbuZ){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    customScale(context, canvas, sumbuX, sumbuY, sumbuZ);
}

function shear(){
   stopAll();
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
   context.fillStyle = 'rgba(0, 150, 255, 0.3)';

   mulaiShearXY(context, canvas);
}
function shearCust(deltaX, deltaY){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    customShearXY(context, canvas, deltaX, deltaY);
}

function translasi(){
   stopAll();
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
   context.fillStyle = 'rgba(0, 150, 255, 0.3)';

   mulaiTranslasi(context, canvas);
}
function translasiCust(sumbuX, sumbuY, sumbuZ){
    stopAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    customTranslasi(context, canvas, sumbuX, sumbuY, sumbuZ);
}
