import { BoxGeometry, Mesh, MeshStandardMaterial, Color, Vector3} from 'three';

class CubeControls {
    constructor(cube) {
        let gameWon = false;
        let gameOver = false;
        let gameStarted = false;
        this.originalCube = cube;
        this.cubes = [cube];
        this.color = new Color("#30D3FF");
        this.cubehsl = this.color.getHSL({ h: 0, s: 0, l: 0 })
        this.hue = this.cubehsl.h;
        this.direction = 1;
        this.speed = 0.04;
        this.moveAmount = 2;

        this.keys = {
            SPACE: false,
            R: false
        };
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (key in this.keys) {
                event.preventDefault();
                this.keys[key] = true;
            }
        });
    }

    onKeyDown(event) {
        if (event.code === 'Space') {
            this.keys.SPACE = true;
        }
        if (event.code === 'KeyR') {
            this.keys.R = true;
        }
    }

    listSize() {
        return this.cubes.length - 1;
    }

    stop(scene, camera) {
        if(this.keys.SPACE && this.cubes.length < 15) {
            //Game started?
            if(this.gameStarted == undefined) {
                this.gameStarted = true;
            }
            const lastCube = this.cubes[this.cubes.length - 1];
                
            //Check if the cube is out of bounds
            if(this.cubes.length > 1) {
                const beforeCube = this.cubes[this.cubes.length - 2];
                this.overlay(lastCube, beforeCube);
            }

            //Check if the game is over
            if (this.gameOver) {
                return;
            }

            //Game not over, create a new cube
            const newCube = this.createCubeAbove(lastCube, lastCube.geometry.parameters.width);
            this.cubes.push(newCube);
            //If the player has reached the last cube, they win
            if (this.cubes.length === 15) {
                this.gameWon = true;
                return;
            }
            scene.add(newCube);
            this.keys.SPACE = false;
            camera.position.y += 1;
        }
    }

    overlay(currentCube, belowCube) {
        const currentCubePos = new Vector3();
        currentCube.getWorldPosition(currentCubePos);
        const belowCubePos = new Vector3();
        belowCube.getWorldPosition(belowCubePos);

        const cubeSize = currentCube.geometry.parameters.width;
        if (Math.abs(currentCubePos.x - belowCubePos.x) > cubeSize || Math.abs(currentCubePos.z - belowCubePos.z) > cubeSize) {
            this.gameOver = true;
        }

        let diffX = Math.abs(currentCubePos.x - belowCubePos.x);

        const currentCubeXSize = currentCube.geometry.parameters.width;
        let intersectionX = Math.max(0, currentCubeXSize - diffX);

        const intersectingGeometry = new BoxGeometry(intersectionX, 0.4, 1.5);

        let midpointX = currentCubePos.x + (diffX / 2) * (currentCubePos.x > belowCubePos.x ? -1 : 1);

        currentCube.geometry.dispose();
        currentCube.geometry = intersectingGeometry;

        currentCube.position.set(midpointX, currentCubePos.y, currentCubePos.z);
    }

    reset(scene, camera) {
        if (this.keys.R && this.cubes.length > 1){
            for (let i = 1; i < this.cubes.length; i++) {
                scene.remove(this.cubes[i]);
            }
            this.cubes = [this.originalCube];
            scene.add(this.originalCube);
            this.hue = this.cubehsl.h;
            this.keys.R = false;
            camera.position.set(0, 0, 10);
            this.gameWon = false;
            this.gameOver = false;
        }
    }

    createCubeAbove(cube, xSize) {
        const geometry = new BoxGeometry(xSize, 0.4, 1.5);
        const hsl = { h: this.hue, s: 1, l: 0.5 };
        const color = new Color();
        color.setHSL(hsl.h, hsl.s, hsl.l);
        const material = new MeshStandardMaterial({ color: color });
        const newCube = new Mesh(geometry, material);
        newCube.position.set(cube.position.x, cube.position.y + .4, cube.position.z);
    
        this.hue += 0.03;
        if (this.hue > 1) this.hue -= 1;
    
        return newCube;
    }

    update(scene, camera) {
        this.stop(scene, camera);
        this.reset(scene, camera);
        if (this.cubes.length > 1) {
            const cube = this.cubes[this.cubes.length - 1];

            cube.position.x += this.direction * this.speed;

            if (Math.abs(cube.position.x) > this.moveAmount) {
                this.direction *= -1;
            }
        }
    }
}

