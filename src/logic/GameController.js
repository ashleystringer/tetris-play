/*
    //drop down

    function test(){

    }

    let dropTime = Date.now();

    function dropDown(){

        let now = Date.now();
        let deltaTime = now - dropTime;

        if(deltaTime > 1000){
            dropTime = Date.now();
            requestAnimationFrame(dropDown(now));
        }
    }
*/
