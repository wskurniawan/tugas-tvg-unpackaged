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