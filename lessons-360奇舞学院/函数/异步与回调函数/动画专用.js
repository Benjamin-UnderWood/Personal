const brick = document.getElementById('brick');

brick.addEventListener('click', function(){
    let startTime = Date.now();
    let cycle = 2000;

    requestAnimationFrame(function update(){
        let p = (Date.now() - startTime) / cycle;

        brick.style.transform = 'rotate(' + 360 * p + 'deg)';

        requestAnimationFrame(update);
    });
});