export { CubeControls };

console.clear();

// interface BlockReturn
// {
// 	placed?:any;
// 	chopped?:any;
// 	plane: 'x' | 'y' | 'z';
// 	direction: number;
// 	bonus?: boolean;
// }

// class Stage
// {
// 	private container: any;
// 	private camera: any;
// 	private scene: any;
// 	private renderer: any;
// 	private light: any;
// 	private softLight: any;
// 	private group: any;
	
// 	constructor()
// 	{
// 		// container
		
// 		this.container = document.getElementById('game');
		
// 		// renderer
		
// 		this.renderer = new THREE.WebGLRenderer({
// 			antialias: true,
// 			alpha: false
// 		});
		
// 		this.renderer.setSize(window.innerWidth, window.innerHeight);
// 		this.renderer.setClearColor('#D0CBC7', 1);
// 		this.container.appendChild( this.renderer.domElement );
		
// 		// scene

// 		this.scene = new THREE.Scene();

// 		// camera

// 		let aspect = window.innerWidth / window.innerHeight;
// 		let d = 20;
// 		this.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, -100, 1000);
// 		this.camera.position.x = 2;
// 		this.camera.position.y = 2; 
// 		this.camera.position.z = 2; 
// 		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		
// 		//light

// 		this.light = new THREE.DirectionalLight(0xffffff, 0.5);
// 		this.light.position.set(0, 499, 0);
// 		this.scene.add(this.light);

// 		this.softLight = new THREE.AmbientLight( 0xffffff, 0.4 );
// 		this.scene.add(this.softLight)
		
// 		window.addEventListener('resize', () => this.onResize());
// 		this.onResize();
// 	}
	
// 	setCamera(y:number, speed:number = 0.3)
// 	{
// 		TweenLite.to(this.camera.position, speed, {y: y + 4, ease: Power1.easeInOut});
// 		TweenLite.to(this.camera.lookAt, speed, {y: y, ease: Power1.easeInOut});
// 	}
	
// 	onResize()
// 	{
// 		let viewSize = 30;
// 		this.renderer.setSize(window.innerWidth, window.innerHeight);
// 		this.camera.left = window.innerWidth / - viewSize;
// 		this.camera.right = window.innerWidth / viewSize;
// 		this.camera.top = window.innerHeight / viewSize;
// 		this.camera.bottom = window.innerHeight / - viewSize;
// 		this.camera.updateProjectionMatrix();
// 	}
	
// 	render = function()
// 	{
// 		this.renderer.render(this.scene, this.camera);
// 	}

// 	add = function(elem)
// 	{
// 		this.scene.add(elem);
// 	}

// 	remove = function(elem)
// 	{
// 		this.scene.remove(elem);
// 	}
// }

// class Block
// {
// 	const STATES = {ACTIVE: 'active', STOPPED: 'stopped', MISSED: 'missed'};
// 	const MOVE_AMOUNT = 12;

// 	dimension = { width: 0, height: 0, depth: 0}
// 	position = {x: 0, y: 0, z: 0};
	
// 	mesh:any;
// 	state:string;
// 	index:number;
// 	speed:number;
// 	direction:number;
// 	colorOffset:number;
// 	color:number;
// 	material:any;

// 	workingPlane:string;
// 	workingDimension:string;

// 	targetBlock:Block;
	
// 	constructor(block:Block)
// 	{
// 		// set size and position
		
// 		this.targetBlock = block;
		
// 		this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
// 		this.workingPlane = this.index % 2 ? 'x' : 'z';
// 		this.workingDimension = this.index % 2 ? 'width' : 'depth';
		
