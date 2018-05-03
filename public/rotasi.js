var stop;
/** (() => {
   main();
})();
function main(){
   var canvas = document.getElementById('cnv');
   var context = canvas.getContext('2d');
   context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
   context.fillStyle = 'rgba(0, 150, 255, 0.3)';

   mulaiRotasi(context, canvas);
}
**/
//untuk rotasi
function mulaiRotasi(context, canvas){
   var pusatKubus = {x: 0, y: 0, z: 0};
   var kubus = new Kubus(pusatKubus, 200);
   var rotateX = new RotateXMatrix(4, pusatKubus);
   var rotateY = new RotateYMatrix(2, pusatKubus);
   var matrixTransformasi = kaliMatrix(rotateY.Ry, rotateX.Rx);
   print(matrixTransformasi);

   function startTransform(){
      var finalVertex = [];
      for(var i = 0; i < kubus.vertex.length; i++){
         var pointP = new MatrixFromObject(kubus, i);

         var finalPoint = kaliMatrix(matrixTransformasi, pointP.P);
         finalVertex.push(new Vertex(finalPoint[0][0], finalPoint[1][0], finalPoint[2][0]));
      }

      kubus = new KubusFromVertex(finalVertex);

      render(kubus, context, canvas.width / 2 , canvas.height/2, canvas);
   }

   stop = setInterval(startTransform, 50);
}

//untuk deklarasi vertex baru
function Vertex(x, y, z){
   this.x = x;
   this.y = y;
   this.z = z;
}

///vertex adalah titik, setiap titik membetuk face untuk sisi2
function Kubus(pusat, panjangSisi){
   var r = panjangSisi / 2;

   this.vertex = [
      new Vertex(pusat.x - r, pusat.y - r, pusat.z + r),
      new Vertex(pusat.x - r, pusat.y - r, pusat.z - r),
      new Vertex(pusat.x + r, pusat.y - r, pusat.z - r),
      new Vertex(pusat.x + r, pusat.y - r, pusat.z + r),
      new Vertex(pusat.x + r, pusat.y + r, pusat.z + r),
      new Vertex(pusat.x + r, pusat.y + r, pusat.z - r),
      new Vertex(pusat.x - r, pusat.y + r, pusat.z - r),
      new Vertex(pusat.x - r, pusat.y + r, pusat.z + r),
   ];
   
   this.sisiKubus = [
      [this.vertex[0], this.vertex[1], this.vertex[2], this.vertex[3]],
      [this.vertex[3], this.vertex[2], this.vertex[5], this.vertex[4]],
      [this.vertex[4], this.vertex[5], this.vertex[6], this.vertex[7]],
      [this.vertex[7], this.vertex[6], this.vertex[1], this.vertex[0]],
      [this.vertex[7], this.vertex[0], this.vertex[3], this.vertex[4]],
      [this.vertex[1], this.vertex[6], this.vertex[5], this.vertex[2]]
   ];
}

function KubusFromVertex(vertex){
   this.vertex = vertex;

   this.sisiKubus = [
      [this.vertex[0], this.vertex[1], this.vertex[2], this.vertex[3]],
      [this.vertex[3], this.vertex[2], this.vertex[5], this.vertex[4]],
      [this.vertex[4], this.vertex[5], this.vertex[6], this.vertex[7]],
      [this.vertex[7], this.vertex[6], this.vertex[1], this.vertex[0]],
      [this.vertex[7], this.vertex[0], this.vertex[3], this.vertex[4]],
      [this.vertex[1], this.vertex[6], this.vertex[5], this.vertex[2]]
   ];
}

//untuk merotasi objek sebelum di render
function rotateRender(sudutX, sudutY, kubus, pusatKubus){
   //untuk rotate hasil akhir agar terlihat
   var rotateX = new RotateXMatrix(sudutX, pusatKubus);
   var rotateY = new RotateYMatrix(sudutY, pusatKubus);
   var rotateRender = kaliMatrix(rotateX.Rx, rotateY.Ry);

   //untuk memutar hasil render kubus
   var rotateVertex = [];
   for(var i = 0; i < kubus.vertex.length; i++){
      var pointP = new MatrixFromObject(kubus, i);
      //var matrixTransformasi = rotateY.Ry;

      var finalPoint = kaliMatrix(rotateRender, pointP.P);
      rotateVertex.push(new Vertex(finalPoint[0][0], finalPoint[1][0], finalPoint[2][0]));
   }
   
   return new KubusFromVertex(rotateVertex);
}

