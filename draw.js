// HTML5とjQueryでブラウザーがペイントツールに！
// https://ascii.jp/elem/000/000/515/515898/ 

var drawFlag = false;
var oldX = 0;
var oldY = 0;

var penColor = "rgba(255,255,255,1)";
window.addEventListener("load", function () {
    var drawData = {
        drawFlag: false,
        oldX: 0, // 直前のX座標を保存するためのもの
        oldY: 0, // 直前のY座標を保存するためのもの
        brushSize: 5,  // ブラシサイズ
        penColor: "rgba(255,255,255,1)"
    }
    var can = document.getElementById("c");
    can.addEventListener("mousemove", function draw(e) {
        if (!drawData.drawFlag) return;
        var x = e.clientX;
        var y = e.clientY;
        var can = document.getElementById("c");
        var context = can.getContext("2d");
        context.strokeStyle = drawData.penColor;
        context.lineWidth = drawData.brushSize;
        context.lineJoin = "round";  // 連結部分を丸にする
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(drawData.oldX, drawData.oldY);
        context.lineTo(x, y);
        context.stroke();
        context.closePath();
        drawData.oldX = x;
        drawData.oldY = y;
    }
        , true);
    can.addEventListener("mousedown", function (e) {
        drawData.drawFlag = true;
        drawData.oldX = e.clientX;
        drawData.oldY = e.clientY;
    }, true);
    window.addEventListener("mouseup", function () {  // キャンバスでなくウィンドウに
        drawData.drawFlag = false;
    }, true);
}, true);

// 保存処理　(Canvas2Image)
//　http://www.nihilogic.dk/labs/canvas2image/
function saveData() {
    var can = document.getElementById("c");
    Canvas2Image.saveAsPNG(can);    // PNG形式で保存
}