// 		// set the dimensions from the target block, or defaults.
		
// 		this.dimension.width = this.targetBlock ? this.targetBlock.dimension.width : 10;
// 		this.dimension.height = this.targetBlock ? this.targetBlock.dimension.height : 2;
// 		this.dimension.depth = this.targetBlock ? this.targetBlock.dimension.depth : 10;
		
// 		this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
// 		this.position.y = this.dimension.height * this.index;
// 		this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
		
// 		this.colorOffset = this.targetBlock ? this.targetBlock.colorOffset : Math.round(Math.random() * 100);
		
// 		// set color
// 		if(!this.targetBlock) 
// 		{
// 			this.color = 0x333344;
// 		}
// 		else
// 		{
// 			let offset = this.index + this.colorOffset;
// 			var r = Math.sin(0.3 * offset) * 55 + 200;
// 			var g = Math.sin(0.3 * offset + 2) * 55 + 200;
// 			var b = Math.sin(0.3 * offset + 4) * 55 + 200;
// 			this.color = new THREE.Color( r / 255, g / 255, b / 255 );
// 		}
		
// 		// state
		
// 		this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;
		
// 		// set direction
		
// 		this.speed = -0.1 - (this.index * 0.005);
// 		if(this.speed < -4) this.speed = -4;
// 		this.direction = this.speed;
		
// 		// create block
		
// 		let geometry = new THREE.BoxGeometry( this.dimension.width, this.dimension.height, this.dimension.depth);
// 		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(this.dimension.width/2, this.dimension.height/2, this.dimension.depth/2) );
// 		this.material = new THREE.MeshToonMaterial( {color: this.color, shading: THREE.FlatShading} );
// 		this.mesh = new THREE.Mesh( geometry, this.material );
// 		this.mesh.position.set(this.position.x, this.position.y + (this.state == this.STATES.ACTIVE ? 0 : 0), this.position.z);
		
// 		if(this.state == this.STATES.ACTIVE) 
// 		{
// 			this.position[this.workingPlane] = Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT;
// 		}
// 	} 

// 	reverseDirection()
// 	{
// 		this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed); 	
// 	}

// 	place():BlockReturn
// 	{
// 		this.state = this.STATES.STOPPED;
		
// 		let overlap = this.targetBlock.dimension[this.workingDimension] - Math.abs(this.position[this.workingPlane] - this.targetBlock.position[this.workingPlane]);
		
// 		let blocksToReturn:BlockReturn = {
// 			plane: this.workingPlane,
// 			direction: this.direction
// 		};
		
// 		if(this.dimension[this.workingDimension] - overlap < 0.3)
// 		{
// 			overlap = this.dimension[this.workingDimension];
// 			blocksToReturn.bonus = true;
// 			this.position.x = this.targetBlock.position.x;
// 			this.position.z = this.targetBlock.position.z;
// 			this.dimension.width = this.targetBlock.dimension.width;
// 			this.dimension.depth = this.targetBlock.dimension.depth;
// 		}
		
// 		if(overlap > 0)
// 		{
// 			let choppedDimensions = { width: this.dimension.width, height: this.dimension.height, depth: this.dimension.depth };
// 			choppedDimensions[this.workingDimension] -= overlap;
// 			this.dimension[this.workingDimension] = overlap;
					
// 			let placedGeometry = new THREE.BoxGeometry( this.dimension.width, this.dimension.height, this.dimension.depth);
// 			placedGeometry.applyMatrix( new THREE.Matrix4().makeTranslation(this.dimension.width/2, this.dimension.height/2, this.dimension.depth/2) );
// 			let placedMesh = new THREE.Mesh( placedGeometry, this.material );
			
// 			let choppedGeometry = new THREE.BoxGeometry( choppedDimensions.width, choppedDimensions.height, choppedDimensions.depth);
// 			choppedGeometry.applyMatrix( new THREE.Matrix4().makeTranslation(choppedDimensions.width/2, choppedDimensions.height/2, choppedDimensions.depth/2) );
// 			let choppedMesh = new THREE.Mesh( choppedGeometry, this.material );
			
