function tipChange(currentNode, targetNode) {
	targetNode.id = currentNode.id;
	currentNode.id = "";
}

function configueImg(imgArray, positionArray) {
	for (let i = 0, max = imgArray.length; i < max; i++) {
		imgArray[i].id = positionArray[i];
	}
}
function imgChange(imgArray, positionArray, times) {
	for (let i = 0; i < times; i++) {
		positionArray.unshift(positionArray.pop());
	}
}
function manualEvent(imgArray, positionArray, circleArray, i) {
	document.addEventListener("click", function(event) {
		if (event.target.className == "circle") {
			var currentNode = document.querySelector("#chosenCircle"),
				targetIndex = circleArray.indexOf(event.target),
				currentIndex = circleArray.indexOf(currentNode),
				times = (targetIndex - currentIndex + 3) % 3;
			if (times != 0) {
				clearInterval(timer);
				tipChange(currentNode, event.target);
				imgChange(imgArray, positionArray, times);
				configueImg(imgArray, positionArray);
				i = targetIndex;
				autoEvent(imgArray, positionArray, circleArray, i);
			}
		}	
	});
}
function autoEvent(imgArray, positionArray, circleArray, i) {
	timer = setInterval(function() {
		tipChange(circleArray[i % 3], circleArray[(i+1) % 3]);
		imgChange(imgArray, positionArray, 1);
		configueImg(imgArray, positionArray);
		i++;
	}, 5000);

}

function headerMain() {
	var header = document.querySelector("header");
	header.addEventListener("click", function(event) {
		if (event.target.tagName == "DIV") {
			var chosenNav = document.querySelector("#chosenNav");
			chosenNav.id = "";
			event.target.parentNode.id = "chosenNav";
		}
	})
}

function homeMain() {
	var img = document.getElementsByClassName("homeImg"),
		imgArray = Array.prototype.slice.call(img),
		positionArray = ["position1", "position2", "position3"],
		circle = document.getElementsByClassName("circle"),
		circleArray = Array.prototype.slice.call(circle),
		i = 0;
	
	manualEvent(imgArray, positionArray, circleArray, i);
	window.addEventListener("load", autoEvent(imgArray, positionArray, circleArray, i));
}

function machineMain() {
	var machineImg = document.getElementsByClassName("machineImg"),
		machineImgArray = Array.prototype.slice.call(machineImg),
		leftArrowBar = document.querySelector(".left"),
		rightArrowBar = document.querySelector(".right"),
		machineName = document.querySelector("#machineName");
	
	document.addEventListener("click", function(event) {
		if (event.target.className.indexOf("left") != -1) {
			leftArrowBar.id = "chosenBar";
			rightArrowBar.id = "";
			machineImgArray[0].id = "machine1";
			machineImgArray[1].id = "machine2";
			machineName.innerHTML = "MACHINE &nbsp; ONE";
		}
		if (event.target.className.indexOf("right") != -1) {
			leftArrowBar.id = "";
			rightArrowBar.id = "chosenBar";
			machineImgArray[0].id = "machine3";
			machineImgArray[1].id = "machine1";
			machineName.innerHTML = "MACHINE &nbsp; TWO";
		}
	})
}

function shopMain() {
	var shopDiv = document.getElementsByClassName("shopDiv"),
		shopNumber = shopDiv.length;
	for (let i = 0; i < shopNumber; i++) {
		shopDiv[i].addEventListener("mouseenter", function(event) {
			event.target.id = "chosenShop";
		});
		shopDiv[i].addEventListener("mouseleave", function(event) {
			event.target.id = "";
		});
	}
}

headerMain();
homeMain();
machineMain();
shopMain();