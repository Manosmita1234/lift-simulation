

let simulateBtn = document.getElementById("simulatebtn");


    function generate(event){
        event.preventDefault();

        let floorInput = Number(document.getElementById("Nfloor").value);
        let liftInput = Number(document.getElementById("Nlift").value);
        let building = document.getElementById("building");

        building.innerHTML = "";
        let lifts = [];

        for(let i = floorInput; i>=1; i--){  // creation of floor and append to building
            let floor = document.createElement("div");
            floor.className = "floor";
            floor.textContent =  `floor${i}`;
            floor.dataset.floorNumber = i;
            building.appendChild(floor);

            if(i==1){  //creation of lifts and append to floor
                for(let j = liftInput; j>=1; j--){
                    let lift = document.createElement("div");
                    lift.className = "lift";
                    lift.textContent = `lift${j}`;
                    lift.dataset.currentFloor = 1;
                    lift.dataset.ismoving = "false";
                    floor.appendChild(lift);
                    lifts.push(lift);

                    let leftDoor = document.createElement("div");
                    leftDoor.className = "leftDoor";
                    lift.appendChild(leftDoor);

                    let rightDoor = document.createElement("div");
                    rightDoor.className = "rightDoor";
                    lift.appendChild(rightDoor);
                    
            }   
        }

         
        // btncontainer to contain up and down btn and append to floordetails
        let btncontainer = document.createElement("div");
        btncontainer.className = `btncontainer`;
        floor.appendChild(btncontainer);
        
        // upbtn 
        if(i!==floorInput){
            let upbtn = document.createElement("button");
            upbtn.className = `upbtn`;
            upbtn.innerHTML = `&#8679;`;
            btncontainer.appendChild(upbtn);
            upbtn.addEventListener("click",()=> movelift(i,lifts));
        }
       
        
        //downbtn
        if(i!==1){
            let downbtn = document.createElement("button");
            downbtn.className = `downbtn`;
            downbtn.innerHTML= `&#8681;`;
            btncontainer.appendChild(downbtn);
            downbtn.addEventListener("click",()=> movelift(i,lifts));
        }
                     
     }
    
    }

    let activeRequests = new Set();

    function movelift(targetFloor,lifts){
       if(activeRequests.has(targetFloor) )return;
        let nearestLift = null;
        let minDistance = Infinity;
        

        lifts.forEach((lift) => {
            let currentFloor = Number(lift.dataset.currentFloor);
            let distance = Math.abs(targetFloor - currentFloor);
            if (distance<minDistance && lift.dataset.ismoving === "false"){
                minDistance = distance;
                nearestLift = lift;
            }
            
        });
        
        if(nearestLift){
           activeRequests.add(targetFloor);
            nearestLift.dataset.ismoving = "true";
            let floorHeight = 120;
            let currentFloor = Number(nearestLift.dataset.currentFloor)
            let distance = (targetFloor - currentFloor)*floorHeight;
            nearestLift.style.transform = `translateY(${-distance}px)`;

            nearestLift.style.transition = "transform 2s ease-in-out";
            nearestLift.dataset.currentFloor = targetFloor;

            setTimeout(()=>{
                nearestLift.dataset.ismoving = "false";
                activeRequests.delete(targetFloor);
            },2000);
            
        }


    }

    

 

    

    