// 			let choppedPosition = {
// 				x: this.position.x,
// 				y: this.position.y,
// 				z: this.position.z
// 			}
			
// 			if(this.position[this.workingPlane] < this.targetBlock.position[this.workingPlane])
// 			{
// 				this.position[this.workingPlane] = this.targetBlock.position[this.workingPlane]
// 			}
// 			else
// 			{
// 				choppedPosition[this.workingPlane] += overlap;
// 			}
			
// 			placedMesh.position.set(this.position.x, this.position.y, this.position.z);
// 			choppedMesh.position.set(choppedPosition.x, choppedPosition.y, choppedPosition.z);
			
// 			blocksToReturn.placed = placedMesh;
// 			if(!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
// 		}
// 		else
// 		{
// 			this.state = this.STATES.MISSED;
// 		}
		
// 		this.dimension[this.workingDimension] = overlap;

// 		return blocksToReturn;
// 	}
	
// 	tick()
// 	{
// 		if(this.state == this.STATES.ACTIVE)
// 		{
// 			let value = this.position[this.workingPlane];
// 			if(value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) this.reverseDirection();
// 			this.position[this.workingPlane] += this.direction;	
// 			this.mesh.position[this.workingPlane] = this.position[this.workingPlane];	
// 		}
// 	}
// }

// class Game
// {
// 	const STATES = {
// 		'LOADING': 'loading',
// 		'PLAYING': 'playing',
// 		'READY': 'ready',
// 		'ENDED': 'ended',
// 		'RESETTING': 'resetting'
// 	}
// 	blocks:Block[] = [];
// 	state:string = this.STATES.LOADING;
	
// 	// groups

// 	newBlocks:any;
// 	placedBlocks:any;
// 	choppedBlocks:any;

// 	// UI elements

// 	scoreContainer:any;
// 	mainContainer:any;
// 	startButton:any;
// 	instructions:any;
	
// 	constructor()
// 	{
// 		this.stage = new Stage();
		
// 		this.mainContainer = document.getElementById('container');
// 		this.scoreContainer = document.getElementById('score');
// 		this.startButton = document.getElementById('start-button');
// 		this.instructions = document.getElementById('instructions');
// 		this.scoreContainer.innerHTML = '0';
		
// 		this.newBlocks = new THREE.Group();
// 		this.placedBlocks = new THREE.Group();
// 		this.choppedBlocks = new THREE.Group();
		
// 		this.stage.add(this.newBlocks);
// 		this.stage.add(this.placedBlocks);
// 		this.stage.add(this.choppedBlocks);
		
// 		this.addBlock();
// 		this.tick();
		
// 		this.updateState(this.STATES.READY);
		
// 		document.addEventListener('keydown', e =>
// 		{
// 			if(e.keyCode == 32) this.onAction()
// 		});
		
// 		document.addEventListener('click', e =>
// 		{
// 			this.onAction();
// 		});		
		
// 		document.addEventListener('touchstart', e =>
// 		{
// 			e.preventDefault();
// 			// this.onAction();
			
// 			// ☝️ this triggers after click on android so you
// 			// insta-lose, will figure it out later.
// 		});
// 	}

// 	updateState(newState)
// 	{
// 		for(let key in this.STATES) this.mainContainer.classList.remove(this.STATES[key]);
// 		this.mainContainer.classList.add(newState);
// 		this.state = newState;
// 	}

// 	onAction()
// 	{
// 		switch(this.state)
// 		{
// 			case this.STATES.READY:
// 				this.startGame();
// 				break;
// 			case this.STATES.PLAYING:
// 				this.placeBlock();
// 				break;
// 			case this.STATES.ENDED:
// 				this.restartGame();
// 				break;	
// 		}
// 	}
	
// 	startGame()
// 	{
// 		if(this.state != this.STATES.PLAYING)
// 		{
// 			this.scoreContainer.innerHTML = '0';
// 			this.updateState(this.STATES.PLAYING);
// 			this.addBlock();
// 		}
// 	}

