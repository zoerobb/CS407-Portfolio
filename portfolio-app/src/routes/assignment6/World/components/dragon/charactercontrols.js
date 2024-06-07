import { AnimationMixer } from 'three';
import { LoopOnce } from 'three';
import { AnimationClip } from 'three';

class CharacterControls {
    constructor(dragon, animations) {
        this.dragon = dragon;
        this.mixer = new AnimationMixer(this.dragon);
        this.animations = animations;
        this.idleAction = null;
        this.dieAnimationTime = 19;
        this.turnLeftAnimationTime = 127.5;
        this.turnRightAnimationTime = 128.5;
        this.idleAnimationTime = 118;
        this.animationRunning = false;

        this.keys = {
            A: false,
            D: false,
            K: false
        };

        window.addEventListener('keydown', (event) => {
            this.keys[event.key.toUpperCase()] = true;
            if (event.key.toUpperCase() === 'K') {
                this.die();
            }
            if (event.key.toUpperCase() === 'A') {
                this.turnLeft();
            }
            if (event.key.toUpperCase() === 'D') {
                this.turnRight();
            }
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key.toUpperCase()] = false;
        });
    }

    die() {
        this.animationRunning = true;
        this.idleAction.stop();
        if(this.dieAction) {
            this.dieAction.stop();
        }
        this.dieAnimation = AnimationClip.findByName(this.animations, 'Qishilong_die');
        this.dieAction = this.mixer.clipAction(this.dieAnimation);
        this.dieAction.time = this.dieAnimationTime;
        this.dieAction.setLoop(LoopOnce);
        this.dieAction.play();
        this.mixer.addEventListener('finished', () => {
            if (this.animationRunning) {
                this.idle();
                this.animationRunning = false;
            }
        });
    }
    
    idle() {
        this.idleAnimation = AnimationClip.findByName(this.animations, 'Qishilong_stand');
        this.idleAction = this.mixer.clipAction(this.idleAnimation);
        this.idleAction.time = this.idleAnimationTime;
        this.idleAction.play();
    }
    
    turnLeft() {
        this.animationRunning = true;
        this.idleAction.stop();
        if(this.turnLeftAction) {
            this.turnLeftAction.stop();
        }
        this.turnLeftAnimation = AnimationClip.findByName(this.animations, 'Qishilong_turnleft');
        this.turnLeftAction = this.mixer.clipAction(this.turnLeftAnimation);
        this.turnLeftAction.time = this.turnLeftAnimationTime;
        this.turnLeftAction.setLoop(LoopOnce);
        this.turnLeftAction.play();
        this.mixer.addEventListener('finished', () => {
            if (this.animationRunning) {
                this.idle();
                this.animationRunning = false;
            }
        });
    }
    
    turnRight() {
        this.animationRunning = true;
        this.idleAction.stop();
        if(this.turnRightAction) {
            this.turnRightAction.stop();
        }
        this.turnRightAnimation = AnimationClip.findByName(this.animations, 'Qishilong_turnright');
        this.turnRightAction = this.mixer.clipAction(this.turnRightAnimation);
        this.turnRightAction.time = this.turnRightAnimationTime;
        this.turnRightAction.setLoop(LoopOnce);
        this.turnRightAction.play();
        this.mixer.addEventListener('finished', () => {
            if (this.animationRunning) {
                this.idle();
                this.animationRunning = false;
            }
        });
    }


    update(delta) {
        this.mixer.update(delta);

        if (!this.animationRunning && this.idleAction.isRunning() && this.idleAction.time < this.idleAnimationTime) {
            this.idleAction.stop();
            this.idleAction.time = this.idleAnimationTime;
            this.idleAction.play();
        }
    }
}

export { CharacterControls };