//untuk render ke canvas
function render(objekKubus, context, pusatX, pusatY, canvas){
   //console.log(pusatX + 'y: ' + pusatY);
   context.clearRect(0, 0, canvas.width, canvas.height);
   for( var i = 0; i < objekKubus.sisiKubus.length; i++){
      var sisi = objekKubus.sisiKubus[i];
      
      var titikSudut = sisi[0];
      //console.log(i);
      context.beginPath();
      context.moveTo(titikSudut.x + pusatX, -titikSudut.y + pusatY);

      for(j = 1; j < sisi.length; j++){
         titikSudut = sisi[j];
         //console.log(j);
         context.lineTo(titikSudut.x + pusatX, -titikSudut.y + pusatY);
      }

      context.closePath();
      context.stroke();
      context.fill();
   }
}

//rotate terhadap sumbu x
function RotateXMatrix(sudut, pusatRotasi){
   var sudutRad = sudut * 0.0174533;
   
   var translasiAwal = new TranslationMatrix(-pusatRotasi.x, -pusatRotasi.y, -pusatRotasi.z);
   var rotasi = [
      [1, 0, 0, 0],
      [0, Math.cos(sudutRad), -Math.sin(sudutRad), 0],
      [0, Math.sin(sudutRad), Math.cos(sudutRad), 0],
      [0, 0, 0, 1]
   ];
   var translasiAkhir = new TranslationMatrix(pusatRotasi.x, pusatRotasi.y, pusatRotasi.z);

   this.Rx = kaliMatrix(translasiAwal.T, kaliMatrix(rotasi, translasiAkhir.T));
}

//matrix transformasi Rotate Y
function RotateYMatrix(sudut, pusatRotasi){
   var sudutRad = sudut * 0.0174533;
   
   var translasiAwal = new TranslationMatrix(-pusatRotasi.x, -pusatRotasi.y, -pusatRotasi.z);
   var rotasi = [
      [Math.cos(sudutRad), 0, Math.sin(sudutRad), 0],
      [0, 1, 0, 0],
      [-Math.sin(sudutRad), 0, Math.cos(sudutRad), 0],
      [0, 0, 0, 1]
   ];
   var translasiAkhir = new TranslationMatrix(pusatRotasi.x, pusatRotasi.y, pusatRotasi.z);

   this.Ry = kaliMatrix(translasiAwal.T, kaliMatrix(rotasi, translasiAkhir.T));
}

//untuk operasi translasi
function TranslationMatrix(x, y, z){
   this.T = [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1]
   ];
}

//membentuk objek matrix 3x1 dari point2 yang sudah dibentuk
function MatrixFromObject(kubus, indexVertex){
   this.P = [ 
      [kubus.vertex[indexVertex].x], 
      [kubus.vertex[indexVertex].y], 
      [kubus.vertex[indexVertex].z], 
      [1]
   ];
}

//matrix scaling
function Scale(x, y, z){
   this.S = [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1]
   ];
}

//matrix shear
function ShearXY(x, y){
   this.shXY = [
      [1, 0, x, 0],
      [0, 1, y, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
   ]
}

function kaliMatrix(matrixA, matrixB){
   //console.log(matrixB);
   var result = [];
   for(var i = 0; i < matrixA.length; i++){
      var hasilBaris = [];
      for(var j = 0; j < matrixB[0].length; j++){
         var sum = 0;
         for(var k = 0; k < matrixA[0].length; k++){
            //console.log(matrixTransformasi[i][k] + '*' + pointP[k][j])
            sum = sum + matrixA[i][k] * matrixB[k][j]; 
         }
         //console.log(sum);
         hasilBaris.push(sum);
         //console.log(hasilBaris);
      }
      result.push(hasilBaris);
   }
   
   //console.log(result);
   return result;
}