// 	restartGame()
// 	{
// 		this.updateState(this.STATES.RESETTING);
		
// 		let oldBlocks = this.placedBlocks.children;
// 		let removeSpeed = 0.2;
// 		let delayAmount = 0.02;
// 		for(let i = 0; i < oldBlocks.length; i++)
// 		{
// 			TweenLite.to(oldBlocks[i].scale, removeSpeed, {x: 0, y: 0, z: 0, delay: (oldBlocks.length - i) * delayAmount, ease: Power1.easeIn, onComplete: () => this.placedBlocks.remove(oldBlocks[i])})
// 			TweenLite.to(oldBlocks[i].rotation, removeSpeed, {y: 0.5, delay: (oldBlocks.length - i) * delayAmount, ease: Power1.easeIn})
// 		}
// 		let cameraMoveSpeed = removeSpeed * 2 + (oldBlocks.length * delayAmount);
// 		this.stage.setCamera(2, cameraMoveSpeed);
		
// 		let countdown = {value: this.blocks.length - 1};
// 		TweenLite.to(countdown, cameraMoveSpeed, {value: 0, onUpdate: () => {this.scoreContainer.innerHTML = String(Math.round(countdown.value))}})
		
// 		this.blocks = this.blocks.slice(0, 1);
		
// 		setTimeout(() => {
// 			this.startGame();
// 		}, cameraMoveSpeed * 1000)
		
// 	}
	
// 	placeBlock()
// 	{
// 		let currentBlock = this.blocks[this.blocks.length - 1];
// 		let newBlocks:BlockReturn = currentBlock.place();
// 		this.newBlocks.remove(currentBlock.mesh);
// 		if(newBlocks.placed) this.placedBlocks.add(newBlocks.placed);
// 		if(newBlocks.chopped)
// 		{
// 			this.choppedBlocks.add(newBlocks.chopped);
// 			let positionParams = {y: '-=30', ease: Power1.easeIn, onComplete: () => this.choppedBlocks.remove(newBlocks.chopped)}
// 			let rotateRandomness = 10;
// 			let rotationParams = {
// 				delay: 0.05,
// 				x: newBlocks.plane == 'z' ? ((Math.random() * rotateRandomness) - (rotateRandomness/2)) : 0.1,
// 				z: newBlocks.plane == 'x' ? ((Math.random() * rotateRandomness) - (rotateRandomness/2)) : 0.1,
// 				y: Math.random() * 0.1,
// 			};
// 			if(newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane])
// 			{
// 				positionParams[newBlocks.plane] = '+=' + (40 * Math.abs(newBlocks.direction));
// 			}
// 			else
// 			{
// 				positionParams[newBlocks.plane] = '-=' + (40 * Math.abs(newBlocks.direction));
// 			}
// 			TweenLite.to(newBlocks.chopped.position, 1, positionParams);
// 			TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
			
// 		}
		
// 		this.addBlock();
// 	}
	
// 	addBlock()
// 	{
// 		let lastBlock = this.blocks[this.blocks.length - 1];
		
// 		if(lastBlock && lastBlock.state == lastBlock.STATES.MISSED)
// 		{
// 			return this.endGame();
// 		}
		
// 		this.scoreContainer.innerHTML = String(this.blocks.length - 1);
		
// 		let newKidOnTheBlock = new Block(lastBlock);
// 		this.newBlocks.add(newKidOnTheBlock.mesh);
// 		this.blocks.push(newKidOnTheBlock);

// 		this.stage.setCamera(this.blocks.length * 2);
		
// 		if(this.blocks.length >= 5) this.instructions.classList.add('hide');
// 	}
	
// 	endGame()
// 	{
// 		this.updateState(this.STATES.ENDED);
// 	}

// 	tick()
// 	{
// 		this.blocks[this.blocks.length - 1].tick();
// 		this.stage.render();
// 		requestAnimationFrame(() => {this.tick()});
// 	}
// }

// let game = new Game();