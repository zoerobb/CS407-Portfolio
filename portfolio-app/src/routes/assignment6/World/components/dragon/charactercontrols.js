import { AnimationMixer } from 'three';
import { LoopOnce } from 'three';
import { AnimationClip } from 'three';

class CharacterControls {
    constructor(dragon, animations) {
        this.dragon = dragon;
        this.mixer = new AnimationMixer(this.dragon);
        this.animations = animations;
        this.idleAction = null;
        this.dieAnimationTime = 18;
        this.downAnimationTime = 25;
        this.upAnimationTime = 130;
        this.turnLeftAnimationTime = 127.5;
        this.turnRightAnimationTime = 128.5;
        this.idleAnimationTime = 120;
        this.finished = false;

        this.keys = {
            A: false,
            D: false,
            K: false,
            SPACE: false
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
            if (event.key.toUpperCase() === 'SPACE') {
                this.jump();
            }
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key.toUpperCase()] = false;
        });
    }

    die() {
        this.idleAction.stop();
        this.dieAnimation = AnimationClip.findByName(this.animations, 'Qishilong_die');
        this.dieAction = this.mixer.clipAction(this.dieAnimation);
        this.dieAction.time = 18;
        this.dieAction.setLoop(LoopOnce);
        this.dieAction.clampWhenFinished = true;
        this.dieAction.play();
        this.finished = true;
    }

    idle() {
        this.idleAnimation = AnimationClip.findByName(this.animations, 'Qishilong_stand');
        this.idleAction = this.mixer.clipAction(this.idleAnimation);
        this.idleAction.time = this.idleAnimationTime;
        this.idleAction.play();
    }

    turnLeft() {
        this.idleAction.stop();
        this.turnLeftAnimation = AnimationClip.findByName(this.animations, 'Qishilong_turnleft');
        this.turnLeftAction = this.mixer.clipAction(this.turnLeftAnimation);
        this.turnLeftAction.time = this.turnLeftAnimationTime;
        this.turnLeftAction.setLoop(LoopOnce);
        this.turnLeftAction.clampWhenFinished = true;
        this.turnLeftAction.play();
    }

    turnRight() {
        this.idleAction.stop();
        this.turnRightAnimation = AnimationClip.findByName(this.animations, 'Qishilong_turnright');
        this.turnRightAction = this.mixer.clipAction(this.turnRightAnimation);
        this.turnRightAction.time = this.turnRightAnimationTime;
        this.turnRightAction.setLoop(LoopOnce);
        this.turnRightAction.clampWhenFinished = true;
        this.turnRightAction.play();
    }

    jump() {
        this.idleAction.stop();
        this.downAnimation = AnimationClip.findByName(this.animations, 'Qishilong_down');
        this.downAction = this.mixer.clipAction(this.downAnimation);
        this.downAction.time = this.downAnimationTime;
        this.downAction.setLoop(LoopOnce);
        this.downAction.clampWhenFinished = true;
        this.downAction.play();
        this.upAnimation = AnimationClip.findByName(this.animations, 'Qishilong_up');
        this.upAction = this.mixer.clipAction(this.upAnimation);
        this.upAction.time = this.upAnimationTime;
        this.upAction.setLoop(LoopOnce);
        this.upAction.clampWhenFinished = true;
        this.upAction.play();
    }


    update(delta) {
        this.mixer.update(delta);
        if (this.idleAction && this.idleAction.time < this.idleAnimationTime) {
            this.idleAction.stop();
            this.idleAction.time = this.idleAnimationTime;
            this.idleAction.play();
        }

        if (this.dieAction && !this.dieAction.isRunning() && this.idleAction.paused) {
            this.idleAction.play();
            this.finished = false;
        }
    }
}

export { CharacterControls };