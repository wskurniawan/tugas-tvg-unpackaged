function print(matr){
    var tab = document.getElementById('matrix');
    var jumlahRow = tab.rows.length;
    for ( var i = 0; i < jumlahRow; i++ )
    {
        var tr = tab.rows[i];
        var jumlahCol = tr.cells.length;
        for( var j = 0; j < jumlahCol; j++) {
            var cll = tr.cells[j];
            cll.innerText = Math.round(matr[i][j]*100)/100;
        }
        // s += ' ' + cll.innerText;
    }
}

function printKubus(){
    var canvas = document.getElementById('cnv');
    var context = canvas.getContext('2d');
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillStyle = 'rgba(0, 150, 255, 0.3)';
    var pusatKubus = {x: 0, y: 0, z: 0};
    var kubus = new Kubus(pusatKubus, 200);
    render(kubus, context, canvas.width / 2 , canvas.height/2, canvas);
}