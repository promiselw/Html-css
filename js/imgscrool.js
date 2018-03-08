var $imgList = $('.img-list');
var $container = $('.banner');
var PAGE_WIDRH = 940;
var TIME = 400;   //翻页的持续时间
var ITEM_TIME = 20;
var index = 0;
var moving = false //标识是否正在翻页（默认没有）

var intervalId = setInterval(function() {
  nextImg();
},2000);

$container.hover(function() {
  clearInterval(intervalId);
},function() {
  intervalId = setInterval(function() {
    nextImg();
  },2000)
})

nextImg();


//每张图片移动
function nextImg() {
  var offset = 0;
  offset = -PAGE_WIDRH;
  var itemOffset = offset/(TIME/ITEM_TIME);
  var currentOffset = $imgList.position().left;
  var targetOffset = currentOffset + offset;
  //console.log(parseInt(targetOffset)-1);

  if(moving){
    return;
  }
  moving = true;

  var intervalImg = setInterval(function() {
    currentOffset += itemOffset;

    if(currentOffset === targetOffset){
      clearInterval(intervalImg);
      moving = false;
      if(parseInt(currentOffset) === -5*PAGE_WIDRH){
        currentOffset = -PAGE_WIDRH;
      }else if(parseInt(currentOffset) === 0){
        currentOffset = -4*PAGE_WIDRH;
      }
    }

    $imgList.css('left',currentOffset);
  },ITEM_TIME)
  nextPoint();
}

//更新圆点的样式
function nextPoint() {
  var targetIndex = index + 1;

  if(targetIndex === 4){
    targetIndex = 0;
  }
  //console.log(targetIndex);
  $('.pointerDiv>a').eq(index).removeClass('active');
  $('.pointerDiv>a').eq(targetIndex).addClass('active');
  index = targetIndex;
}